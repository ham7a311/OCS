"use client";

import { useEffect, useState } from "react";
import { team } from "@/data/team";

export function TeamIndex() {
  const [activeId, setActiveId] = useState(team[0]?.id ?? "");

  useEffect(() => {
    const nodes = team
      .map((member) => document.getElementById(`team-${member.id}`))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const nextId = visible[0]?.target.id.replace(/^team-/, "");
        if (nextId) setActiveId(nextId);
      },
      {
        rootMargin: "-28% 0px -48% 0px",
        threshold: [0, 0.25, 0.5, 0.75],
      },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="team-index" aria-label="Team members">
      {team.map((member, index) => {
        const n = String(index + 1).padStart(2, "0");
        const current = member.id === activeId;
        return (
          <a
            key={member.id}
            href={`#team-${member.id}`}
            className="team-index-link"
            aria-current={current ? true : undefined}
            aria-label={`${n}. ${member.name}`}
          >
            {n}
          </a>
        );
      })}
    </nav>
  );
}
