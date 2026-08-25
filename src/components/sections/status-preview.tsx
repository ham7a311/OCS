"use client";

import { StatusPage, type StatusKind } from "@/components/sections/status-page";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { NodeNetwork } from "@/components/visual/node-network";

const STATES: StatusKind[] = ["pending", "accepted", "rejected"];

export function StatusPreview() {
  return (
    <div className="flex flex-col gap-24 py-16">
      {STATES.map((status) => (
        <Section
          key={status}
          tone="canvas"
          labelledBy={`${status}-title`}
          divider={false}
          className="relative isolate min-h-[70vh] !py-0"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <NodeNetwork variant="ambient" density="sparse" />
          </div>
          <Container className="relative z-10 max-w-[42rem] pb-10">
            <p id={`${status}-title`} className="font-mono text-[0.6875rem] tracking-[0.09em] text-ink-faint uppercase">
              {status}
            </p>
            <StatusPage status={status} onAskDelete={() => undefined} onEdit={() => undefined} />
          </Container>
        </Section>
      ))}
    </div>
  );
}
