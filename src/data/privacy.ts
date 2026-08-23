export const PRIVACY_NOTICE_VERSION = "2026-08-23";

export const privacyNotice = {
  title: "Privacy notice",
  subtitle: "What we hold, and why.",
  version: `Version ${PRIVACY_NOTICE_VERSION}`,
  sections: [
    {
      id: "who",
      heading: "Who we are",
      paragraphs: [
        "Oman Computing Society — a student-run computing community in Oman. We are the controller of the data described below. If you want anything here corrected or removed, reach us on WhatsApp.",
      ],
    },
    {
      id: "collect",
      heading: "What we collect",
      paragraphs: [
        "When you sign in with Google, Microsoft, or GitHub we receive the name, email address, and profile picture those providers share with us. We do not request access to your Google Drive, contacts or calendar, your Microsoft mailbox or files, or your GitHub repositories.",
        "When you fill in the member profile, we store what you type there: your campus, programme, year of study, expected graduation, whether you are a member or interested in joining, the skills you have and want, what you want out of OCS, and any phone number or links you choose to add. Every one of those fields except your name is optional.",
      ],
    },
    {
      id: "why",
      heading: "Why we collect it",
      paragraphs: [
        "To run the thing. Specifically: to know which campuses have enough people to start a chapter, to staff build squads with students whose skills fit a project, to find mentors, and to report honestly on how many people we actually reach. Aggregate numbers — how many members, which campuses, what return rate — get published. Your individual profile does not.",
        "We send you updates about sessions only if you tick that box, and every message carries a way to stop them.",
      ],
    },
    {
      id: "who-sees",
      heading: "Who can see it",
      paragraphs: [
        "Approved committee members with an admin role, and nobody else. We do not sell it, we do not share it with sponsors or employers, and we do not pass it to your university. If that ever needs to change — for example, sharing a shortlist with an employer for an internship — we will ask you first, for that specific purpose.",
      ],
    },
    {
      id: "where",
      heading: "Where it lives",
      paragraphs: [
        "In a managed Postgres database and on hosting infrastructure outside Oman. That is a cross-border transfer, and your consent covers it — which is exactly why the consent box is not pre-ticked.",
      ],
    },
    {
      id: "how-long",
      heading: "How long we keep it",
      paragraphs: [
        "While you are involved, and for two years after your last activity, so that alumni outcomes can still be counted. After that it is deleted or reduced to anonymous statistics that cannot be traced back to you.",
      ],
    },
    {
      id: "rights",
      heading: "Your rights",
      paragraphs: [
        "You can see everything we hold about you on your profile page, correct any of it there, and delete all of it with the button at the bottom of that page — no conversation required. You can also withdraw consent by deleting your profile, and revoke our access from the security settings of the Google, Microsoft, or GitHub account you used to sign in.",
        "Under Oman's Personal Data Protection Law (Royal Decree 6/2022) you may also complain to the Ministry of Transport, Communications and Information Technology if you think we have handled your data badly. We would rather you told us first.",
      ],
    },
    {
      id: "wrong",
      heading: "If something goes wrong",
      paragraphs: [
        "If data we hold is exposed, we will tell the people affected and the regulator. One named committee member is responsible for this; ask us who currently holds that role and we will tell you.",
      ],
    },
    {
      id: "changes",
      heading: "Changes",
      paragraphs: [
        "If we change this notice materially we bump its version and ask for consent again rather than assuming the old tick still covers the new text.",
        "An Arabic translation of this notice is in progress. Until it is published, ask us and we will walk you through it in Arabic.",
      ],
    },
  ],
} as const;
