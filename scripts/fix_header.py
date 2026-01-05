from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.enums import TA_CENTER
import os

ACCENT = HexColor("#1a365d")
TEXT = HexColor("#1a1a1a")
MUTED = HexColor("#4a5568")

out = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "Joseph_Cannon_Resume.pdf")
os.makedirs(os.path.dirname(out), exist_ok=True)

doc = SimpleDocTemplate(out, pagesize=letter, rightMargin=0.6*inch, leftMargin=0.6*inch, topMargin=0.5*inch, bottomMargin=0.5*inch)
styles = getSampleStyleSheet()

name = ParagraphStyle("Name", parent=styles["Normal"], fontSize=24, fontName="Helvetica-Bold", textColor=ACCENT, spaceAfter=6, alignment=TA_CENTER, leading=28)
creds = ParagraphStyle("Creds", parent=styles["Normal"], fontSize=10, fontName="Helvetica", textColor=MUTED, spaceAfter=2, alignment=TA_CENTER)
contact = ParagraphStyle("Contact", parent=styles["Normal"], fontSize=9, textColor=MUTED, spaceAfter=12, alignment=TA_CENTER)
section = ParagraphStyle("Section", parent=styles["Normal"], fontSize=11, fontName="Helvetica-Bold", textColor=ACCENT, spaceBefore=10, spaceAfter=6)
jobt = ParagraphStyle("JobT", parent=styles["Normal"], fontSize=10, fontName="Helvetica-Bold", textColor=TEXT, spaceAfter=2)
jobm = ParagraphStyle("JobM", parent=styles["Normal"], fontSize=9, fontName="Helvetica-Oblique", textColor=MUTED, spaceAfter=4)
bullet = ParagraphStyle("Bullet", parent=styles["Normal"], fontSize=9, textColor=TEXT, leftIndent=12, spaceAfter=3, leading=12)
norm = ParagraphStyle("Norm", parent=styles["Normal"], fontSize=9, textColor=TEXT, spaceAfter=6)

s = []
s.append(Paragraph("JOSEPH CANNON", name))
s.append(Paragraph("MMCS (E-8), USN (Ret.) | PMP | LEED AP | MBA", creds))
s.append(Paragraph("Yorkville, IL | jrc1883@gmail.com | linkedin.com/in/josephcannon | unjoe.me", contact))
s.append(HRFlowable(width="100%", thickness=1, color=ACCENT, spaceAfter=8))
s.append(Paragraph("EXECUTIVE SUMMARY", section))
s.append(Paragraph("Senior operations leader with 21+ years of U.S. Navy service and 9 years of Fortune 500 facilities management experience. Proven track record managing $140M+ portfolios, leading 350+ personnel, and driving operational excellence through data-driven decision making. Expert in building cross-functional teams, implementing enterprise systems, and delivering measurable cost savings. TS/SCI clearance eligible (reinvestigation window through Feb 2026).", norm))
s.append(Spacer(1, 6))
s.append(HRFlowable(width="100%", thickness=1, color=ACCENT, spaceAfter=8))
s.append(Paragraph("PROFESSIONAL EXPERIENCE", section))
s.append(Paragraph("MEGA Regional Facilities Services Manager", jobt))
s.append(Paragraph("Mars Inc. | Yorkville, IL | 2016 - Present", jobm))
for b in ["Lead integrated facilities management across 47 sites in North America with $50-60M direct budget", "Spearheaded IFM 2.0 transition for 47 sites with zero disruptions during July 2024 go-live", "Built Power BI dashboards driving 14% efficiency improvement (SAE: 74.6% to 84.8%)", "Delivered $815K in Value Leadership Savings through MRO supply strategy optimization", "Increased CMMS asset completion from <40% to >85% and site stabilization from 50% to 80%", "Manage 8,700+ assets with comprehensive PM schedules and compliance tracking", "Reduced meetings by 30% and task completion time by 20% through AI tool implementation", "Led Allied Security provider transition across 27 U.S. sites in partnership with ISS"]:
    s.append(Paragraph(f"<bullet>&bull;</bullet> {b}", bullet))
