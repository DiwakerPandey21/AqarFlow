import fs from "fs";
import path from "path";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  ImageRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType
} from "docx";

const screenshotsDir = "D:/AqarFlow/docs/screenshots";
const landingImg = fs.readFileSync(path.join(screenshotsDir, "day2_public_landing_front.png"));
const featuredImg = fs.readFileSync(path.join(screenshotsDir, "day2_featured_residences.png"));
const workspaceLightImg = fs.readFileSync(path.join(screenshotsDir, "day2_workspace_light.png"));
const workspaceDarkImg = fs.readFileSync(path.join(screenshotsDir, "day2_workspace_dark.png"));
const rentalsImg = fs.readFileSync(path.join(screenshotsDir, "day2_workspace_rentals.png"));
const maintenanceImg = fs.readFileSync(path.join(screenshotsDir, "day2_workspace_maintenance.png"));

const borderNone = {
  top: { style: BorderStyle.NONE },
  bottom: { style: BorderStyle.NONE },
  left: { style: BorderStyle.NONE },
  right: { style: BorderStyle.NONE }
};

const borderSubtle = {
  top: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
  left: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
  right: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" }
};

function createMetaCell(label, value) {
  return [
    new TableCell({
      width: { size: 25, type: WidthType.PERCENTAGE },
      shading: { fill: "F8FAFC", type: ShadingType.CLEAR },
      borders: borderSubtle,
      children: [
        new Paragraph({
          children: [new TextRun({ text: label, bold: true, size: 18, color: "334155" })]
        })
      ]
    }),
    new TableCell({
      width: { size: 25, type: WidthType.PERCENTAGE },
      borders: borderSubtle,
      children: [
        new Paragraph({
          children: [new TextRun({ text: value, size: 18, color: "0F172A" })]
        })
      ]
    })
  ];
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: "Calibri",
          size: 22,
          color: "1E293B"
        }
      }
    }
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1200, bottom: 1200, left: 1200, right: 1200 }
        }
      },
      children: [
        // Title Banner
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: "VIRELEO INTERNSHIP PROGRAM",
              bold: true,
              size: 24,
              color: "B45309"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: "PROJECT 01: AQARFLOW — DAY 2 PROGRESS REPORT",
              bold: true,
              size: 32,
              color: "0F172A"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [
            new TextRun({
              text: "Real Estate Management & Property Operations Platform • 7-Day MVP Execution",
              italics: true,
              size: 20,
              color: "64748B"
            })
          ]
        }),

        // Metadata Table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: borderSubtle,
          rows: [
            new TableRow({
              children: [
                ...createMetaCell("Project Name", "AqarFlow (Project 01)"),
                ...createMetaCell("Submission Date", "November 10, 2026 (Day 2)")
              ]
            }),
            new TableRow({
              children: [
                ...createMetaCell("Parent Organization", "VIRELEO (vireleo.me)"),
                ...createMetaCell("Development Model", "Individual Full-Stack Ownership")
              ]
            }),
            new TableRow({
              children: [
                ...createMetaCell("Current Version", "v1.2 Editorial + Dual CRM"),
                ...createMetaCell("Primary Focus", "Pakistan Metros + Overseas Diaspora")
              ]
            }),
            new TableRow({
              children: [
                ...createMetaCell("Tech Stack", "Next.js 16, React 19, Tailwind, TS"),
                ...createMetaCell("Build Status", "33/33 Routes Passed (Exit 0)")
              ]
            })
          ]
        }),

        // Section 1: Executive Summary
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 },
          children: [new TextRun({ text: "1. Executive Summary & Day 2 Deliverables", bold: true, color: "B45309" })]
        }),
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun(
              "During Day 2 of the 7-day MVP delivery cycle, development accomplished major aesthetic, operational, and architectural leaps. The platform was elevated into an institutional-grade, editorial luxury real estate portal while fulfilling every technical directive: zero hydration errors, 100% eradication of foreign (Dubai) naming, introduction of a dual-theme CRM (Estately Light by default + Estatelab Dark toggle), and deployment of Phase 2 and Phase 3 operations modules (Rental Rolls & Contractor Maintenance Hub)."
            )
          ]
        }),

        // Section 2: Key Deliverables
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 },
          children: [new TextRun({ text: "2. Key Technical Accomplishments", bold: true, color: "B45309" })]
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Elimination of Hydration Discrepancy: ", bold: true }),
            new TextRun("Fixed SSR vs. browser locale mismatch by writing deterministic mathematical string formatters for USD and PKR currency, achieving 0 console warnings.")
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Deep Pakistan Metropolitan Localization: ", bold: true }),
            new TextRun("Completely purged foreign references; aligned listings and operations strictly with Islamabad (Sectors F-6, F-7, E-7), Lahore (DHA Raya Golf), Karachi (Clifton Marina), and Rawalpindi (Bahria Town). Overseas diaspora channels cater to London, Manchester, Toronto, and New York.")
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Agency Workspace Dual-Theme Architecture: ", bold: true }),
            new TextRun("Configured Estately Light Mode as the out-of-the-box system default with pure white card containers and dark typography. Implemented instant switching to Estatelab Obsidian Dark Mode with localStorage persistence.")
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Vero Estate Editorial Public Experience: ", bold: true }),
            new TextRun("Upgraded all 6 public portal pages with Warm Alabaster (#FAF8F5) styling, Playfair Display typography, arched hero frames, and verified CDA/LDA deed inspection badges.")
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Phase 2 & 3 Enterprise Workflows: ", bold: true }),
            new TextRun("Shipped Rental Roll management with tenant lease terms and rent payment tracking, alongside a Contractor Maintenance Hub with urgency triage (Emergency to Low) and SLA sentry.")
          ]
        }),

        // Section 3: Visual Evidence
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 },
          children: [new TextRun({ text: "3. Visual Evidence & High-Definition Screenshots", bold: true, color: "B45309" })]
        }),

        // Figure 1
        new Paragraph({
          spacing: { before: 150, after: 80 },
          children: [new TextRun({ text: "Figure 1: Elevated Public Discovery Portal (Hero Section)", bold: true })]
        }),
        new Paragraph({
          children: [
            new ImageRun({
              data: landingImg,
              transformation: { width: 600, height: 350 }
            })
          ]
        }),

        // Figure 2
        new Paragraph({
          spacing: { before: 200, after: 80 },
          children: [new TextRun({ text: "Figure 2: Curated Architectural Residences Grid", bold: true })]
        }),
        new Paragraph({
          children: [
            new ImageRun({
              data: featuredImg,
              transformation: { width: 600, height: 350 }
            })
          ]
        }),

        // Figure 3
        new Paragraph({
          spacing: { before: 200, after: 80 },
          children: [new TextRun({ text: "Figure 3: Agency Workspace in Estately Light Mode (System Default)", bold: true })]
        }),
        new Paragraph({
          children: [
            new ImageRun({
              data: workspaceLightImg,
              transformation: { width: 600, height: 350 }
            })
          ]
        }),

        // Figure 4
        new Paragraph({
          spacing: { before: 200, after: 80 },
          children: [new TextRun({ text: "Figure 4: Agency Workspace in Estatelab Dark Mode (Optional Toggle)", bold: true })]
        }),
        new Paragraph({
          children: [
            new ImageRun({
              data: workspaceDarkImg,
              transformation: { width: 600, height: 350 }
            })
          ]
        }),

        // Figure 5
        new Paragraph({
          spacing: { before: 200, after: 80 },
          children: [new TextRun({ text: "Figure 5: Phase 3 Rental Roll & Lease Management Hub", bold: true })]
        }),
        new Paragraph({
          children: [
            new ImageRun({
              data: rentalsImg,
              transformation: { width: 600, height: 350 }
            })
          ]
        }),

        // Figure 6
        new Paragraph({
          spacing: { before: 200, after: 80 },
          children: [new TextRun({ text: "Figure 6: Phase 3 Contractor Maintenance & SLA Hub", bold: true })]
        }),
        new Paragraph({
          children: [
            new ImageRun({
              data: maintenanceImg,
              transformation: { width: 600, height: 350 }
            })
          ]
        }),

        // Section 4: QA
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 },
          children: [new TextRun({ text: "4. Quality Assurance & Production Verification", bold: true, color: "B45309" })]
        }),
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun(
              "Next.js 16 production build compiled 33 of 33 routes with zero TypeScript or Webpack errors. Client hydration was verified with zero console errors, and dark/light switching operates with zero layout shift."
            )
          ]
        }),

        // Section 5: Roadmap
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 },
          children: [new TextRun({ text: "5. Day 3 Roadmap & Next Objectives", bold: true, color: "B45309" })]
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Downloadable Document Vault: ", bold: true }),
            new TextRun("Client property brochures, verified deed clearances, and tenant payment receipts in printable format.")
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Accounting & Reporting Export: ", bold: true }),
            new TextRun("CSV and Excel export pipelines for agency commission disbursements and net rental yields.")
          ]
        }),

        // Footer Signoff
        new Paragraph({
          spacing: { before: 350 },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "VIRELEO Project 01 — AqarFlow | Individual Developer Delivery | Official Portal: https://www.vireleo.me/",
              italics: true,
              size: 18,
              color: "64748B"
            })
          ]
        })
      ]
    }
  ]
});

const docxPathDocs = "D:/AqarFlow/docs/VIRELEO_Project01_AqarFlow_Day2_Report.docx";
const docxPathRoot = "D:/AqarFlow/VIRELEO_Project01_AqarFlow_Day2_Report.docx";

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(docxPathDocs, buffer);
  fs.writeFileSync(docxPathRoot, buffer);
  console.log(`Day 2 Word report successfully generated at:`);
  console.log(` - ${docxPathDocs}`);
  console.log(` - ${docxPathRoot}`);
});
