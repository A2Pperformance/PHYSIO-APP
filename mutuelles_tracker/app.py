"""Streamlit entry point for the mutual payment tracker.

Run with:
    streamlit run app.py
"""

from __future__ import annotations

from datetime import date

import pandas as pd
import streamlit as st

from business_rules import STATUTS, compute_statut
from dashboard import render_dashboard, render_filterable_table
from database import (
    add_payment,
    delete_all,
    fetch_all,
    init_db,
    insert_facture,
    mark_rejected,
    refresh_statuses,
)
from exports import factures_to_csv_bytes
from imports import import_file
from relances import render_relances

st.set_page_config(
    page_title="Suivi des règlements mutuelles",
    page_icon="💶",
    layout="wide",
)


@st.cache_data(show_spinner=False)
def _load_data(_version: int) -> pd.DataFrame:
    return fetch_all()


def _bump_data_version() -> None:
    st.session_state["data_version"] = st.session_state.get("data_version", 0) + 1


def _ensure_state() -> None:
    if "data_version" not in st.session_state:
        st.session_state["data_version"] = 0


def _import_sidebar() -> None:
    st.sidebar.header("Import / Données")
    uploaded = st.sidebar.file_uploader(
        "Importer CSV ou Excel",
        type=["csv", "xlsx", "xls"],
        accept_multiple_files=False,
    )
    if uploaded is not None and st.sidebar.button("Lancer l'import"):
        inserted, warnings = import_file(uploaded, uploaded.name)
        if inserted:
            st.sidebar.success(f"{inserted} facture(s) importée(s).")
        else:
            st.sidebar.warning("Aucune ligne importée.")
        for w in warnings:
            st.sidebar.info(w)
        _bump_data_version()

    if st.sidebar.button("Recalculer les statuts"):
        n = refresh_statuses(compute_statut)
        st.sidebar.success(f"{n} statut(s) mis à jour.")
        _bump_data_version()

    with st.sidebar.expander("Zone dangereuse"):
        confirm = st.checkbox("Je confirme")
        if st.button("Vider la base", disabled=not confirm):
            delete_all()
            st.success("Base vidée.")
            _bump_data_version()


def _manual_add_form() -> None:
    with st.expander("Ajouter une facture manuellement"):
        with st.form("add_facture", clear_on_submit=True):
            c1, c2, c3 = st.columns(3)
            date_soin = c1.date_input("Date de soin", value=date.today())
            patient_code = c2.text_input("Code patient")
            mutuelle = c3.text_input("Mutuelle")

            c4, c5, c6 = st.columns(3)
            numero_facture = c4.text_input("N° facture")
            montant_attendu = c5.number_input(
                "Montant attendu (€)", min_value=0.0, step=0.5
            )
            date_envoi = c6.date_input("Date d'envoi", value=None)

            commentaire = st.text_input("Commentaire")
            submitted = st.form_submit_button("Enregistrer")
            if submitted:
                row = {
                    "date_soin": date_soin.isoformat() if date_soin else None,
                    "patient_code": patient_code.strip() or None,
                    "mutuelle": mutuelle.strip() or None,
                    "numero_facture": numero_facture.strip() or None,
                    "montant_attendu": float(montant_attendu),
                    "date_envoi": date_envoi.isoformat() if date_envoi else None,
                    "date_reglement": None,
                    "montant_regle": 0.0,
                    "commentaire": commentaire.strip() or None,
                }
                row["statut"] = compute_statut(row)
                insert_facture(row)
                st.success("Facture ajoutée.")
                _bump_data_version()


def _payment_and_reject_panel(df: pd.DataFrame) -> None:
    if df.empty:
        return
    st.markdown("#### Actions sur une facture")
    options = {
        int(r["id"]): f"#{int(r['id'])} — {r.get('patient_code') or '?'} — "
        f"{r.get('mutuelle') or '?'} — {float(r.get('montant_attendu') or 0):.2f} €"
        for _, r in df.iterrows()
    }
    selected = st.selectbox(
        "Sélectionner une facture",
        options=list(options.keys()),
        format_func=lambda i: options[i],
    )

    c1, c2 = st.columns(2)

    with c1:
        st.markdown("**Ajouter un règlement**")
        with st.form("payment_form"):
            montant = st.number_input(
                "Montant réglé (€)", min_value=0.0, step=0.5
            )
            d_reg = st.date_input("Date de règlement", value=date.today())
            if st.form_submit_button("Enregistrer le règlement"):
                add_payment(selected, float(montant), d_reg.isoformat())
                refresh_statuses(compute_statut)
                st.success("Règlement enregistré.")
                _bump_data_version()

    with c2:
        st.markdown("**Marquer comme rejetée**")
        with st.form("reject_form"):
            motif = st.text_input("Motif (optionnel)")
            if st.form_submit_button("Marquer rejetée"):
                mark_rejected(selected, motif)
                st.warning(f"Facture #{selected} marquée rejetée.")
                _bump_data_version()


def main() -> None:
    init_db()
    _ensure_state()
    _import_sidebar()

    st.title("💶 Suivi des règlements mutuelles")
    st.caption(
        "Application locale — aucune donnée n'est envoyée à l'extérieur. "
        "Patients pseudonymisés via patient_code."
    )

    # Auto-refresh statuses on each load so overdue invoices show up.
    refresh_statuses(compute_statut)

    df = _load_data(st.session_state["data_version"])

    tabs = st.tabs(["Tableau de bord", "Factures", "Relances", "Saisie / Actions"])

    with tabs[0]:
        render_dashboard(df)

    with tabs[1]:
        filtered = render_filterable_table(df)
        if not filtered.empty:
            st.download_button(
                "Exporter la sélection (CSV)",
                data=factures_to_csv_bytes(filtered),
                file_name="factures_mutuelles.csv",
                mime="text/csv",
            )

    with tabs[2]:
        render_relances(df)

    with tabs[3]:
        _manual_add_form()
        _payment_and_reject_panel(df)

    with st.expander("Légende des statuts"):
        st.write(" • ".join(STATUTS))


if __name__ == "__main__":
    main()
