"""Dashboard KPIs and Streamlit views."""

from __future__ import annotations

from datetime import date
from typing import Any

import pandas as pd
import streamlit as st

from business_rules import (
    DELAI_RELANCE_JOURS,
    delai_reglement,
    jours_depuis_envoi,
    reste_a_encaisser,
)


def compute_kpis(df: pd.DataFrame, today: date | None = None) -> dict[str, Any]:
    today = today or date.today()
    if df.empty:
        return {
            "total_attendu": 0.0,
            "total_regle": 0.0,
            "reste_a_encaisser": 0.0,
            "montant_en_retard": 0.0,
            "nb_en_attente": 0,
            "nb_en_retard": 0,
            "delai_moyen": None,
        }

    montant_attendu = pd.to_numeric(df["montant_attendu"], errors="coerce").fillna(0.0)
    montant_regle = pd.to_numeric(df["montant_regle"], errors="coerce").fillna(0.0)

    statuts = df["statut"].fillna("")
    actif = statuts != "Rejetée"

    total_attendu = float(montant_attendu[actif].sum())
    total_regle = float(montant_regle[actif].sum())
    reste = float(
        df[actif].apply(reste_a_encaisser, axis=1).sum()
    ) if actif.any() else 0.0

    en_retard_mask = statuts == "En retard"
    montant_en_retard = float(
        df[en_retard_mask].apply(reste_a_encaisser, axis=1).sum()
    ) if en_retard_mask.any() else 0.0

    nb_en_attente = int(((statuts == "En attente") | (statuts == "Envoyée")).sum())
    nb_en_retard = int(en_retard_mask.sum())

    delais = [
        d
        for d in df.apply(delai_reglement, axis=1).tolist()
        if d is not None and d >= 0
    ]
    delai_moyen = round(sum(delais) / len(delais), 1) if delais else None

    return {
        "total_attendu": total_attendu,
        "total_regle": total_regle,
        "reste_a_encaisser": reste,
        "montant_en_retard": montant_en_retard,
        "nb_en_attente": nb_en_attente,
        "nb_en_retard": nb_en_retard,
        "delai_moyen": delai_moyen,
    }


def _euro(value: float) -> str:
    return f"{value:,.2f} €".replace(",", " ").replace(".", ",")


def render_dashboard(df: pd.DataFrame) -> None:
    st.subheader("Tableau de bord")
    kpis = compute_kpis(df)

    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Total attendu", _euro(kpis["total_attendu"]))
    col2.metric("Total réglé", _euro(kpis["total_regle"]))
    col3.metric("Reste à encaisser", _euro(kpis["reste_a_encaisser"]))
    col4.metric("Montant en retard", _euro(kpis["montant_en_retard"]))

    col5, col6, col7 = st.columns(3)
    col5.metric("Dossiers en attente", kpis["nb_en_attente"])
    col6.metric("Dossiers en retard", kpis["nb_en_retard"])
    delai = kpis["delai_moyen"]
    col7.metric(
        "Délai moyen de règlement",
        f"{delai} j" if delai is not None else "—",
    )

    st.caption(
        f"Seuil de retard configuré: {DELAI_RELANCE_JOURS} jours après envoi."
    )

    if not df.empty:
        st.markdown("#### Répartition par statut")
        rep = df["statut"].fillna("Inconnu").value_counts().rename_axis("statut")
        st.bar_chart(rep)


def render_filterable_table(df: pd.DataFrame) -> pd.DataFrame:
    st.subheader("Factures mutuelles")
    if df.empty:
        st.info("Aucune facture pour le moment. Importez un fichier CSV/Excel.")
        return df

    with st.expander("Filtres", expanded=True):
        c1, c2, c3 = st.columns(3)
        mutuelles = ["(toutes)"] + sorted(df["mutuelle"].dropna().unique().tolist())
        statuts = ["(tous)"] + sorted(df["statut"].dropna().unique().tolist())
        sel_mut = c1.selectbox("Mutuelle", mutuelles)
        sel_stat = c2.selectbox("Statut", statuts)
        recherche = c3.text_input("Recherche (patient/n° facture)")

    out = df.copy()
    if sel_mut != "(toutes)":
        out = out[out["mutuelle"] == sel_mut]
    if sel_stat != "(tous)":
        out = out[out["statut"] == sel_stat]
    if recherche:
        r = recherche.lower().strip()
        out = out[
            out["patient_code"].fillna("").str.lower().str.contains(r)
            | out["numero_facture"].fillna("").str.lower().str.contains(r)
        ]

    display = out.copy()
    display["jours_depuis_envoi"] = display.apply(jours_depuis_envoi, axis=1)
    display["reste"] = display.apply(reste_a_encaisser, axis=1)

    st.dataframe(
        display[
            [
                "id",
                "date_soin",
                "patient_code",
                "mutuelle",
                "numero_facture",
                "montant_attendu",
                "date_envoi",
                "date_reglement",
                "montant_regle",
                "reste",
                "jours_depuis_envoi",
                "statut",
                "commentaire",
            ]
        ],
        use_container_width=True,
        hide_index=True,
    )
    return out
