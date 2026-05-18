"""Business rules: automatic status detection and derived fields."""

from __future__ import annotations

from datetime import date, datetime
from typing import Any

DELAI_RELANCE_JOURS = 15

STATUTS = [
    "À envoyer",
    "Envoyée",
    "En attente",
    "Payée",
    "Partiellement payée",
    "En retard",
    "Rejetée",
    "À relancer",
]


def _parse_date(value: Any) -> date | None:
    if value is None or value == "" or (isinstance(value, float) and value != value):
        return None
    if isinstance(value, date) and not isinstance(value, datetime):
        return value
    if isinstance(value, datetime):
        return value.date()
    s = str(value).strip()
    if not s:
        return None
    for fmt in ("%Y-%m-%d", "%d/%m/%Y", "%d-%m-%Y", "%Y/%m/%d"):
        try:
            return datetime.strptime(s, fmt).date()
        except ValueError:
            continue
    try:
        return datetime.fromisoformat(s).date()
    except ValueError:
        return None


def _to_float(value: Any) -> float:
    if value is None or value == "":
        return 0.0
    if isinstance(value, (int, float)):
        if value != value:
            return 0.0
        return float(value)
    s = str(value).replace(",", ".").replace("€", "").strip()
    try:
        return float(s)
    except ValueError:
        return 0.0


def compute_statut(row: dict[str, Any], today: date | None = None) -> str:
    """Apply the business rules to derive the status of a facture."""
    today = today or date.today()

    if row.get("statut") == "Rejetée":
        return "Rejetée"

    date_envoi = _parse_date(row.get("date_envoi"))
    date_reglement = _parse_date(row.get("date_reglement"))
    montant_attendu = _to_float(row.get("montant_attendu"))
    montant_regle = _to_float(row.get("montant_regle"))

    if date_envoi is None:
        return "À envoyer"

    if date_reglement is not None and montant_regle > 0:
        if montant_regle >= montant_attendu and montant_attendu > 0:
            return "Payée"
        if 0 < montant_regle < montant_attendu:
            return "Partiellement payée"

    delta_jours = (today - date_envoi).days
    if delta_jours > DELAI_RELANCE_JOURS:
        return "En retard"

    return "En attente"


def compute_action(statut: str) -> str:
    if statut == "En retard":
        return "Relancer la mutuelle"
    if statut == "À envoyer":
        return "Envoyer la facture"
    if statut == "Partiellement payée":
        return "Vérifier le solde"
    if statut == "Rejetée":
        return "Analyser le motif de rejet"
    return ""


def jours_depuis_envoi(row: dict[str, Any], today: date | None = None) -> int | None:
    today = today or date.today()
    d = _parse_date(row.get("date_envoi"))
    if d is None:
        return None
    return (today - d).days


def delai_reglement(row: dict[str, Any]) -> int | None:
    envoi = _parse_date(row.get("date_envoi"))
    regl = _parse_date(row.get("date_reglement"))
    if envoi is None or regl is None:
        return None
    return (regl - envoi).days


def reste_a_encaisser(row: dict[str, Any]) -> float:
    return max(
        0.0,
        _to_float(row.get("montant_attendu")) - _to_float(row.get("montant_regle")),
    )
