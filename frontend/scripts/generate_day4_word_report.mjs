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

function safeReadFile(filename) {
  const p = path.join(screenshotsDir, filename);
  if (fs.existsSync(p)) return fs.readFileSync(p);
  return null;
}

const heroImg = safeReadFile("day4_vellaro_hero.png");
const panoramicImg = safeReadFile("day4_vellaro_panoramic.png");
const testimonialsImg = safeReadFile("day4_vellaro_testimonials.png");
const processImg = safeReadFile("day4_vellaro_process_slider.png");
const teamFaqImg = safeReadFile("day4_vellaro_team_faq.png");
const consultationImg = safeReadFile("day4_vellaro_footer_consultation.png");
const loginImg = safeReadFile("day4_vellaro_login.png");
const workspaceImg = safeReadFile("day4_vellaro_workspace.png");

const borderSubtle = {
  top: { style: BorderStyle.SINGLE, size: 4, color: "E2DBD1" },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: "E2DBD1" },
  left: { style: BorderStyle.SINGLE, size: 4, color: "E2DBD1" },
  right: { style: BorderStyle.SINGLE, size: 4, color: "E2DBD1" }
};

function createMetaCell(label, value) {
  return [
    new TableCell({
      width: { size: 25, type: WidthType.PERCENTAGE },
      shading: { fill: "F8F3ED", type: ShadingType.CLEAR },
      borders: borderSubtle,
      children: [
        new Paragraph({
          children: [new TextRun({ text: label, bold: true, size: 18, color: "5D5839" })]
        })
      ]
    }),
    new TableCell({
      width: { size: 25, type: WidthType.PERCENTAGE },
      borders: borderSubtle,
      children: [
        new Paragraph({
          children: [new TextRun({ text: value, size: 18, color: "1F1E19" })]
        })
      ]
    })
  ];
}

