"""
Generate Joseph Cannon's Resume PDF
Uses reportlab to create a professional, clean resume
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
import os

# Colors
ACCENT_COLOR = HexColor('#1a365d')  # Navy blue
TEXT_COLOR = HexColor('#1a1a1a')
MUTED_COLOR = HexColor('#4a5568')

def create_resume():
    # Output path
    output_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_path = os.path.join(output_dir, 'public', 'Joseph_Cannon_Resume.pdf')

    # Ensure public directory exists
    os.makedirs(os.path.join(output_dir, 'public'), exist_ok=True)

    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=0.6*inch,
        leftMargin=0.6*inch,
        topMargin=0.5*inch,
        bottomMargin=0.5*inch
    )

    # Styles
    styles = getSampleStyleSheet()

    name_style = ParagraphStyle(
        'Name',
        parent=styles['Normal'],
        fontSize=22,
        fontName='Helvetica-Bold',
        textColor=ACCENT_COLOR,
        spaceAfter=4,
        alignment=TA_CENTER
    )

    contact_style = ParagraphStyle(
        'Contact',
        parent=styles['Normal'],
        fontSize=9,
        textColor=MUTED_COLOR,
        spaceAfter=12,
        alignment=TA_CENTER
    )

    section_header_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Normal'],
        fontSize=11,
        fontName='Helvetica-Bold',
        textColor=ACCENT_COLOR,
        spaceBefore=10,
        spaceAfter=6,
        borderPadding=0
    )

    job_title_style = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontSize=10,
        fontName='Helvetica-Bold',
        textColor=TEXT_COLOR,
        spaceAfter=2
    )

    job_meta_style = ParagraphStyle(
        'JobMeta',
        parent=styles['Normal'],
        fontSize=9,
        fontName='Helvetica-Oblique',
        textColor=MUTED_COLOR,
        spaceAfter=4
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontSize=9,
        textColor=TEXT_COLOR,
        leftIndent=12,
        spaceAfter=3,
        leading=12
    )

    normal_style = ParagraphStyle(
        'NormalText',
        parent=styles['Normal'],
        fontSize=9,
        textColor=TEXT_COLOR,
        spaceAfter=6
    )

    story = []

    # Header
    story.append(Paragraph("JOSEPH CANNON", name_style))
    story.append(Paragraph(
        "MMCS (E-8), USN (Ret.) | PMP | LEED AP | MBA<br/>"
        "Yorkville, IL | jrc1883@gmail.com | linkedin.com/in/josephcannon | unjoe.me",
        contact_style
    ))

    # Summary
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT_COLOR, spaceAfter=8))
    story.append(Paragraph("EXECUTIVE SUMMARY", section_header_style))
    story.append(Paragraph(
        "Senior operations leader with 21+ years of U.S. Navy service and 9 years of Fortune 500 facilities management experience. "
        "Proven track record managing $140M+ portfolios, leading 350+ personnel, and driving operational excellence through data-driven decision making. "
        "Expert in building cross-functional teams, implementing enterprise systems, and delivering measurable cost savings. "
        "TS/SCI clearance eligible (reinvestigation window through Feb 2026).",
        normal_style
    ))

    # Professional Experience
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT_COLOR, spaceAfter=8))
    story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_header_style))

    # Mars Inc.
    story.append(Paragraph("MEGA Regional Facilities Services Manager", job_title_style))
    story.append(Paragraph("Mars Inc. | Yorkville, IL | 2016 - Present", job_meta_style))
    bullets = [
        "Lead integrated facilities management across 47 sites in North America with $50-60M direct budget responsibility",
        "Spearheaded IFM 2.0 transition for 47 sites with zero disruptions during July 2024 go-live",
        "Built Power BI dashboards driving 14% efficiency improvement (SAE: 74.6% to 84.8%)",
        "Delivered $815K in Value Leadership Savings through MRO supply strategy optimization",
        "Increased CMMS asset completion from <40% to >85% and site stabilization from 50% to 80%",
        "Manage 8,700+ assets with comprehensive PM schedules and compliance tracking",
        "Reduced meetings by 30% and task completion time by 20% through AI tool implementation (Microsoft Co-Pilot)",
        "Led Allied Security provider transition across 27 U.S. sites in partnership with ISS"
    ]
    for bullet in bullets:
        story.append(Paragraph(f"<bullet>&bull;</bullet> {bullet}", bullet_style))

    # Navy Career
    story.append(Spacer(1, 8))
    story.append(Paragraph("Senior Chief Petty Officer (MMCS, E-8) - Senior Enlisted Leader", job_title_style))
    story.append(Paragraph("U.S. Navy | Various Locations | 2003 - 2024 (21 years)", job_meta_style))

    navy_bullets = [
        "Department LCPO at Navy Recruit Training Command: Led 6 CPOs, 27 POs, and 26 maintenance supervisors across $1B, 240-acre complex with 42 facilities",
        "Managed $2M facilities budget with 2,461 job requests; identified and corrected 3,000 deficiencies",
        "Lead RDC: Transformed 176 civilians into Sailors per cycle; achieved 18 meritorious advancements",
        "Command Training Officer: Planned $959K training budget for 118 Sailors (3,338 man-days)",
        "Increased mission readiness 30-40% through qualification tracking systems adopted across 329+ Sailors",
        "UNREP Operations: Transferred 2.2M+ gallons fuel across 14 multi-national ships with 100% safety compliance",
        "Warfare Qualified: Surface Warfare (SW) and Air Warfare (AW) designations"
    ]
    for bullet in navy_bullets:
        story.append(Paragraph(f"<bullet>&bull;</bullet> {bullet}", bullet_style))

    # Enovity
    story.append(Spacer(1, 8))
    story.append(Paragraph("Systems Engineer - Building Commissioning", job_title_style))
    story.append(Paragraph("Enovity, Inc. | San Francisco, CA | 2008 - 2013", job_meta_style))

    enovity_bullets = [
        "Led energy efficiency assessments for 200+ commercial and government facilities",
        "Authored 75+ technical analysis reports on HVAC, lighting, and building automation systems",
        "Secured $300K+ in energy rebates for clients through utility incentive programs",
        "Key clients: NARA (National Archives), UCSF Medical Center, GSA Federal Buildings, Intel, Genentech"
    ]
    for bullet in enovity_bullets:
        story.append(Paragraph(f"<bullet>&bull;</bullet> {bullet}", bullet_style))

    # Technical Projects
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT_COLOR, spaceAfter=8))
    story.append(Paragraph("TECHNICAL PROJECTS", section_header_style))

    story.append(Paragraph("PopKit - Claude Code Plugin Ecosystem", job_title_style))
    story.append(Paragraph(f"<bullet>&bull;</bullet> Open-source plugin with 30+ specialized AI agents for development workflows", bullet_style))
    story.append(Paragraph(f"<bullet>&bull;</bullet> Features automated assessments, multi-agent coordination, and project management tools", bullet_style))
    story.append(Paragraph(f"<bullet>&bull;</bullet> GitHub: github.com/jrc1883/popkit", bullet_style))

    # Education & Certifications
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT_COLOR, spaceAfter=8))
    story.append(Paragraph("EDUCATION & CERTIFICATIONS", section_header_style))

    edu_data = [
        ["MBA, International Business", "Liberty University", "2018"],
        ["BA, Business Management", "Golden Gate University", "2013"],
        ["Senior Enlisted Academy", "U.S. Navy (Capstone Award)", "2011"],
        ["SEJPME", "National Defense University", "Current"],
    ]

    for row in edu_data:
        story.append(Paragraph(f"<b>{row[0]}</b> | {row[1]} | {row[2]}", normal_style))

    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Certifications:</b> PMP (Project Management Professional) | LEED AP | Agile@Mars | Navy Instructor (NEC 9502) | RDC (NEC 9508)", normal_style))

    # Key Competencies
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT_COLOR, spaceAfter=8))
    story.append(Paragraph("KEY COMPETENCIES", section_header_style))

    story.append(Paragraph(
        "<b>Leadership:</b> Cross-functional team leadership | Change management | Talent development | Strategic planning<br/>"
        "<b>Operations:</b> Facilities management | Asset management | Supply chain | Process optimization<br/>"
        "<b>Technical:</b> Power BI | SAP | SharePoint | Microsoft 365 | AI/Automation | Data analytics<br/>"
        "<b>Domains:</b> Defense/Government | Manufacturing | Energy efficiency | HVAC systems",
        normal_style
    ))

    # Build PDF
    doc.build(story)
    print(f"Resume generated: {output_path}")
    return output_path

if __name__ == "__main__":
    create_resume()
