import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-11 items-center gap-2 py-2 font-mono text-[0.6875rem] tracking-[0.09em] text-ink uppercase"
    >
      <ArrowLeft
        className="size-3.5 transition-transform duration-200 ease-ui group-hover:-translate-x-0.5 group-focus-visible:-translate-x-0.5"
        aria-hidden="true"
      />
      <span className="underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 ease-ui group-hover:decoration-current group-focus-visible:decoration-current">
        {label}
      </span>
    </Link>
  );
}