function createTableRow(col1, col2, col3, isHeader = false) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 25, type: WidthType.PERCENTAGE },
        shading: isHeader ? { fill: "F8F3ED", type: ShadingType.CLEAR } : undefined,
        borders: borderSubtle,
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: col1,
                bold: isHeader,
                size: 18,
                color: isHeader ? "5D5839" : "1F1E19"
              })
            ]
          })
        ]
      }),
      new TableCell({
        width: { size: 50, type: WidthType.PERCENTAGE },
        shading: isHeader ? { fill: "F8F3ED", type: ShadingType.CLEAR } : undefined,
        borders: borderSubtle,
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: col2,
                bold: isHeader,
                size: 18,
                color: isHeader ? "5D5839" : "1F1E19"
              })
            ]
          })
        ]
      }),
      new TableCell({
        width: { size: 25, type: WidthType.PERCENTAGE },
        shading: isHeader ? { fill: "F8F3ED", type: ShadingType.CLEAR } : undefined,
        borders: borderSubtle,
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: col3,
                bold: true,
                size: 18,
                color: isHeader ? "5D5839" : "166534"
              })
            ]
          })
        ]
      })
    ]
  });
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: "Calibri",
          size: 22,
          color: "1F1E19"
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
              text: "VIRELEO TECHNOLOGIES — PROJECT 01 TRACK",
              bold: true,
              size: 22,
              color: "5D5839"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: "AQARFLOW: DAY 4 PROGRESS REPORT",
              bold: true,
              size: 30,
              color: "1F1E19"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [
            new TextRun({
              text: "Complete Luxury Vellaro Design System Overhaul, Autoplaying Architectural Loops, & Quality Hardening",
              italics: true,
              size: 20,
              color: "767262"
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
                ...createMetaCell("Submission Date", "November 11, 2026 (Day 4 of 7)")
              ]
            }),
            new TableRow({
              children: [
                ...createMetaCell("Developer", "Diwaker Pandey (Full-Stack Intern)"),
                ...createMetaCell("Organization", "VIRELEO (vireleo.me)")
              ]
            }),
            new TableRow({
              children: [
                ...createMetaCell("Repository", "github.com/DiwakerPandey21/AqarFlow"),
                ...createMetaCell("Production URL", "aqar-flow-topaz.vercel.app")
              ]
            }),
            new TableRow({
              children: [
                ...createMetaCell("Tech Stack", "Next.js 16.4.5, React 19, Tailwind v4"),
                ...createMetaCell("Build Status", "37/37 Routes Clean (0 Errors)")
              ]
            })
          ]
        }),

        // Executive Summary
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 },
          children: [
            new TextRun({ text: "1. Executive Summary", bold: true, size: 26, color: "5D5839" })
          ]
        }),
        new Paragraph({
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: "Day 4 represents a milestone aesthetic and architectural leap forward for AqarFlow. The application was completely transformed to reflect the award-winning Vellaro Luxury Real Estate design system. The previous generic dark interface was replaced with an institutional warm cream aesthetic (#F8F3ED base, #FAF6F0 sand cards, #5D5839 deep olive accents, and #1F1E19 charcoal typography) paired with Playfair Display serif italic typographic hierarchy."
            })
          ]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "All 8 core sections of the Behance reference design have been implemented: Hero Section, Project Overview, Curated Residences (LIVE/INVEST/RENT), Client Testimonials with live looping autoplaying videos, 4-Step Process Slider, Team of Experts, Institutional Legal FAQs, and Consultation Finale. Perimeter security was hardened by stripping public links to the internal agency workspace, fixing logout session teardown, and replacing 1-click test links with a clean clearance tier selector."
            })
          ]
        }),

        // Deliverables
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 },
          children: [
            new TextRun({ text: "2. Key Accomplishments & Technical Highlights", bold: true, size: 26, color: "5D5839" })
          ]
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "• Complete Vellaro Design Architecture: ", bold: true }),
            new TextRun({ text: "All 8 homepage sections re-built with warm cream palette, serif italic titles, and custom micro-interactions." })
          ]
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "• Continuous Autoplaying Architectural Videos: ", bold: true }),
            new TextRun({ text: "Upgraded testimonial video cards to HTML5 <video> elements configured with autoPlay, loop, muted, and playsInline, backed by local cached MP4s and remote CDN fallbacks." })
          ]
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "• Strict Public/Private Boundary: ", bold: true }),
            new TextRun({ text: "Removed unauthenticated public access links to internal workspace routes and fixed logout session clearance." })
          ]
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "• Production Build Quality: ", bold: true }),
            new TextRun({ text: "All 37 static and dynamic Next.js routes compiled cleanly with 0 TypeScript errors and 0 lint warnings." })
          ]
        }),

        // Visual Evidence
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 },
          children: [
            new TextRun({ text: "3. Visual Verification & Interface Screenshots", bold: true, size: 26, color: "5D5839" })
          ]
        }),

        // Figures
        ...(heroImg ? [
          new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: "Figure 1: Vellaro Luxury Hero Section & Sticky Navigation", bold: true, size: 20 })] }),
          new Paragraph({ spacing: { after: 200 }, children: [new ImageRun({ data: heroImg, transformation: { width: 580, height: 360 }, type: "png" })] })
        ] : []),

        ...(panoramicImg ? [
          new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: "Figure 2: Curated Residences (LIVE, INVEST, RENT Panoramic Cards)", bold: true, size: 20 })] }),
          new Paragraph({ spacing: { after: 200 }, children: [new ImageRun({ data: panoramicImg, transformation: { width: 580, height: 360 }, type: "png" })] })
        ] : []),

        ...(testimonialsImg ? [
          new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: "Figure 3: Real Stories & Results with Autoplaying Looping Videos", bold: true, size: 20 })] }),
          new Paragraph({ spacing: { after: 200 }, children: [new ImageRun({ data: testimonialsImg, transformation: { width: 580, height: 360 }, type: "png" })] })
        ] : []),

        ...(processImg ? [
          new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: "Figure 4: From Request to Result 4-Step Interactive Process Slider", bold: true, size: 20 })] }),
          new Paragraph({ spacing: { after: 200 }, children: [new ImageRun({ data: processImg, transformation: { width: 580, height: 360 }, type: "png" })] })
        ] : []),

        ...(loginImg ? [
          new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: "Figure 5: Institutional Role-Isolated Login Gateway", bold: true, size: 20 })] }),
          new Paragraph({ spacing: { after: 200 }, children: [new ImageRun({ data: loginImg, transformation: { width: 580, height: 360 }, type: "png" })] })
        ] : []),

        ...(workspaceImg ? [
          new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: "Figure 6: Executive Workspace Command Center (Warm Cream)", bold: true, size: 20 })] }),
          new Paragraph({ spacing: { after: 200 }, children: [new ImageRun({ data: workspaceImg, transformation: { width: 580, height: 360 }, type: "png" })] })
        ] : []),

        // Testing Matrix
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 },
          children: [
            new TextRun({ text: "4. Quality Verification & Testing Matrix", bold: true, size: 26, color: "5D5839" })
          ]
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: borderSubtle,
          rows: [
            createTableRow("Test Case", "Execution Scope", "Verification Result", true),
            createTableRow("Autoplay Video Loops", "Testimonial MP4 video cards verified with loop, autoPlay, muted, playsInline", "PASSED (100% Continuous)"),
            createTableRow("Production Build", "Next.js 16.4.5 full production build (npm run build)", "PASSED (37/37 Routes Clean)"),
            createTableRow("Public/Portal Perimeter", "Public navbar & footer inspection; no unauthenticated leakage", "PASSED (Zero Leaks)"),
            createTableRow("Logout Redirection", "Session token cleared and redirect routed strictly to /login", "PASSED (Strict Flow)"),
            createTableRow("Light/Dark Mode Contrast", "Warm cream light mode and obsidian dark mode form & chart checks", "PASSED (High Contrast)"),
            createTableRow("Live Vercel Synchronization", "Git push to origin/main and production deployment inspection", "PASSED (Live on Topaz Vercel)")
          ]
        }),

        // Signoff
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
          children: [
            new TextRun({
              text: "VIRELEO Project 01 — AqarFlow • Full-Stack Development Track • Official: vireleo.me",
              size: 18,
              color: "767262",
              italics: true
            })
          ]
        })
      ]
    }
  ]
});

const wordPathDocs = "D:/AqarFlow/docs/VIRELEO_Project01_AqarFlow_Day4_Report.docx";
const wordPathRoot = "D:/AqarFlow/VIRELEO_Project01_AqarFlow_Day4_Report.docx";
const wordPathBrain = "C:/Users/diwak/.gemini/antigravity/brain/81e3714f-5837-4f4f-b459-d16feed2f3fd/VIRELEO_Project01_AqarFlow_Day4_Report.docx";

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(wordPathDocs, buffer);
  fs.writeFileSync(wordPathRoot, buffer);
  fs.writeFileSync(wordPathBrain, buffer);
  console.log("Day 4 Word report successfully generated at:");
  console.log(` - ${wordPathDocs}`);
  console.log(` - ${wordPathRoot}`);
  console.log(` - ${wordPathBrain}`);
});
