"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AgentLoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login?role=agent");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center font-sans text-xs text-slate-500">
      Loading Real Estate Agent Portal...
    </div>
  );
}
