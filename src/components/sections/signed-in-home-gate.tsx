"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";

/** Signed-in visitors cannot stay on the marketing home — they go to `/members`. */
export function SignedInHomeGate() {
  const router = useRouter();
  const { session, isPending } = useSession();

  useEffect(() => {
    if (isPending || !session) return;

    const goToMembers = () => router.replace("/members");
    goToMembers();

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) goToMembers();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [isPending, session, router]);

  return null;
}
