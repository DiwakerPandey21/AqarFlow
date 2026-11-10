"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function GlobalNavigationShortcuts() {
  const router = useRouter();
  const lastKeyRef = useRef<{ key: string; time: number } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      const key = e.key.toLowerCase();
      const now = Date.now();

      // Check if previous key was 'g' within the last 1000ms
      if (lastKeyRef.current && lastKeyRef.current.key === "g" && now - lastKeyRef.current.time < 1000) {
        if (key === "w") {
          e.preventDefault();
          router.push("/workspace");
        } else if (key === "l") {
          e.preventDefault();
          router.push("/workspace/leads");
        } else if (key === "r") {
          e.preventDefault();
          router.push("/workspace/rentals");
        } else if (key === "m") {
          e.preventDefault();
          router.push("/workspace/maintenance");
        } else if (key === "p") {
          e.preventDefault();
          router.push("/properties");
        } else if (key === "v") {
          e.preventDefault();
          router.push("/workspace/visits");
        } else if (key === "d") {
          e.preventDefault();
          router.push("/workspace/deals");
        } else if (key === "h") {
          e.preventDefault();
          router.push("/");
        }
        lastKeyRef.current = null;
        return;
      }

      if (key === "g") {
        lastKeyRef.current = { key: "g", time: now };
      } else {
        lastKeyRef.current = null;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
}
