import type { Metadata } from "next";
import { SignInPage } from "@/components/sections/signin-page";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to create your Oman Computing Society member profile.",
  alternates: { canonical: "/signin" },
};

export default function SignInRoute() {
  return (
    <main id="main">
      <SignInPage />
    </main>
  );
}
