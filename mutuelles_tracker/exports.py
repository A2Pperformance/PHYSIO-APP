"""CSV and PDF export helpers."""

from __future__ import annotations

from datetime import date
from io import BytesIO

import pandas as pd

RELANCE_COLUMNS = [
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


def relances_to_csv_bytes(df: pd.DataFrame) -> bytes:
    cols = [c for c in RELANCE_COLUMNS if c in df.columns]
    return df[cols].to_csv(index=False).encode("utf-8-sig")


def factures_to_csv_bytes(df: pd.DataFrame) -> bytes:
    return df.to_csv(index=False).encode("utf-8-sig")


def relances_to_pdf_bytes(df: pd.DataFrame) -> bytes:
    """Render the relances list as a simple PDF using reportlab."""
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4, landscape
    from reportlab.lib.styles import getSampleStyleSheet
    from reportlab.lib.units import mm
    from reportlab.platypus import (
        Paragraph,
        SimpleDocTemplate,
        Spacer,
        Table,
        TableStyle,
    )

    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=landscape(A4),
        leftMargin=10 * mm,
        rightMargin=10 * mm,
        topMargin=12 * mm,
        bottomMargin=12 * mm,
    )
    styles = getSampleStyleSheet()
    elements = []
    elements.append(Paragraph("Relances mutuelles", styles["Title"]))
    elements.append(
        Paragraph(f"Édité le {date.today().isoformat()}", styles["Normal"])
    )
    elements.append(Spacer(1, 6 * mm))

    if df.empty:
        elements.append(Paragraph("Aucune facture à relancer.", styles["Normal"]))
    else:
        cols = [c for c in RELANCE_COLUMNS if c in df.columns]
        header = [c.replace("_", " ") for c in cols]
        data = [header]
        for _, row in df.iterrows():
            line = []
            for c in cols:
                val = row.get(c)
                if val is None or (isinstance(val, float) and val != val):
                    line.append("")
                elif isinstance(val, float):
                    line.append(f"{val:.2f}")
                else:
                    line.append(str(val))
            data.append(line)

        table = Table(data, repeatRows=1)
        table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1f3a5f")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, -1), 7),
                    ("GRID", (0, 0), (-1, -1), 0.25, colors.grey),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    (
                        "ROWBACKGROUNDS",
                        (0, 1),
                        (-1, -1),
                        [colors.whitesmoke, colors.white],
                    ),
                ]
            )
        )
        elements.append(table)
        elements.append(Spacer(1, 6 * mm))
        total_reste = 0.0
        if "reste" in df.columns:
            total_reste = float(
                pd.to_numeric(df["reste"], errors="coerce").fillna(0).sum()
            )
        elements.append(
            Paragraph(
                f"<b>Total reste à encaisser :</b> {total_reste:.2f} €",
                styles["Normal"],
            )
        )

    doc.build(elements)
    return buffer.getvalue()
