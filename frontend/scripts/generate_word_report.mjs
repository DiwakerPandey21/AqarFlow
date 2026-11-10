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
const publicPortalImg = fs.readFileSync(path.join(screenshotsDir, "public_portal_front.png"));
const workspaceImg = fs.readFileSync(path.join(screenshotsDir, "agency_workspace_front.png"));
const kanbanImg = fs.readFileSync(path.join(screenshotsDir, "kanban_crm.png"));
const propertiesImg = fs.readFileSync(path.join(screenshotsDir, "properties_portal.png"));

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
              color: "2563EB"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: "PROJECT 01: AQARFLOW",
              bold: true,
              size: 40,
              color: "0F172A"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [
            new TextRun({
              text: "Real Estate Management & Property Operations Platform",
              size: 24,
              italics: true,
              color: "64748B"
            }),
            new TextRun({
              text: "\nDay 1 Detailed Execution & Delivery Report (7-Day MVP)",
              size: 22,
              bold: true,
              color: "047857"
            })
          ]
        }),

        // Metadata Table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                  children: [new Paragraph({ children: [new TextRun({ text: "Project Name:", bold: true })] })]
                }),
                new TableCell({
                  children: [new Paragraph({ text: "AqarFlow (Real Estate ERP + CRM + Discovery Portal)" })]
                }),
                new TableCell({
                  shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                  children: [new Paragraph({ children: [new TextRun({ text: "Organization:", bold: true })] })]
                }),
                new TableCell({
                  children: [new Paragraph({ text: "VIRELEO (https://www.vireleo.me/)" })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                  children: [new Paragraph({ children: [new TextRun({ text: "Delivery Model:", bold: true })] })]
                }),
                new TableCell({
                  children: [new Paragraph({ text: "Individual Project — End-to-End Ownership" })]
                }),
                new TableCell({
                  shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                  children: [new Paragraph({ children: [new TextRun({ text: "Date of Execution:", bold: true })] })]
                }),
                new TableCell({
                  children: [new Paragraph({ text: "November 9, 2026 (Day 1)" })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                  children: [new Paragraph({ children: [new TextRun({ text: "Primary Market:", bold: true })] })]
                }),
                new TableCell({
                  children: [new Paragraph({ text: "Pakistan (PKR Currency, Marla/Kanal, Major Enclaves)" })]
                }),
                new TableCell({
                  shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                  children: [new Paragraph({ children: [new TextRun({ text: "Status:", bold: true })] })]
                }),
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: "100% Core MVP Foundation Complete", bold: true, color: "047857" })] })]
                })
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 300, after: 150 }, text: "" }),

        // Executive Summary
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "1. Executive Summary", bold: true, color: "0F172A", size: 30 })]
        }),
        new Paragraph({
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: "AqarFlow (combining 'Aqar' — Arabic/Urdu for property and land — with 'Flow' — seamless digital business workflows) has completed its Day 1 milestone under the VIRELEO 7-day MVP delivery specification. The platform establishes a unified digital bridge connecting property buyers, authorized agencies, and property dealers across Islamabad, Lahore, Karachi, and nationwide."
            })
          ]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "The delivery encompasses two fully functional experiences: a public property discovery website and an internal operational workspace (ERP + CRM) equipped with lead pipelines, agent conflict prevention, and financial transaction statements."
            })
          ]
        }),

        // Visual Showcase - Public Portal
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "2. Visual Demonstrations: Public & Agency Portals", bold: true, color: "0F172A", size: 30 })]
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: "2.1 Public Property Discovery Portal (Front View)",
              bold: true,
              size: 24,
              color: "2563EB"
            })
          ]
        }),
        new Paragraph({
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: "The public discovery interface features an intuitive multivariable hero search engine, key market performance indicators, verified inventory badges, and handpicked property collections across prime Pakistani enclaves:"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new ImageRun({
              data: publicPortalImg,
              transformation: { width: 580, height: 320 }
            })
          ]
        }),

        // Visual Showcase - Agency Workspace
        new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: "2.2 Internal Business Workspace (Agency Executive Dashboard)",
              bold: true,
              size: 24,
              color: "2563EB"
            })
          ]
        }),
        new Paragraph({
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: "The internal business workspace equips agency owners, managers, and real estate brokers with live operational KPIs, lead conversion funnel analytics, recent client inquiries, and visit schedules:"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new ImageRun({
              data: workspaceImg,
              transformation: { width: 580, height: 320 }
            })
          ]
        }),

        // Visual Showcase - Kanban & Listings
        new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: "2.3 CRM Kanban Pipeline & Multi-Filter Property Explorer",
              bold: true,
              size: 24,
              color: "2563EB"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 150 },
          children: [
            new ImageRun({
              data: kanbanImg,
              transformation: { width: 580, height: 310 }
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 250 },
          children: [
            new ImageRun({
              data: propertiesImg,
              transformation: { width: 580, height: 310 }
            })
          ]
        }),

        // Day 1 Completed Features
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "3. Completed Work Breakdown (Day 1)", bold: true, color: "0F172A", size: 30 })]
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "• Public Property Portal: ", bold: true }),
            new TextRun({ text: "Implemented Hero search by purpose, property type, city, and keywords. Created dynamic filterable listing pages (`/properties`) and detailed property view (`/properties/[slug]`) with high-resolution gallery, specs in Marla/Kanal, verified amenities, agent profile card, and inquiry capture." })
          ]
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "• Double-Booking Conflict Engine: ", bold: true }),
            new TextRun({ text: "Designed an algorithmic scheduler in `db.ts` and `/api/v1/visits` that prevents an agent from having two client visits booked within a 45-minute overlapping window, issuing an immediate HTTP 409 Conflict." })
          ]
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "• Full Lead CRM: ", bold: true }),
            new TextRun({ text: "Integrated Kanban drag/click stage updates across 7 pipeline stages, plus a data table view, agent reassignment engine, and chronological communication activity drawer." })
          ]
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "• Deal Pipeline & Receipts: ", bold: true }),
            new TextRun({ text: "Engineered deal milestones with automatic commission accrual (1.5% to 3%) and a printable, audit-ready official Transaction Statement & Token Receipt." })
          ]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({ text: "• Institutional Audit Logs: ", bold: true }),
            new TextRun({ text: "Maintains an immutable operations trail logging actor, role, timestamp, entity type, and modification details." })
          ]
        }),

        // Technical Challenges & Resolutions
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "4. Technical Challenges Encountered & Resolved", bold: true, color: "0F172A", size: 30 })]
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "1. React 19 Hydration Mismatch Resolution: ", bold: true }),
            new TextRun({ text: "The server Node.js environment on Windows formatted large prices using Indian grouping (`14,50,00,000`), whereas client browsers used US grouping (`145,000,000`), causing WhatsApp link query parameters to diverge. Resolved by implementing `formatNumberFixed()`, an OS-locale-independent regex formatter, and adding `suppressHydrationWarning`." })
          ]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({ text: "2. Pure-JavaScript Tailwind CSS Pipeline: ", bold: true }),
            new TextRun({ text: "Next.js was running in Webpack mode to bypass OS AppLocker restrictions on native `.node` binaries, which caused Tailwind v4's Rust oxide scanner to emit empty CSS. Resolved by configuring pure-JavaScript Tailwind CSS v3.4 with PostCSS, Autoprefixer, and explicit template scanning in `tailwind.config.ts`, generating the full 61.5 KB stylesheet." })
          ]
        }),

        // Verification & Testing
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "5. Quality Assurance & Test Verification", bold: true, color: "0F172A", size: 30 })]
        }),
        new Paragraph({
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: "A 21-point automated integration test suite (`tests/test_api.mjs`) was executed against the live application server, achieving a 100% pass rate:"
            })
          ]
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ shading: { fill: "E2E8F0" }, children: [new Paragraph({ children: [new TextRun({ text: "Test Suite Component", bold: true })] })] }),
                new TableCell({ shading: { fill: "E2E8F0" }, children: [new Paragraph({ children: [new TextRun({ text: "Endpoint / Action Tested", bold: true })] })] }),
                new TableCell({ shading: { fill: "E2E8F0" }, children: [new Paragraph({ children: [new TextRun({ text: "Status", bold: true })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Health Endpoint" })] }),
                new TableCell({ children: [new Paragraph({ text: "GET /api/v1/health" })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASSED (200 OK)", bold: true, color: "047857" })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Public Properties Discovery" })] }),
                new TableCell({ children: [new Paragraph({ text: "GET /api/v1/public/properties?city=Islamabad" })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASSED (200 OK)", bold: true, color: "047857" })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Public Inquiry Ingestion" })] }),
                new TableCell({ children: [new Paragraph({ text: "POST /api/v1/public/inquiries" })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASSED (201 Created)", bold: true, color: "047857" })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Staff Authentication" })] }),
                new TableCell({ children: [new Paragraph({ text: "POST /api/v1/auth/login" })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASSED (200 OK)", bold: true, color: "047857" })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Double-Booking Collision Engine" })] }),
                new TableCell({ children: [new Paragraph({ text: "POST /api/v1/visits (Overlapping window)" })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASSED (409 Conflict)", bold: true, color: "047857" })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Deal Pipeline & Commission" })] }),
                new TableCell({ children: [new Paragraph({ text: "POST /api/v1/deals (1.5% Accrual)" })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "PASSED (201 Created)", bold: true, color: "047857" })] })] })
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 300, after: 150 }, text: "" }),

        // Next Steps
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "6. Roadmap for Day 2", bold: true, color: "0F172A", size: 30 })]
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "1. Advanced Lease Management: ", bold: true }),
            new TextRun({ text: "Introduce tenant lease duration tracking and automated rent roll scheduling." })
          ]
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "2. Maintenance Work Orders: ", bold: true }),
            new TextRun({ text: "Implement ticket dispatching for property repair requests and contractor expense logging." })
          ]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({ text: "3. Presentation & Demonstration Assets: ", bold: true }),
            new TextRun({ text: "Prepare a video walkthrough and update the project showcase repository for VIRELEO leadership." })
          ]
        }),

        // Sign-off
        new Paragraph({
          spacing: { before: 300 },
          children: [
            new TextRun({ text: "Report Prepared By: ", bold: true }),
            new TextRun({ text: "Individual Full-Stack Developer\n" }),
            new TextRun({ text: "Company: ", bold: true }),
            new TextRun({ text: "VIRELEO (https://www.vireleo.me/)\n" }),
            new TextRun({ text: "Platform URL: ", bold: true }),
            new TextRun({ text: "http://localhost:3000\n" })
          ]
        })
      ]
    }
  ]
});

async function main() {
  const outputPath = "D:/AqarFlow/docs/VIRELEO_Project01_AqarFlow_Day1_Report.docx";
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Word report successfully generated at: ${outputPath}`);
}

main().catch(console.error);
