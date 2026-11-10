"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ManagerLoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login?role=manager");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center font-sans text-xs text-slate-500">
      Loading Property Operations Desk...
    </div>
  );
}
