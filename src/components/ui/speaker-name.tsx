import { LinkedInIcon } from "@/components/ui/channel-icon";
import { eventMetadata, type OcsEvent } from "@/data/events";
import type { MetaItem } from "@/components/ui/meta-grid";

export function SpeakerName({
  name,
  href,
  showIcon = false,
}: {
  name: string;
  href?: string | null;
  showIcon?: boolean;
}) {
  if (!href) return name;

  return (
    <span className="inline-flex items-center gap-4">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-ink/30 underline-offset-[0.18em] transition-colors duration-200 ease-ui hover:decoration-current"
      >
        {name}
      </a>
      {showIcon ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          className="inline-flex text-amber-300 transition-colors duration-200 ease-ui hover:text-amber-400"
        >
          <LinkedInIcon className="size-4" />
        </a>
      ) : null}
    </span>
  );
}

export function eventDisplayMetadata(event: OcsEvent): MetaItem[] {
  const showIcon =
    event.status === "upcoming" || event.status === "registration-open";

  return eventMetadata(event).map((item) =>
    item.label === "Speaker"
      ? {
          ...item,
          value: (
            <SpeakerName
              name={event.speaker}
              href={event.speakerLinkedin}
              showIcon={showIcon}
            />
          ),
        }
      : item,
  );
}
