import { siteJsonLdScript } from "@/lib/json-ld";

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: siteJsonLdScript() }}
    />
  );
}
