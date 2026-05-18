"""Import CSV/Excel files of mutual invoices into the SQLite database."""

from __future__ import annotations

from io import BytesIO
from pathlib import Path
from typing import Any

import pandas as pd

from business_rules import _parse_date, _to_float, compute_statut
from database import bulk_insert

EXPECTED_COLUMNS = [
    "date_soin",
    "patient_code",
    "mutuelle",
    "numero_facture",
    "montant_attendu",
    "date_envoi",
    "date_reglement",
    "montant_regle",
    "commentaire",
]

ALIASES = {
    "date_soin": ["date_soin", "date de soin", "date soin", "date_acte"],
    "patient_code": ["patient_code", "patient", "code patient", "code_patient"],
    "mutuelle": ["mutuelle", "organisme", "assurance"],
    "numero_facture": [
        "numero_facture",
        "n_facture",
        "n° facture",
        "numero facture",
        "facture",
    ],
    "montant_attendu": [
        "montant_attendu",
        "montant attendu",
        "montant_du",
        "montant dû",
        "du",
    ],
    "date_envoi": ["date_envoi", "date envoi", "envoi"],
    "date_reglement": ["date_reglement", "date règlement", "date_paiement"],
    "montant_regle": [
        "montant_regle",
        "montant réglé",
        "montant_paye",
        "montant payé",
        "regle",
    ],
    "commentaire": ["commentaire", "note", "remarque"],
}


def _read_dataframe(file: Any, filename: str) -> pd.DataFrame:
    name = filename.lower()
    if name.endswith(".csv"):
        try:
            return pd.read_csv(file, sep=None, engine="python", dtype=str)
        except Exception:
            file.seek(0) if hasattr(file, "seek") else None
            return pd.read_csv(file, dtype=str)
    if name.endswith((".xlsx", ".xls")):
        if hasattr(file, "read"):
            data = file.read()
            return pd.read_excel(BytesIO(data), dtype=str)
        return pd.read_excel(file, dtype=str)
    raise ValueError(f"Format de fichier non supporté: {filename}")


def _normalize_columns(df: pd.DataFrame) -> pd.DataFrame:
    rename: dict[str, str] = {}
    lower_cols = {c: c.strip().lower() for c in df.columns}
    for canonical, candidates in ALIASES.items():
        cand_set = {c.lower() for c in candidates}
        for orig, low in lower_cols.items():
            if low in cand_set:
                rename[orig] = canonical
                break
    df = df.rename(columns=rename)
    for col in EXPECTED_COLUMNS:
        if col not in df.columns:
            df[col] = None
    return df[EXPECTED_COLUMNS]


def _normalize_row(row: dict[str, Any]) -> dict[str, Any]:
    out: dict[str, Any] = {}
    for date_col in ("date_soin", "date_envoi", "date_reglement"):
        d = _parse_date(row.get(date_col))
        out[date_col] = d.isoformat() if d else None
    for num_col in ("montant_attendu", "montant_regle"):
        out[num_col] = _to_float(row.get(num_col))
    for txt_col in ("patient_code", "mutuelle", "numero_facture", "commentaire"):
        val = row.get(txt_col)
        if val is None or (isinstance(val, float) and val != val):
            out[txt_col] = None
        else:
            out[txt_col] = str(val).strip() or None
    out["statut"] = compute_statut(out)
    return out


def import_file(file: Any, filename: str) -> tuple[int, list[str]]:
    """Import a CSV/Excel file. Returns (rows_inserted, warnings)."""
    warnings: list[str] = []
    df = _read_dataframe(file, filename)
    if df.empty:
        return 0, ["Le fichier est vide."]
    df = _normalize_columns(df)
    rows = []
    for idx, raw in enumerate(df.to_dict(orient="records"), start=1):
        if not any(
            (raw.get(c) not in (None, "", float("nan")))
            for c in EXPECTED_COLUMNS
        ):
            continue
        try:
            rows.append(_normalize_row(raw))
        except Exception as exc:  # pragma: no cover - defensive
            warnings.append(f"Ligne {idx} ignorée: {exc}")
    inserted = bulk_insert(rows)
    return inserted, warnings


def import_path(path: str | Path) -> tuple[int, list[str]]:
    p = Path(path)
    with p.open("rb") as f:
        return import_file(f, p.name)
