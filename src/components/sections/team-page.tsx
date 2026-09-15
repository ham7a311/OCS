import { ArrowUpRight, UserRound } from "lucide-react";
import type { CSSProperties } from "react";
import { TeamIndex } from "@/components/sections/team-index";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HalftoneCta } from "@/components/ui/halftone-cta";
import { Em } from "@/components/ui/section-heading";
import { team, teamFirstName, teamPageLinks, teamSealGivenName, type TeamMember } from "@/data/team";

const SEAL_PATH_R = 108;
const SEAL_PATH_LEN = 2 * Math.PI * SEAL_PATH_R;

function TeamAvatar({ member }: { member: TeamMember }) {
  return (
    <div className="team-avatar" aria-hidden="true">
      <div className="team-avatar-disc">
        {member.photo ? (
          <img
            src={member.photo}
            alt=""
            className="team-avatar-photo"
            style={
              {
                ...(member.photoPosition
                  ? { objectPosition: member.photoPosition }
                  : {}),
                ...(member.photoScale
                  ? {
                      transform: `scale(${member.photoScale})`,
                      transformOrigin: member.photoPosition ?? "50% 20%",
                    }
                  : {}),
              } as CSSProperties
            }
          />
        ) : (
          <UserRound className="team-avatar-icon" strokeWidth={1.5} />
        )}
      </div>
    </div>
  );
}

function palmetteTransform(i: number) {
  const deg = i * 22.5;
  const scale = i % 2 === 1 ? 0.82 : 1;
  return `rotate(${deg} 140 140) translate(140 140) scale(${scale}) translate(-140 -140)`;
}

function SealPalmetteMass() {
  return (
    <g>
      <path
        className="team-seal-leaflet"
        d="M126 24 C134 12 146 12 154 24 C148 34 132 34 126 24 Z"
      />
      <path
        className="team-seal-leaf"
        d="M140 22 C129 8 126 -10 140 -38 C154 -10 151 8 140 22 Z"
      />
      <path
        className="team-seal-leaf"
        d="M134 20 C114 6 96 12 99 28 C102 40 118 36 128 22 C118 10 126 10 134 20 Z"
      />
      <path
        className="team-seal-leaf"
        d="M146 20 C166 6 184 12 181 28 C178 40 162 36 152 22 C162 10 154 10 146 20 Z"
      />
      <path
        className="team-seal-leaf"
        d="M122 8 C106 -8 90 -8 90 8 C91 20 106 16 116 6 C112 -2 116 0 122 8 Z"
      />
      <path
        className="team-seal-leaf"
        d="M158 8 C174 -8 190 -8 190 8 C189 20 174 16 164 6 C168 -2 164 0 158 8 Z"
      />
    </g>
  );
}

function SealPalmetteRidge() {
  return (
    <g>
      <path className="team-seal-leaf-ridge" d="M140 20 C140 4 140 -16 140 -34" />
      <path className="team-seal-leaf-ridge" d="M132 14 C116 2 104 14 110 28" />
      <path className="team-seal-leaf-ridge" d="M148 14 C164 2 176 14 170 28" />
      <path className="team-seal-leaf-ridge" d="M124 6 C110 -8 98 -6 100 8" />
      <path className="team-seal-leaf-ridge" d="M156 6 C170 -8 182 -6 180 8" />
    </g>
  );
}

function SealTicks() {
  const inner = 90;
  const outer = 97;
  return (
    <g className="team-seal-ticks">
      {Array.from({ length: 8 }, (_, i) => {
        const angle = ((22.5 + i * 45) * Math.PI) / 180;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        return (
          <line
            key={i}
            x1={140 + inner * sin}
            y1={140 - inner * cos}
            x2={140 + outer * sin}
            y2={140 - outer * cos}
          />
        );
      })}
    </g>
  );
}

