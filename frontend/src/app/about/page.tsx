import React from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  MapPin,
  Sparkles,
  Scale,
  Compass
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
      name: "Ayesha Malik",
      role: "Head of Private Client Acquisitions",
      bio: "Specializing in overseas diaspora transactions (UK, USA, Canada) and high-value architectural estate advisory in Lahore DHA Raya.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      location: "Lahore Office"
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
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 font-sans selection:bg-amber-600 selection:text-white">
      <PublicNavbar />

      {/* Hero Header - Luxury Editorial Monograph */}
      <section className="bg-[#0B0F17] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Institutional Real Estate Operations
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
            Modernizing Pakistan&apos;s Property Ecosystem
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            From fragmented dealer notebooks and ghost listings to a unified, title-verified real estate management platform for domestic homeowners and overseas Pakistani investors.
          </p>
        </div>
      </section>

      {/* Origin & Philosophy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 block">
              Architectural Lineage
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 tracking-tight leading-tight">
              Why We Engineered AqarFlow
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              <strong className="text-slate-900 font-semibold">&ldquo;Aqar&rdquo;</strong> (Arabic and Urdu for land and immovable property) combined with <strong className="text-slate-900 font-semibold">&ldquo;Flow&rdquo;</strong> (seamless digital business operations) represents our foundational mission: Pakistani property acquisition must no longer be an opaque, stressful ordeal.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              Every month, domestic buyers and overseas Pakistanis waste valuable time chasing unverified or expired dealer listings, while reputable brokerages struggle to coordinate client inquiries, showing schedules, and transaction agreements across messy WhatsApp threads. AqarFlow unites both sides in an institutional-grade digital command system.
            </p>

            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-500/20 max-w-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900">
                    A VIRELEO PROJECT
                  </span>
                  <span className="text-[10px] font-mono text-amber-800 font-semibold">Project 01</span>
                </div>
                <p className="text-xs text-amber-950/80 leading-relaxed">
                  Conceived and engineered under the VIRELEO individual development mandate. Built for high-growth Pakistani market operations.
                </p>
                <a
                  href="https://www.vireleo.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-amber-900 hover:text-amber-950 font-bold inline-flex items-center gap-1.5 transition-colors pt-1"
                >
                  <span>Discover VIRELEO Official Platform</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E4DC] shadow-sm space-y-6">
            <h3 className="text-xl font-serif font-bold text-slate-950">
              The Four Operating Pillars
            </h3>
            <div className="space-y-5 text-sm text-slate-600">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Zero Ghost Inventory</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    100% of published listings undergo physical verification and registry title checks (CDA, LDA, SBCA, and DHA transfer authorities).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Deed & Intiqal Verification</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Our legal desk conducts mutation scrutiny, non-encumbrance certificate reviews, and society allotment confirmations prior to public release.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Direct Certified Agent SLA</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Direct access to licensed brokers with a guaranteed 30-minute response time via WhatsApp and private appointment booking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 border border-purple-500/20">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Overseas Capital Protection</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    End-to-end Roshan Digital Account (RDA) transaction assistance, legal Power of Attorney guidance, and 4K virtual tours for expatriate buyers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Advisory Council */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 block mb-1">
              Executive Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 tracking-tight">
              The AqarFlow Advisory Council
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light">
              Decades of combined expertise across Pakistani municipal property law, master-planned developments, and digital proptech operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] rounded-3xl p-6 border border-[#E8E4DC] hover:border-amber-500/40 transition-all shadow-2xs group flex flex-col justify-between"
              >
                <div>
                  <div className="w-20 h-20 rounded-2xl overflow-hidden mb-5 border border-amber-500/20 shadow-xs">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 mb-1">
                    <MapPin className="w-3 h-3 text-amber-700" />
                    <span>{member.location}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-slate-950">{member.name}</h3>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">{member.role}</p>
                  <p className="text-xs text-slate-500 mt-3 font-light leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#FAF8F5] py-16 px-4 sm:px-6 lg:px-8 border-t border-[#E8E4DC] text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
            Explore Verified Pakistani Real Estate
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-light">
            Browse our handpicked portfolio of architectural villas, diplomatic penthouses, and commercial plots with authenticated title deeds.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href="/properties"
              className="px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Browse Curated Portfolio &rarr;
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider transition-all border border-slate-300 shadow-2xs"
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
