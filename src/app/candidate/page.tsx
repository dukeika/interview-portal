// File: src/app/candidate/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CandidatePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard
    router.push("/candidate/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-abhh-teal-600"></div>
    </div>
  );
}
