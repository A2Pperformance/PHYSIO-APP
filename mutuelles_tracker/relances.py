"""Relances page: lists overdue invoices and triggers exports."""

from __future__ import annotations

import pandas as pd
import streamlit as st

from business_rules import compute_action, jours_depuis_envoi, reste_a_encaisser
from exports import relances_to_csv_bytes, relances_to_pdf_bytes


def get_relances(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        return df
    overdue = df[df["statut"].isin(["En retard", "À relancer"])].copy()
    if overdue.empty:
        return overdue
    overdue["jours_depuis_envoi"] = overdue.apply(jours_depuis_envoi, axis=1)
    overdue["reste"] = overdue.apply(reste_a_encaisser, axis=1)
    overdue["action"] = overdue["statut"].apply(compute_action)
    overdue = overdue.sort_values(
        by="jours_depuis_envoi", ascending=False, na_position="last"
    )
    return overdue


def render_relances(df: pd.DataFrame) -> None:
    st.subheader("Relances mutuelles")
    relances = get_relances(df)
    if relances.empty:
        st.success("Aucune facture en retard. ")
        return

    st.write(
        f"**{len(relances)} dossier(s)** à relancer — "
        f"reste à encaisser: **{relances['reste'].sum():.2f} €**"
    )

    st.dataframe(
        relances[
            [
                "id",
                "date_soin",
                "patient_code",
                "mutuelle",
                "numero_facture",
                "montant_attendu",
                "montant_regle",
                "reste",
                "date_envoi",
                "jours_depuis_envoi",
                "statut",
                "action",
                "commentaire",
            ]
        ],
        use_container_width=True,
        hide_index=True,
    )

    c1, c2 = st.columns(2)
    c1.download_button(
        "Exporter relances (CSV)",
        data=relances_to_csv_bytes(relances),
        file_name="relances_mutuelles.csv",
        mime="text/csv",
    )
    c2.download_button(
        "Exporter relances (PDF)",
        data=relances_to_pdf_bytes(relances),
        file_name="relances_mutuelles.pdf",
        mime="application/pdf",
    )
