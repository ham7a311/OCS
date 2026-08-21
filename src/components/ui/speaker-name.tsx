import { LinkedInIcon } from "@/components/ui/channel-icon";
import { eventMetadata, type OcsEvent } from "@/data/events";
import type { MetaItem } from "@/components/ui/meta-grid";

export function SpeakerName({
  name,
  href,
}: {
  name: string;
  href?: string | null;
}) {
  if (!href) return name;

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 sm:hidden"
      >
        {name}
      </a>
      <span className="hidden items-center gap-4 sm:inline-flex">
        <span>{name}</span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          className="inline-flex text-amber-300 transition-colors duration-200 ease-ui hover:text-amber-400"
        >
          <LinkedInIcon className="size-4" />
        </a>
      </span>
    </>
  );
}

export function eventDisplayMetadata(event: OcsEvent): MetaItem[] {
  return eventMetadata(event).map((item) =>
    item.label === "Speaker"
      ? {
          ...item,
          value: <SpeakerName name={event.speaker} href={event.speakerLinkedin} />,
        }
      : item,
  );
}
