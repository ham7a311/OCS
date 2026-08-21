export const modelIntro = {
  heading: "Two loops, running at different speeds.",
  body: "Most student societies organise events. Events end, everyone graduates, and next year somebody writes the proposal again. We run a rhythm instead — and a second, faster loop that turns the people it produces into engineers with something to show.",
  coupling:
    "A chapter without squads is a social club. Squads without a chapter is an unlicensed agency. The coupling is the point.",
} as const;

export const slowLoop = {
  title: "The Chapter",
  subtitle:
    "One school or university, with its own OCS branch run by students who already study there.",
  fields: [
    { label: "Speed", value: "Monthly, forever" },
    { label: "Where", value: "Inside one school or university" },
    { label: "Who", value: "Every student on that campus who signs up" },
    { label: "What", value: "Study halls, workshops, contest nights, hackathons" },
    {
      label: "Output",
      value:
        "A warm, counted, surveyed community — and students good enough to be trusted with real work",
    },
  ],
} as const;

export const fastLoop = {
  title: "The Build Squad",
  subtitle: "A small team pulled from a chapter to build one real system for one real business.",
  fields: [
    { label: "Speed", value: "8–12 week engagements" },
    { label: "Who", value: "3–4 students picked from their chapter" },
    { label: "What", value: "A real working system for a real small business" },
    {
      label: "Output",
      value:
        "A shipped product, a documented case study, a paid student, and a story the chapter recruits on",
    },
  ],
} as const;

export const rhythm = {
  heading: "The calendar is the product.",
  body: "Not what we run. That we always run. The same four weeks, repeated — because predictability is what turns attendance into a habit, and habit is the only thing that compounds.",
  weeks: [
    {
      id: "week-1",
      kicker: "Week 1",
      title: "Prepare",
      body: "Lock topic, room, facilitator. Publish the poster. Open sign-ups.",
    },
    {
      id: "week-2",
      kicker: "Week 2",
      title: "Run",
      body: "The session happens. Attendance at the door. Survey sent within the hour.",
    },
    {
      id: "week-3",
      kicker: "Week 3",
      title: "Debrief",
      body: "Read the survey. Write five honest lines. Post the photos and the numbers publicly.",
    },
    {
      id: "week-4",
      kicker: "Week 4",
      title: "Decide",
      body: "Pick next month from the menu. Assign the roles. Rest.",
    },
  ],
  weekThree:
    "Week 3 is the one everyone skips and the one that matters. Reading the survey and publishing the result is what separates this from every other student club in the country.",
  menuHeading: "The menu — and the ladder you climb",
  menuBody:
    "Chapters don't invent formats. They pick from a menu with a run-sheet for each, and they earn the right to the bigger ones. A chapter that hasn't run three consecutive months doesn't get to host a hackathon.",
  onlineDefault:
    "Planning, mentoring, code review, workshops, contest nights, surveys, onboarding, handovers, all build-squad work, all cross-border activity.",
  inPersonOnly: "Study halls, hackathons, demo nights, and the first meeting with a new client.",
  campusQuiet:
    "A chapter whose school or university goes quiet for a semester loses its study halls. It does not lose its existence. Campus approval is a bonus, never a dependency.",
} as const;

export type EffortLevel = "very-low" | "low" | "medium" | "high" | "very-high";

export type MenuTier = {
  id: string;
  tier: string;
  format: string;
  effort: EffortLevel;
  why: string;
  earned?: boolean;
};

export const menuTiers: MenuTier[] = [
  {
    id: "t1",
    tier: "T1",
    format: "Peer study hall",
    effort: "very-low",
    why: "Two hours, a room, snacks, seniors helping juniors before exams. The highest value-per-rial thing here. Every chapter starts here.",
  },
  {
    id: "t2",
    tier: "T2",
    format: "Hands-on workshop",
    effort: "low",
    why: "One skill, ninety minutes, everyone leaves with something that runs. Git, Docker, prompting, Excel, Figma.",
  },
  {
    id: "t3",
    tier: "T3",
    format: "Contest night",
    effort: "low",
    why: "LeetCode ladder, CTF, SQL golf. Runs itself once set up, and the leaderboard generates return visits.",
  },
  {
    id: "t4",
    tier: "T4",
    format: "Demo & critique",
    effort: "low",
    why: "Students show what they built and get real feedback. This is where we spot the next build squad.",
  },
  {
    id: "t5",
    tier: "T5",
    format: "Hackathon",
    effort: "high",
    why: "One or two days. Genuinely energising, genuinely expensive.",
    earned: true,
  },
  {
    id: "t6",
    tier: "T6",
    format: "Cross-university",
    effort: "high",
    why: "Two or more chapters, one problem. Unlocks after three chapters are each stable for a semester.",
    earned: true,
  },
  {
    id: "t7",
    tier: "T7",
    format: "Cross-border",
    effort: "medium",
    why: "Online only. Dubai, China, Tanzania. Cheap because it's online — which is exactly why it should be the ambitious one.",
  },
];

