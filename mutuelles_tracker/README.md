# Suivi des règlements mutuelles

Application locale (MVP) pour un cabinet de kinésithérapie permettant de
suivre les factures envoyées aux mutuelles et leur règlement.

> **100 % local.** Aucune donnée n'est envoyée vers le cloud. Les patients
> sont identifiés par un `patient_code` pseudonyme ; aucune donnée
> nominative n'est requise.

## Fonctionnalités

- Import CSV / Excel des factures mutuelles
- Tableau de bord (totaux, retards, délai moyen de règlement…)
- Liste des factures filtrable (mutuelle, statut, recherche)
- Détection automatique des statuts (`À envoyer`, `En attente`, `En retard`,
  `Payée`, `Partiellement payée`, `Rejetée`, …)
- Page « Relances » listant les factures en retard
- Ajout manuel d'un règlement, marquage d'une facture comme rejetée
- Export CSV et PDF des relances

## Règles métier

| Condition | Statut |
|---|---|
| `date_envoi` vide | À envoyer |
| `date_envoi` remplie, `date_reglement` vide | En attente |
| `date_envoi` > 15 jours sans règlement | En retard |
| `montant_regle` = `montant_attendu` | Payée |
| `0 < montant_regle < montant_attendu` | Partiellement payée |
| Marquage manuel | Rejetée |

Quand le statut est `En retard`, l'action recommandée est
**« Relancer la mutuelle »**.

## Installation

```bash
cd mutuelles_tracker
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## Lancement

```bash
streamlit run app.py
```

Streamlit ouvre l'application dans le navigateur (par défaut
`http://localhost:8501`). La base SQLite `mutuelles.db` est créée
automatiquement à côté de `app.py`.

## Fichier d'exemple

`reglements_mutuelles_exemple.csv` contient une douzaine de factures
représentatives des différents statuts. Utilisez-le pour tester l'import.

Colonnes attendues (les en-têtes alternatifs sont acceptés via aliasing) :

```
date_soin, patient_code, mutuelle, numero_facture,
montant_attendu, date_envoi, date_reglement, montant_regle, commentaire
```

Formats de date acceptés : `YYYY-MM-DD`, `DD/MM/YYYY`, `DD-MM-YYYY`.

## Structure du projet

```
mutuelles_tracker/
├── app.py                          # Entrée Streamlit
├── database.py                     # Couche SQLite
├── imports.py                      # Import CSV/Excel
├── business_rules.py               # Calcul des statuts
├── dashboard.py                    # KPIs et tableau filtrable
├── relances.py                     # Page « Relances »
├── exports.py                      # Export CSV / PDF
├── requirements.txt
├── reglements_mutuelles_exemple.csv
└── README.md
```

## Schéma SQLite

```sql
CREATE TABLE reglements_mutuelles (
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
```

## Confidentialité

- Aucune requête réseau sortante.
- Stockage limité à `mutuelles.db` (SQLite local).
- Pour partager la base entre postes, copiez le fichier `mutuelles.db`
  manuellement — il n'y a pas de synchronisation automatique.