function TeamChapterSeal({
  member,
  n,
  index,
}: {
  member: TeamMember;
  n: string;
  index: number;
}) {
  const pathId = `team-seal-${member.id}`;
  const clipId = `team-seal-clip-${member.id}`;
  const givenName = teamSealGivenName(member.name);
  const parts = givenName.split(/\s+/);
  const legend = `${member.name}  ·  ${n}  ·  `.repeat(3);
  const clipOuter = 117;
  const clipInner = 99;

  return (
    <svg className="team-seal" viewBox="0 0 280 280" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <path
            fillRule="evenodd"
            d={`M 140 ${140 - clipOuter} a ${clipOuter} ${clipOuter} 0 1 1 0 ${clipOuter * 2} a ${clipOuter} ${clipOuter} 0 1 1 0 -${clipOuter * 2} M 140 ${140 - clipInner} a ${clipInner} ${clipInner} 0 1 0 0 ${clipInner * 2} a ${clipInner} ${clipInner} 0 1 0 0 -${clipInner * 2}`}
          />
        </clipPath>
      </defs>
      {Array.from({ length: 16 }, (_, i) => (
        <g
          key={`leaf-${i}`}
          className={i % 2 === 1 ? "team-seal-leaf-minor" : "team-seal-leaf-major"}
          transform={palmetteTransform(i)}
        >
          <SealPalmetteMass />
        </g>
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <g
          key={`ridge-${i}`}
          className={i % 2 === 1 ? "team-seal-leaf-minor" : "team-seal-leaf-major"}
          transform={palmetteTransform(i)}
        >
          <SealPalmetteRidge />
        </g>
      ))}
      <circle className="team-seal-ring" cx="140" cy="140" r="128" fill="none" />
      <g
        className="team-seal-spin"
        style={{ animationDelay: `${-index * 3.7}s` }}
        clipPath={`url(#${clipId})`}
      >
        <path
          id={pathId}
          d={`M 140 ${140 - SEAL_PATH_R} a ${SEAL_PATH_R} ${SEAL_PATH_R} 0 1 1 0 ${SEAL_PATH_R * 2} a ${SEAL_PATH_R} ${SEAL_PATH_R} 0 1 1 0 -${SEAL_PATH_R * 2}`}
          fill="none"
        />
        <text className="team-seal-legend">
          <textPath
            href={`#${pathId}`}
            xlinkHref={`#${pathId}`}
            textLength={SEAL_PATH_LEN}
            lengthAdjust="spacing"
          >
            {legend}
          </textPath>
        </text>
      </g>
      <circle className="team-seal-ring-inner" cx="140" cy="140" r="94" fill="none" />
      <SealTicks />
      <text className="team-seal-given" x="140" y="140" textAnchor="middle">
        {parts.length > 1 ? (
          <>
            <tspan x="140" dy="-0.48em">
              {parts[0]}
            </tspan>
            <tspan x="140" dy="1.08em">
              {parts.slice(1).join(" ")}
            </tspan>
          </>
        ) : (
          <tspan x="140" dy="0.35em">
            {givenName}
          </tspan>
        )}
      </text>
    </svg>
  );
}

export function TeamPage() {
  return (
    <div className="team-page">
      <Container className="team-intro">
        <Eyebrow>Core team</Eyebrow>
        <h1 className="mt-4 max-w-[18ch] text-[clamp(2.15rem,4vw+1rem,3.5rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-ink">
          The people who <Em>keep the room open</Em>.
        </h1>
        <p className="team-lead">
          Ten students who run Oman Computing Society — the sessions, the public face, and the
          software the community actually uses.
        </p>
      </Container>

      <Container className="team-body">
        <TeamIndex />
        <div>
          {team.map((member, index) => {
            const n = String(index + 1).padStart(2, "0");
            const firstName = teamFirstName(member.name);
            const pageLinks = teamPageLinks(member);
            return (
              <article
                key={member.id}
                id={`team-${member.id}`}
                className="team-chapter"
                style={{ "--member-color": member.color } as CSSProperties}
                aria-labelledby={`team-name-${member.id}`}
              >
                <div className="team-chapter-wash" aria-hidden="true" />
                <div className="team-chapter-ghost-clip" aria-hidden="true">
                  <p className="team-chapter-ghost">{firstName}</p>
                </div>
                <div className="team-chapter-layout">
                  <div className="team-chapter-copy">
                    <div className="team-chapter-heading">
                      <p className="team-chapter-meta">
                        <span className="team-chapter-num">
                          <span className="team-chapter-index">{n}</span>
                          <span aria-hidden="true">·</span>
                        </span>
                        <span>{member.role}</span>
                      </p>
                      <div className="team-chapter-byline">
                        <TeamAvatar member={member} />
                        <h2 id={`team-name-${member.id}`} className="team-chapter-name">
                          {member.name}
                        </h2>
                      </div>
                    </div>

                    {member.about ? (
                      <div className="team-block">
                        <p className="team-block-label">About</p>
                        <p className="team-block-body">{member.about}</p>
                      </div>
                    ) : null}

                    {member.education ? (
                      <div className="team-block">
                        <p className="team-block-label">Education</p>
                        <p className="team-block-body">{member.education}</p>
                      </div>
                    ) : null}

                    {member.skills.length > 0 ? (
                      <div className="team-block">
                        <p className="team-block-label">Skills</p>
                        <div className="team-skills">
                          {member.skills.map((skill) => (
                            <span key={skill} className="team-skill">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {pageLinks.length > 0 ? (
                      <div className="team-block">
                        <p className="team-block-label">Links</p>
                        <div className="team-links">
                          {pageLinks.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="team-link"
                            >
                              {link.label}
                              <ArrowUpRight aria-hidden="true" />
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="team-chapter-aside" aria-hidden="true">
                    <TeamChapterSeal member={member} n={n} index={index} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>

      <Container className="pb-16 sm:pb-24">
        <HalftoneCta
          className="mt-8"
          badge="Want to become part of the core team?"
          heading={
            <>
              Join the people
              <br />
              who keep it open.
            </>
          }
          subtext="Start as a member. That’s how people get into the room."
          action={{ href: "/signin", label: "Join core team" }}
        />
      </Container>
    </div>
  );
}
