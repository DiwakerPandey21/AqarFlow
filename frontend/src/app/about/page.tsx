import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Scale,
  Users,
  Award,
  ExternalLink,
  MapPin
} from "lucide-react";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";

export default function AboutPage() {
  const leadership = [
    {
      name: "Salman Tariq",
      role: "Managing Director & Chief Executive",
      bio: "15+ years in institutional Pakistani property development and capital allocations across Islamabad CDA sectors and DHA master communities.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      location: "Islamabad HQ"
    },
    {
      name: "Ayesha Khan",
      role: "Head of Private Client Acquisitions",
      bio: "Specializing in overseas diaspora transactions (UK, USA, UAE) and high-value architectural estate advisory in Lahore DHA Raya.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      location: "Lahore Lounge"
    },
    {
      name: "Hamza Farooq",
      role: "Lead Legal Deed & Regulatory Counsel",
      bio: "Advocate High Court. Oversees 100% title scrutiny, mutation verification (Intiqal), and society transfer compliance.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      location: "Karachi Desk"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F3ED] text-[#1F1E19] font-sans selection:bg-[#5D5839] selection:text-white">
      <PublicNavbar />

      {/* Header Banner — Vellaro Style */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-b border-[#E2DBD1]">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-sans font-medium uppercase tracking-tight text-[#1F1E19]">
            PROJECT
          </h1>
          <span className="font-serif italic text-3xl sm:text-4xl text-[#5D5839] block mt-1">
            overview & philosophy
          </span>
          <p className="text-xs sm:text-sm text-[#767262] mt-3 font-light leading-relaxed">
            Modernizing Pakistan&apos;s luxury property ecosystem through verified title deeds, institutional escrow, and end-to-end post-sale tenancy operations.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.14em] text-[#5D5839] block">
              Architectural Lineage
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-light uppercase text-[#1F1E19] tracking-tight">
              Why We Engineered AqarFlow
            </h2>
            <p className="text-xs sm:text-sm text-[#1F1E19]/80 leading-relaxed font-light">
              <strong className="text-[#1F1E19] font-semibold">&ldquo;Aqar&rdquo;</strong> (Arabic and Urdu for land and immovable property) combined with <strong className="text-[#1F1E19] font-semibold">&ldquo;Flow&rdquo;</strong> (seamless digital business operations) represents our foundational mission: Pakistani property acquisition must no longer be an opaque, stressful ordeal.
            </p>
            <p className="text-xs sm:text-sm text-[#1F1E19]/80 leading-relaxed font-light">
              Every month, domestic buyers and overseas Pakistanis waste valuable time chasing unverified dealer listings, while reputable brokerages struggle to coordinate client inquiries across messy chat threads. AqarFlow unites both sides in an institutional digital command system.
            </p>

            <div className="p-4 rounded-sm bg-[#FAF6F0] border border-[#E2DBD1] max-w-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#5D5839]">
                  A VIRELEO PROJECT
                </span>
                <span className="text-[10px] font-mono text-[#767262]">Project 01</span>
              </div>
              <p className="text-xs text-[#767262] leading-relaxed">
                Conceived and engineered under the VIRELEO individual development mandate. Built for high-growth Pakistani market operations.
              </p>
              <a
                href="https://www.vireleo.me/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#5D5839] hover:underline font-semibold inline-flex items-center gap-1.5 pt-1"
              >
                <span>Discover VIRELEO Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white rounded-sm p-8 sm:p-10 border border-[#E2DBD1] shadow-xs space-y-6">
            <h3 className="text-xl font-sans font-medium uppercase text-[#1F1E19]">
              The Four Operating Pillars
            </h3>
            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#F8F3ED] text-[#5D5839] flex items-center justify-center shrink-0 border border-[#E2DBD1]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[#1F1E19]">Zero Ghost Inventory</h4>
                  <p className="text-xs text-[#767262] mt-1 leading-relaxed">
                    100% of published listings undergo physical verification and registry title checks (CDA, LDA, SBCA, and DHA transfer authorities).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#F8F3ED] text-[#5D5839] flex items-center justify-center shrink-0 border border-[#E2DBD1]">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[#1F1E19]">Deed & Intiqal Verification</h4>
                  <p className="text-xs text-[#767262] mt-1 leading-relaxed">
                    Our legal desk conducts mutation scrutiny, non-encumbrance certificate reviews, and society allotment confirmations prior to public release.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#F8F3ED] text-[#5D5839] flex items-center justify-center shrink-0 border border-[#E2DBD1]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[#1F1E19]">Direct Certified Agent SLA</h4>
                  <p className="text-xs text-[#767262] mt-1 leading-relaxed">
                    Direct access to licensed brokers with a guaranteed 30-minute response time via WhatsApp and private appointment booking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#F8F3ED] text-[#5D5839] flex items-center justify-center shrink-0 border border-[#E2DBD1]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[#1F1E19]">Overseas Capital Protection</h4>
                  <p className="text-xs text-[#767262] mt-1 leading-relaxed">
                    End-to-end Roshan Digital Account (RDA) transaction assistance, legal Power of Attorney guidance, and 4K virtual tours for expatriate buyers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-[#E2DBD1]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-sans font-medium uppercase tracking-tight text-[#1F1E19]">
              WE ARE A TEAM OF EXPERTS
            </h2>
            <span className="font-serif italic text-2xl sm:text-3xl text-[#5D5839] block mt-1">
              working for you
            </span>
            <p className="text-xs text-[#767262] mt-2 font-light">
              Decades of combined expertise across Pakistani municipal property law, master-planned developments, and digital proptech operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#F8F3ED] rounded-sm p-6 border border-[#E2DBD1] hover:border-[#5D5839] transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-5 border border-[#E2DBD1]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#5D5839] mb-1">
                    <MapPin className="w-3 h-3 text-[#5D5839]" />
                    <span>{member.location}</span>
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-tight text-[#1F1E19]">{member.name}</h3>
                  <p className="text-xs text-[#767262] font-mono mt-0.5">{member.role}</p>
                  <p className="text-xs text-[#1F1E19]/80 mt-3 font-light leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#F8F3ED] py-16 px-4 sm:px-6 lg:px-8 border-t border-[#E2DBD1] text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-sans font-medium uppercase text-[#1F1E19]">
            Explore Verified Pakistani Real Estate
          </h3>
          <p className="text-xs text-[#767262] font-light">
            Browse our handpicked portfolio of architectural villas, diplomatic penthouses, and commercial plots with authenticated title deeds.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href="/properties"
              className="px-6 py-3 rounded-sm bg-[#5D5839] hover:bg-[#4B472D] text-white font-sans font-semibold text-xs uppercase tracking-[0.14em] transition-all shadow-xs"
            >
              Browse Curated Portfolio &rarr;
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-sm bg-white hover:bg-[#FAF6F0] text-[#1F1E19] font-sans font-semibold text-xs uppercase tracking-[0.14em] transition-all border border-[#E2DBD1] shadow-xs"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