export const chapters = {
  heading: "A chapter is one campus.",
  body: "One school or university, one OCS chapter — run by students who already study there, not visited by people who don't. Every campus gets its own, and each one runs the same monthly rhythm under its own name.",
  plainWords:
    "A chapter is OCS inside your own school or university. Not a national committee you apply to and not an event that visits once a year — a group of five students on your campus who make sure something happens there every month. Middle East College has one. Your campus can have one. They share the same playbook, the same survey and the same dashboard, and each one belongs to its own campus.",
  fiveHeading: "And a chapter is five students, three hours a week",
  fiveBody:
    "Not a committee. Five jobs, each small enough to hold alongside a degree — and every one of them trains a replacement from the first week, so nothing dies at graduation.",
  wavesHeading: "Which campuses, and when",
  wavesBody:
    "One chapter per institution, opened in waves — deliberately slowly, because one chapter that survives a full semester teaches us more than six that fold by November.",
  startCta:
    "Your school or university isn't on the list? Then start its chapter. You need five people and a room — we bring the playbook, the run-sheets, the survey, and someone who has already done it.",
} as const;

export const chapterRoles = [
  {
    id: "lead",
    title: "Chapter Lead",
    description: "Makes sure something happens this month, and decides when there's a tie.",
    hours: "3–4 hrs",
  },
  {
    id: "programme",
    title: "Programme",
    description: "Owns the session itself — topic, speaker or facilitator, materials, room.",
    hours: "3 hrs",
  },
  {
    id: "signal",
    title: "Signal",
    description: "Posters, posts, reminders, and the group chat that doesn't die.",
    hours: "2 hrs",
  },
  {
    id: "records",
    title: "Records",
    description: "Attendance in, survey out, numbers into the dashboard. Unglamorous. Load-bearing.",
    hours: "1–2 hrs",
  },
  {
    id: "understudy",
    title: "Understudy",
    description: "Shadows one of the above and takes it over next semester. Not optional.",
    hours: "1–2 hrs",
  },
] as const;

export const chapterPrinciples = [
  {
    id: "two-deep",
    title: "Two-deep on everything",
    body: "No job has exactly one person who knows how to do it. Every role has an understudy from day one. This is the anti-graduation vaccine.",
  },
  {
    id: "terms",
    title: "Terms end automatically",
    body: "Two semesters, then you rotate or leave. Nobody has to be voted out, so nobody has to campaign. That's how you delete politics — remove the thing worth fighting over.",
  },
  {
    id: "handover",
    title: "Handover is a deliverable",
    body: "You don't leave a role, you hand over a folder: contacts, what worked, what failed, the passwords, the next three ideas. No folder, no certificate.",
  },
  {
    id: "72-hours",
    title: "Write it, wait 72 hours, go",
    body: "Anyone can propose anything in one paragraph. Others comment for three days. The Chapter Lead decides. No committees, no quorum, no meeting to plan the meeting.",
  },
] as const;

export type Wave = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  note?: string;
};

export const chapterWaves: Wave[] = [
  {
    id: "wave-1",
    kicker: "Wave 1",
    title: "Sept 2026 → Mar 2027",
    body: "Middle East College, Muscat University, UTAS Muscat, GUtech",
  },
  {
    id: "wave-2",
    kicker: "Wave 2",
    title: "Apr 2027 → early 2028",
    body: "Sultan Qaboos University, Sohar University, NUST, MCBS, University of Nizwa, A'Sharqiyah University, Dhofar University, UTAS branch network",
    note: "The UTAS branches — Nizwa, Ibri, Salalah, Shinas, Ibra, Musanah, Suhar — are the single biggest reach multiplier in the country.",
  },
  {
    id: "wave-3",
    kicker: "Wave 3",
    title: "2028",
    body: "Dubai, China, Tanzania",
    note: "Cross-border chapters, online only.",
  },
];

