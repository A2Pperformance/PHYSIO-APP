"""SQLite database layer for the mutual payment tracker.

All data is kept locally; no network calls are made from this module.
"""

from __future__ import annotations

import sqlite3
from contextlib import contextmanager
from datetime import datetime
from pathlib import Path
from typing import Any, Iterable

import pandas as pd

DB_PATH = Path(__file__).resolve().parent / "mutuelles.db"

SCHEMA = """
CREATE TABLE IF NOT EXISTS reglements_mutuelles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date_soin TEXT,
    patient_code TEXT,
    mutuelle TEXT,
    numero_facture TEXT,
    montant_attendu REAL,
    date_envoi TEXT,
    date_reglement TEXT,
    montant_regle REAL,
    statut TEXT,
    commentaire TEXT,
    created_at TEXT,
    updated_at TEXT
);
"""

COLUMNS = [
    "id",
    "date_soin",
    "patient_code",
    "mutuelle",
    "numero_facture",
    "montant_attendu",
    "date_envoi",
    "date_reglement",
    "montant_regle",
    "statut",
    "commentaire",
    "created_at",
    "updated_at",
]


@contextmanager
def get_connection(db_path: Path | str = DB_PATH):
    conn = sqlite3.connect(str(db_path))
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db(db_path: Path | str = DB_PATH) -> None:
    with get_connection(db_path) as conn:
        conn.executescript(SCHEMA)
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_statut ON reglements_mutuelles(statut)"
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_mutuelle ON reglements_mutuelles(mutuelle)"
        )


def _now_iso() -> str:
    return datetime.now().isoformat(timespec="seconds")


def insert_facture(data: dict[str, Any], db_path: Path | str = DB_PATH) -> int:
    now = _now_iso()
    data = {**data, "created_at": now, "updated_at": now}
    fields = [c for c in COLUMNS if c != "id" and c in data]
    placeholders = ",".join(["?"] * len(fields))
    sql = f"INSERT INTO reglements_mutuelles ({','.join(fields)}) VALUES ({placeholders})"
    with get_connection(db_path) as conn:
        cur = conn.execute(sql, [data[f] for f in fields])
        return int(cur.lastrowid)


def bulk_insert(rows: Iterable[dict[str, Any]], db_path: Path | str = DB_PATH) -> int:
    count = 0
    now = _now_iso()
    with get_connection(db_path) as conn:
        for row in rows:
            row = {**row, "created_at": now, "updated_at": now}
            fields = [c for c in COLUMNS if c != "id" and c in row]
            placeholders = ",".join(["?"] * len(fields))
            sql = (
                f"INSERT INTO reglements_mutuelles ({','.join(fields)}) "
                f"VALUES ({placeholders})"
            )
            conn.execute(sql, [row[f] for f in fields])
            count += 1
    return count


def update_facture(
    facture_id: int, data: dict[str, Any], db_path: Path | str = DB_PATH
) -> None:
    data = {**data, "updated_at": _now_iso()}
    fields = [c for c in data if c in COLUMNS and c != "id"]
    if not fields:
        return
    sql = (
        "UPDATE reglements_mutuelles SET "
        + ", ".join(f"{f} = ?" for f in fields)
        + " WHERE id = ?"
    )
    with get_connection(db_path) as conn:
        conn.execute(sql, [data[f] for f in fields] + [facture_id])


def mark_rejected(
    facture_id: int, motif: str = "", db_path: Path | str = DB_PATH
) -> None:
    comment = f"Rejetée: {motif}" if motif else "Rejetée"
    update_facture(
        facture_id,
        {"statut": "Rejetée", "commentaire": comment},
        db_path=db_path,
    )


def add_payment(
    facture_id: int,
    montant_regle: float,
    date_reglement: str,
    db_path: Path | str = DB_PATH,
) -> None:
    update_facture(
        facture_id,
        {"montant_regle": montant_regle, "date_reglement": date_reglement},
        db_path=db_path,
    )


def fetch_all(db_path: Path | str = DB_PATH) -> pd.DataFrame:
    with get_connection(db_path) as conn:
        df = pd.read_sql_query(
            "SELECT * FROM reglements_mutuelles ORDER BY date_soin DESC, id DESC",
            conn,
        )
    return df


def delete_all(db_path: Path | str = DB_PATH) -> None:
    with get_connection(db_path) as conn:
        conn.execute("DELETE FROM reglements_mutuelles")


def refresh_statuses(
    statut_resolver, db_path: Path | str = DB_PATH
) -> int:
    """Recompute and persist the `statut` column for all rows.

    `statut_resolver` is a callable taking a row dict and returning the new status.
    """
    updated = 0
    with get_connection(db_path) as conn:
        rows = conn.execute("SELECT * FROM reglements_mutuelles").fetchall()
        for row in rows:
            row_dict = dict(row)
            current = row_dict.get("statut")
            if current == "Rejetée":
                continue
            new_statut = statut_resolver(row_dict)
            if new_statut != current:
                conn.execute(
                    "UPDATE reglements_mutuelles SET statut = ?, updated_at = ? WHERE id = ?",
                    (new_statut, _now_iso(), row_dict["id"]),
                )
                updated += 1
    return updated