s.append(Spacer(1, 8))
s.append(Paragraph("Senior Chief Petty Officer (MMCS, E-8) - Senior Enlisted Leader", jobt))
s.append(Paragraph("U.S. Navy | Various Locations | 2003 - 2024 (21 years)", jobm))
for b in ["Department LCPO at Navy Recruit Training Command: Led 6 CPOs, 27 POs, 26 supervisors across $1B complex", "Managed $2M facilities budget with 2,461 job requests; identified and corrected 3,000 deficiencies", "Lead RDC: Transformed 176 civilians into Sailors per cycle; achieved 18 meritorious advancements", "Command Training Officer: Planned $959K training budget for 118 Sailors (3,338 man-days)", "Increased mission readiness 30-40% through qualification tracking systems adopted across 329+ Sailors", "UNREP Operations: Transferred 2.2M+ gallons fuel across 14 multi-national ships", "Warfare Qualified: Surface Warfare (SW) and Air Warfare (AW) designations"]:
    s.append(Paragraph(f"<bullet>&bull;</bullet> {b}", bullet))
s.append(Spacer(1, 8))
s.append(Paragraph("Systems Engineer - Building Commissioning", jobt))
s.append(Paragraph("Enovity, Inc. | San Francisco, CA | 2008 - 2013", jobm))
for b in ["Led energy efficiency assessments for 200+ commercial and government facilities", "Authored 75+ technical analysis reports on HVAC, lighting, and building automation systems", "Secured $300K+ in energy rebates for clients through utility incentive programs", "Key clients: NARA, UCSF Medical Center, GSA Federal Buildings, Intel, Genentech"]:
    s.append(Paragraph(f"<bullet>&bull;</bullet> {b}", bullet))
s.append(Spacer(1, 6))
s.append(HRFlowable(width="100%", thickness=1, color=ACCENT, spaceAfter=8))
s.append(Paragraph("TECHNICAL PROJECTS", section))
s.append(Paragraph("PopKit - Claude Code Plugin Ecosystem", jobt))
s.append(Paragraph("<bullet>&bull;</bullet> Open-source plugin with 30+ specialized AI agents for development workflows", bullet))
s.append(Paragraph("<bullet>&bull;</bullet> Features automated assessments, multi-agent coordination, and project management tools", bullet))
s.append(Paragraph("<bullet>&bull;</bullet> GitHub: github.com/jrc1883/popkit", bullet))
s.append(Spacer(1, 6))
s.append(HRFlowable(width="100%", thickness=1, color=ACCENT, spaceAfter=8))
s.append(Paragraph("EDUCATION &amp; CERTIFICATIONS", section))
for row in [["MBA, International Business", "Liberty University", "2018"], ["BA, Business Management", "Golden Gate University", "2013"], ["Senior Enlisted Academy", "U.S. Navy (Capstone Award)", "2011"], ["SEJPME", "National Defense University", "Current"]]:
    s.append(Paragraph(f"<b>{row[0]}</b> | {row[1]} | {row[2]}", norm))
s.append(Spacer(1, 4))
s.append(Paragraph("<b>Certifications:</b> PMP | LEED AP | Agile@Mars | Navy Instructor (NEC 9502) | RDC (NEC 9508)", norm))
s.append(Spacer(1, 6))
s.append(HRFlowable(width="100%", thickness=1, color=ACCENT, spaceAfter=8))
s.append(Paragraph("KEY COMPETENCIES", section))
s.append(Paragraph("<b>Leadership:</b> Cross-functional team leadership | Change management | Talent development | Strategic planning<br/><b>Operations:</b> Facilities management | Asset management | Supply chain | Process optimization<br/><b>Technical:</b> Power BI | SAP | SharePoint | Microsoft 365 | AI/Automation | Data analytics<br/><b>Domains:</b> Defense/Government | Manufacturing | Energy efficiency | HVAC systems", norm))
doc.build(s)
print(f"Generated: {out}")