export const squads = {
  heading: "Three students. One real client. Ten weeks.",
  body: "A café that needs an ordering system. A clinic drowning in a spreadsheet. A workshop with no way to see its own stock. Small businesses with real problems, and a small team of students who ship a working system and hand it over properly.",
  ruleTitle: "No orphan systems.",
  ruleBody:
    "The predictable failure mode is a graveyard of half-finished systems that small businesses came to depend on, running on a student's personal account, breaking in month four with nobody to call. So: everything is built on the client's own accounts, every project ships with a written manual and a support window with a hard end date, and anything a squad can't hand over completely is out of scope — no matter how impressive it would be. Boring and handed-over beats brilliant and abandoned, every single time.",
  forStudents:
    "You're picked from the chapter, not from a CV pile — showing up and being useful is the whole application. You get paid for the engagement, you get a mentor who reviews your code every week, and you finish with a real client and a real system you can point at. That is worth more than a certificate from any course.",
  forBusinesses:
    "Four engagement sizes, from a single system that does one thing through to connected pieces with staff logins and reporting. Our first three clients are pro bono — we're buying case studies, not revenue, and we say so out loud. After that, indicative pricing on request.",
} as const;

export const squadWeeks: Wave[] = [
  {
    id: "squad-0",
    kicker: "Week 0",
    title: "Scoping visit",
    body: "In person. One page: what hurts, what \"done\" means, what is explicitly out of scope. The client signs the page. This page prevents most of the disasters.",
  },
  {
    id: "squad-1-2",
    kicker: "Weeks 1–2",
    title: "Requirements",
    body: "Written requirements, screen sketches, and a written \"we will not build\" list. The client signs again.",
  },
  {
    id: "squad-3-7",
    kicker: "Weeks 3–7",
    title: "Build",
    body: "A demo to the client every week, no exceptions. A mentor reviews the code weekly.",
  },
  {
    id: "squad-8-9",
    kicker: "Weeks 8–9",
    title: "Handover",
    body: "Training session, written manual, credentials transferred, hosting moved to the client's own account.",
  },
  {
    id: "squad-10",
    kicker: "Week 10",
    title: "Case study",
    body: "Public write-up, photos, before-and-after numbers. This is what recruits the next hundred students.",
  },
];

export const evidence = {
  heading: "Six numbers, published every month.",
  body: "Student organisations collect ten times more data than they ever look at. So we keep three surveys and six numbers, and we publish them whether they flatter us or not.",
} as const;

export const evidenceMetrics = [
  {
    id: "live-chapters",
    label: "Live chapters",
    note: "Campuses that ran something in the last 35 days. Not chapters that exist on paper — chapters that moved.",
  },
  {
    id: "return-rate",
    label: "Return rate",
    note: "How many come to a second session within 60 days. The one number that matters. A full room with a low return rate means we threw a party.",
    northStar: true,
  },
  {
    id: "volunteer-survival",
    label: "Volunteer survival",
    note: "Officers still active at semester end. An early warning for burnout, months before a chapter dies.",
  },
  {
    id: "systems-shipped",
    label: "Systems shipped",
    note: "Build-squad projects delivered and handed over. Handed over is the operative phrase.",
  },
  {
    id: "outcomes",
    label: "Outcomes",
    note: "Members who report an internship, job or paid project they attribute to OCS. Slow to accumulate, and the only number a serious partner cares about.",
  },
  {
    id: "money",
    label: "Money in / money out",
    note: "Per chapter, published publicly, every month. This one is a trust instrument, not a finance metric.",
  },
] as const;

export const yourData = {
  heading: "Asked for properly, or not at all.",
  body: "Oman's Personal Data Protection Law has been fully enforceable since 5 February 2026, and an organisation whose whole premise is collecting student data is squarely in scope. So every form carries a real consent checkbox with real words — never pre-ticked — a plain-language privacy notice before anything is collected, separate consent for anything marketing-flavoured with a working unsubscribe, and a named person responsible for the data we hold.",
} as const;

export const money = {
  heading: "Free to join. Always.",
  body: "Membership is free by default and stays that way. Chapters will be partly funded by a voluntary Chapter Fund, ring-fenced to the student's own campus, with every rial published against what it bought. Contributing buys no extra access and no privilege, and cancelling takes one tap with no conversation. The moment paying buys advantage, we've built a class system inside a student society.",
} as const;
