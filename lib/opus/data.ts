export type AccountId = "lewis" | "grant" | "apex";
export type AccountType = "creator" | "enterprise" | "agency";
export type ClipStatus = "Draft" | "Ready" | "Approved" | "Posted";
export type Platform =
  | "YouTube"
  | "TikTok"
  | "YouTube Shorts"
  | "Instagram Reels"
  | "LinkedIn";

export type StatusHistoryEntry = {
  status: ClipStatus;
  timestamp: string;
  actor: string;
  reason?: string;
};

export type OpusAccount = {
  id: AccountId;
  name: string;
  type: AccountType;
  platforms: Platform[];
  category: string;
  audience: string;
  postingFrequency: string;
  preferredTemplate: string;
  approvalWorkflow: string;
  primaryKPI: string;
  roiScore: number;
  roiBenchmark: string;
  lastActivity: string;
};

export type OpusClip = {
  id: number;
  accountId: AccountId;
  title: string;
  timecode: string;
  duration: string;
  status: ClipStatus;
  transcript?: string;
  predictedViews?: string;
  actualViews?: string;
  predictedRevenue?: string;
  actualRevenue?: string;
  template?: string;
  platforms?: Platform[];
  scheduledFor?: string;
  postedAt?: string;
  sourceVideo?: string;
  client?: string; // for Apex roster clips
  statusHistory?: StatusHistoryEntry[];
};

export type ArchiveVideo = {
  id: string;
  accountId: AccountId;
  title: string;
  duration: string;
  recordedDate: string;
  topics: string[];
  transcript: string; // searchable excerpt
  suggestedClip?: { timecode: string; duration: string; reason: string };
};

export type PerformanceEntry = {
  period: string; // e.g. "2026-W08"
  label: string; // e.g. "Feb 17–23"
  views?: number;
  revenue?: number;
  impressions?: number;
  clipsPosted: number;
};

// ─── ACCOUNTS ──────────────────────────────────────────────────────────────────

export const OPUS_ACCOUNTS: OpusAccount[] = [
  {
    id: "lewis",
    name: "Lewis Howes",
    type: "creator",
    platforms: ["YouTube"],
    category: "Personal development, interviews",
    audience: "4.8M subscribers",
    postingFrequency: "1 clip/week",
    preferredTemplate: "BoldIntro",
    approvalWorkflow: "None (self-publish)",
    primaryKPI: "Views",
    roiScore: 7.8,
    roiBenchmark: "800K avg views/clip, top clips 2M+",
    lastActivity: "2026-02-28",
  },
  {
    id: "grant",
    name: "Grant Cardone",
    type: "enterprise",
    platforms: ["TikTok", "YouTube Shorts"],
    category: "Sales, business, real estate",
    audience: "9.2M combined followers",
    postingFrequency: "5 clips/week",
    preferredTemplate: "BrandX",
    approvalWorkflow: "Single approver required before any post",
    primaryKPI: "Revenue",
    roiScore: 9.2,
    roiBenchmark: "$3,800 avg revenue/clip, top clips $12K+",
    lastActivity: "2026-03-24",
  },
  {
    id: "apex",
    name: "Apex Media Group",
    type: "agency",
    platforms: ["TikTok", "Instagram Reels", "YouTube Shorts", "LinkedIn"],
    category: "Mixed (manages 14 creator clients)",
    audience: "41M combined reach across roster",
    postingFrequency: "30+ clips/week",
    preferredTemplate: "Varies per client",
    approvalWorkflow: "Two-stage: editor review then admin sign-off",
    primaryKPI: "Reach + Volume",
    roiScore: 8.1,
    roiBenchmark: "500K avg impressions/clip, 120 clips/month output target",
    lastActivity: "2026-03-29",
  },
];

// ─── CLIPS ─────────────────────────────────────────────────────────────────────

export const OPUS_CLIPS: OpusClip[] = [
  // ── Lewis Howes ──────────────────────────────────────────────────────────────
  {
    id: 3798,
    accountId: "lewis",
    title: "The 5-Second Rule That Changes Everything",
    timecode: "08:22–08:55",
    duration: "33s",
    status: "Posted",
    transcript:
      "you have five seconds to make a decision before your brain talks you out of it — five, four, three, two, one, go",
    actualViews: "1.24M",
    template: "BoldIntro",
    platforms: ["YouTube"],
    sourceVideo: "SOG Ep 251 — Mel Robbins on Habit Formation",
    postedAt: "2026-01-10",
    statusHistory: [
      { status: "Draft", timestamp: "2026-01-08T09:00:00Z", actor: "Lewis Howes" },
      { status: "Ready", timestamp: "2026-01-09T08:00:00Z", actor: "Lewis Howes" },
      { status: "Posted", timestamp: "2026-01-10T09:00:00Z", actor: "Lewis Howes" },
    ],
  },
  {
    id: 3799,
    accountId: "lewis",
    title: "Stop Waiting to Feel Ready",
    timecode: "14:40–15:18",
    duration: "38s",
    status: "Posted",
    transcript:
      "nobody ever feels ready — readiness is a myth your fear invented to keep you comfortable and safe and small",
    actualViews: "618K",
    template: "BoldIntro",
    platforms: ["YouTube"],
    sourceVideo: "SOG Ep 253 — Fear vs. Growth with Tim Ferriss",
    postedAt: "2026-01-24",
    statusHistory: [
      { status: "Draft", timestamp: "2026-01-22T10:00:00Z", actor: "Lewis Howes" },
      { status: "Ready", timestamp: "2026-01-23T09:00:00Z", actor: "Lewis Howes" },
      { status: "Posted", timestamp: "2026-01-24T08:00:00Z", actor: "Lewis Howes" },
    ],
  },
  {
    id: 3800,
    accountId: "lewis",
    title: "Your Network Is Your Net Worth",
    timecode: "31:05–31:44",
    duration: "39s",
    status: "Posted",
    transcript:
      "the people in your life are either pulling you up or pulling you down — there is no neutral relationship, no one is just along for the ride",
    actualViews: "892K",
    template: "BoldIntro",
    platforms: ["YouTube"],
    sourceVideo: "SOG Ep 256 — Relationships That Shape Success",
    postedAt: "2026-02-07",
    statusHistory: [
      { status: "Draft", timestamp: "2026-02-05T10:00:00Z", actor: "Lewis Howes" },
      { status: "Ready", timestamp: "2026-02-06T09:00:00Z", actor: "Lewis Howes" },
      { status: "Posted", timestamp: "2026-02-07T08:00:00Z", actor: "Lewis Howes" },
    ],
  },
  {
    id: 3801,
    accountId: "lewis",
    title: "How Champions Think",
    timecode: "04:15–04:52",
    duration: "37s",
    status: "Posted",
    transcript:
      "the mindset of a champion starts before the game even begins — it starts in the morning, in the mirror, in the quiet moments no one else sees",
    actualViews: "847K",
    template: "BoldIntro",
    platforms: ["YouTube"],
    sourceVideo: "SOG Ep 259 — The Champion's Mindset with David Goggins",
    postedAt: "2026-02-28",
    statusHistory: [
      { status: "Draft", timestamp: "2026-02-26T10:00:00Z", actor: "Lewis Howes" },
      { status: "Ready", timestamp: "2026-02-27T09:00:00Z", actor: "Lewis Howes" },
      { status: "Posted", timestamp: "2026-02-28T08:00:00Z", actor: "Lewis Howes" },
    ],
  },
  {
    id: 3802,
    accountId: "lewis",
    title: "The One Habit",
    timecode: "22:10–22:38",
    duration: "28s",
    status: "Ready",
    transcript:
      "the one habit that changed everything for me was journaling — not gratitude lists, not goals, just three pages of honest thought every single morning",
    predictedViews: "1.1M–1.6M",
    template: "BoldIntro",
    platforms: ["YouTube"],
    sourceVideo: "SOG Ep 261 — Morning Routines of the Top 1%",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-10T11:00:00Z", actor: "Lewis Howes" },
      { status: "Ready", timestamp: "2026-03-12T09:00:00Z", actor: "Lewis Howes" },
    ],
  },
  {
    id: 3803,
    accountId: "lewis",
    title: "Discipline Beats Motivation",
    timecode: "41:30–42:01",
    duration: "31s",
    status: "Ready",
    transcript:
      "motivation is a feeling — it comes and goes — but discipline is a decision you make before you feel like it, that's the difference between people who change and people who just want to",
    predictedViews: "850K–1.2M",
    template: "BoldIntro",
    platforms: ["YouTube"],
    sourceVideo: "SOG Ep 261 — Morning Routines of the Top 1%",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-18T10:00:00Z", actor: "Lewis Howes" },
      { status: "Ready", timestamp: "2026-03-20T09:00:00Z", actor: "Lewis Howes" },
    ],
  },
  {
    id: 3804,
    accountId: "lewis",
    title: "What Fear Is Really Telling You",
    timecode: "17:55–18:22",
    duration: "27s",
    status: "Draft",
    transcript:
      "fear isn't the enemy — fear is information — it's pointing directly at the thing that matters most to you, the thing you haven't been willing to face yet",
    predictedViews: "700K–1.0M",
    template: "BoldIntro",
    platforms: ["YouTube"],
    sourceVideo: "SOG Ep 263 — The Courage Code with Brené Brown",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-28T14:00:00Z", actor: "Lewis Howes" },
    ],
  },

  // ── Grant Cardone ─────────────────────────────────────────────────────────────
  {
    id: 4019,
    accountId: "grant",
    title: "Money Loves Speed",
    timecode: "03:10–03:38",
    duration: "28s",
    status: "Posted",
    transcript:
      "the number one reason people don't make money is they hesitate — money moves at the speed of decision, not the speed of comfort",
    actualViews: "3.4M",
    actualRevenue: "$11,200",
    template: "BrandX",
    platforms: ["TikTok", "YouTube Shorts"],
    sourceVideo: "10X Rule Masterclass — March 2026 Session 1",
    postedAt: "2026-03-05",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-03T09:00:00Z", actor: "Grant Cardone" },
      { status: "Ready", timestamp: "2026-03-04T10:00:00Z", actor: "Grant Cardone" },
      { status: "Approved", timestamp: "2026-03-04T14:00:00Z", actor: "Sales Team Approver" },
      { status: "Posted", timestamp: "2026-03-05T09:00:00Z", actor: "Sales Team Approver" },
    ],
  },
  {
    id: 4020,
    accountId: "grant",
    title: "The Real Estate Play Nobody Talks About",
    timecode: "28:44–29:14",
    duration: "30s",
    status: "Posted",
    transcript:
      "everybody's buying single-family homes while the wealthy are buying multifamily — you want to know why the rich get richer? they buy cash flow, not equity",
    actualViews: "2.1M",
    actualRevenue: "$7,800",
    template: "BrandX",
    platforms: ["TikTok", "YouTube Shorts"],
    sourceVideo: "Real Estate Wealth Summit — Feb 2026",
    postedAt: "2026-03-12",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-10T09:00:00Z", actor: "Grant Cardone" },
      { status: "Ready", timestamp: "2026-03-11T10:00:00Z", actor: "Grant Cardone" },
      { status: "Approved", timestamp: "2026-03-11T15:00:00Z", actor: "Sales Team Approver" },
      { status: "Posted", timestamp: "2026-03-12T09:00:00Z", actor: "Sales Team Approver" },
    ],
  },
  {
    id: 4021,
    accountId: "grant",
    title: "Why Your Salary Is a Trap",
    timecode: "09:55–10:22",
    duration: "27s",
    status: "Posted",
    transcript:
      "a salary is your employer's way of telling you what your time is worth — and it is always less than you're actually worth, always",
    actualViews: "4.1M",
    actualRevenue: "$14,600",
    template: "BrandX",
    platforms: ["TikTok", "YouTube Shorts"],
    sourceVideo: "10X Rule Masterclass — March 2026 Session 2",
    postedAt: "2026-03-19",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-17T09:00:00Z", actor: "Grant Cardone" },
      { status: "Ready", timestamp: "2026-03-18T10:00:00Z", actor: "Grant Cardone" },
      { status: "Approved", timestamp: "2026-03-18T14:30:00Z", actor: "Sales Team Approver" },
      { status: "Posted", timestamp: "2026-03-19T09:00:00Z", actor: "Sales Team Approver" },
    ],
  },
  {
    id: 4022,
    accountId: "grant",
    title: "How I Turned $800 Into $8M",
    timecode: "05:12–05:44",
    duration: "32s",
    status: "Draft",
    transcript:
      "I started with eight hundred dollars and one rule — never spend it on anything that doesn't make you more money — that rule built everything",
    predictedViews: "3.8M–5.2M",
    predictedRevenue: "$13,400",
    template: "BrandX",
    platforms: ["TikTok", "YouTube Shorts"],
    sourceVideo: "10X Rule Masterclass — March 2026 Session 2",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-22T09:00:00Z", actor: "Grant Cardone" },
      {
        status: "Draft",
        timestamp: "2026-03-23T11:00:00Z",
        actor: "Sales Team Approver",
        reason: "Hook lands too late — start at 05:22 where the $800 line hits, cut the setup",
      },
    ],
  },
  {
    id: 4023,
    accountId: "grant",
    title: "Close More Deals",
    timecode: "12:34–13:01",
    duration: "27s",
    status: "Ready",
    transcript:
      "close deals, close more deals, closing is the only thing that separates the people who make it from the people who almost made it",
    predictedRevenue: "$8,200",
    predictedViews: "2.4M–3.1M",
    template: "BrandX",
    platforms: ["TikTok", "YouTube Shorts"],
    sourceVideo: "10X Sales Training — March 2026 Live Session",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-20T14:00:00Z", actor: "Grant Cardone" },
      { status: "Ready", timestamp: "2026-03-22T10:00:00Z", actor: "Grant Cardone" },
    ],
  },
  {
    id: 4024,
    accountId: "grant",
    title: "The Mindset of a Closer",
    timecode: "08:12–08:44",
    duration: "32s",
    status: "Draft",
    transcript:
      "winners don't wait for the perfect moment — they create urgency, they manufacture pressure, they close before the other person even knows a deal is on the table",
    predictedRevenue: "$5,400",
    predictedViews: "1.8M–2.2M",
    template: "BrandX",
    platforms: ["TikTok"],
    sourceVideo: "10X Sales Training — March 2026 Live Session",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-24T09:00:00Z", actor: "Grant Cardone" },
    ],
  },

  // ── Apex Media Group — Roster Clips ──────────────────────────────────────────
  {
    id: 5101,
    accountId: "apex",
    client: "Jordan Belfort Speaks",
    title: "The Art of the Pitch",
    timecode: "06:20–06:52",
    duration: "32s",
    status: "Ready",
    transcript:
      "the first ten seconds of a pitch either open a door or close one forever — your tone, your posture, your certainty — that's what they buy, not your product",
    predictedViews: "1.8M",
    template: "PowerMove",
    platforms: ["TikTok", "YouTube Shorts"],
    sourceVideo: "Wolf of Wall Street Sales Summit — March 2026",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-25T09:00:00Z", actor: "Apex Editor" },
      { status: "Ready", timestamp: "2026-03-27T10:00:00Z", actor: "Apex Editor" },
    ],
  },
  {
    id: 5102,
    accountId: "apex",
    client: "Dr. Sarah Chen Wellness",
    title: "The Sleep Protocol That Fixed My Brain",
    timecode: "11:44–12:18",
    duration: "34s",
    status: "Ready",
    transcript:
      "I cut my cortisol by forty percent in six weeks — no supplements, no biohacks — just three protocol changes that most doctors never tell you about",
    predictedViews: "2.3M",
    template: "CleanSlate",
    platforms: ["Instagram Reels", "YouTube Shorts"],
    sourceVideo: "Dr. Chen Podcast Ep 88 — Sleep Science Deep Dive",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-25T10:00:00Z", actor: "Apex Editor" },
      { status: "Ready", timestamp: "2026-03-27T11:00:00Z", actor: "Apex Editor" },
    ],
  },
  {
    id: 5103,
    accountId: "apex",
    client: "Marcus Reid Finance",
    title: "The ETF Play That Beats the Market",
    timecode: "22:05–22:38",
    duration: "33s",
    status: "Ready",
    transcript:
      "I've looked at every major ETF strategy since 1990 and one pattern holds up in every market cycle — the kind of play most financial advisors won't show you because it makes them unnecessary",
    predictedViews: "900K",
    template: "NumbersUp",
    platforms: ["LinkedIn", "YouTube Shorts"],
    sourceVideo: "The Reid Report — Ep 41 Market Analysis",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-26T09:00:00Z", actor: "Apex Editor" },
      { status: "Ready", timestamp: "2026-03-28T10:00:00Z", actor: "Apex Editor" },
    ],
  },
  {
    id: 5104,
    accountId: "apex",
    client: "Jade Williams Fitness",
    title: "Why You're Not Losing Weight",
    timecode: "04:30–05:02",
    duration: "32s",
    status: "Ready",
    transcript:
      "the problem isn't your diet and it isn't your workout — it's your nervous system — you can't out-exercise chronic stress, and most people are running on cortisol twenty-four hours a day",
    predictedViews: "3.1M",
    template: "EnergyBoost",
    platforms: ["TikTok", "Instagram Reels"],
    sourceVideo: "Jade Williams — 30-Day Reset Program Intro",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-26T10:00:00Z", actor: "Apex Editor" },
      { status: "Ready", timestamp: "2026-03-28T11:00:00Z", actor: "Apex Editor" },
    ],
  },
  {
    id: 5105,
    accountId: "apex",
    client: "Marcus Reid Finance",
    title: "What the Fed Isn't Telling You",
    timecode: "38:12–38:50",
    duration: "38s",
    status: "Ready",
    transcript:
      "the Federal Reserve publishes its minutes 21 days after every meeting — by the time retail investors read the news, institutions have already repositioned — here's how to read the signal before the noise",
    predictedViews: "740K",
    template: "NumbersUp",
    platforms: ["LinkedIn", "YouTube Shorts"],
    sourceVideo: "The Reid Report — Ep 42 Fed Watch Special",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-27T09:00:00Z", actor: "Apex Editor" },
      { status: "Ready", timestamp: "2026-03-29T10:00:00Z", actor: "Apex Editor" },
    ],
  },
  {
    id: 5106,
    accountId: "apex",
    client: "Jordan Belfort Speaks",
    title: "Rejection Is Part of the Script",
    timecode: "19:33–20:05",
    duration: "32s",
    status: "Draft",
    transcript:
      "every no is a step in the script — you're not being rejected, you're being redirected — the best salespeople I know treat rejection like a warm-up exercise",
    predictedViews: "1.4M",
    template: "PowerMove",
    platforms: ["TikTok"],
    sourceVideo: "Wolf of Wall Street Sales Summit — March 2026",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-28T14:00:00Z", actor: "Apex Editor" },
    ],
  },
  {
    id: 5107,
    accountId: "apex",
    client: "Dr. Sarah Chen Wellness",
    title: "The Inflammation Trigger Nobody Removes",
    timecode: "29:10–29:40",
    duration: "30s",
    status: "Draft",
    transcript:
      "most people obsess over food inflammation while completely ignoring the biggest trigger — electromagnetic overexposure from screens before bed is spiking your inflammatory markers more than seed oils ever could",
    predictedViews: "1.9M",
    template: "CleanSlate",
    platforms: ["Instagram Reels"],
    sourceVideo: "Dr. Chen Podcast Ep 89 — Inflammation Deep Dive",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-29T09:00:00Z", actor: "Apex Editor" },
    ],
  },
  {
    id: 5108,
    accountId: "apex",
    client: "Jade Williams Fitness",
    title: "Train Like This After 35",
    timecode: "14:22–14:55",
    duration: "33s",
    status: "Posted",
    transcript:
      "if you're over 35 and still training like you did at 22, you are actively destroying your hormones — here's the shift that adds a decade to your athletic life",
    predictedViews: "2.8M",
    actualViews: "2.6M",
    template: "EnergyBoost",
    platforms: ["TikTok", "Instagram Reels"],
    sourceVideo: "Jade Williams — Over-35 Performance Guide",
    postedAt: "2026-03-22",
    statusHistory: [
      { status: "Draft", timestamp: "2026-03-18T10:00:00Z", actor: "Apex Editor" },
      { status: "Ready", timestamp: "2026-03-20T10:00:00Z", actor: "Apex Editor" },
      { status: "Approved", timestamp: "2026-03-21T11:00:00Z", actor: "Apex Editor" },
      { status: "Approved", timestamp: "2026-03-21T15:00:00Z", actor: "Apex Admin" },
      { status: "Posted", timestamp: "2026-03-22T09:00:00Z", actor: "Apex Admin" },
    ],
  },
];

// ─── ARCHIVE VIDEOS (searchable source material) ───────────────────────────────

export const ARCHIVE_VIDEOS: ArchiveVideo[] = [
  // Lewis Howes archive
  {
    id: "sog-ep261",
    accountId: "lewis",
    title: "SOG Ep 261 — Morning Routines of the Top 1%",
    duration: "1h 12m",
    recordedDate: "2026-03-08",
    topics: ["morning routines", "discipline", "habits", "journaling", "mindset"],
    transcript:
      "the one habit that changed everything for me was journaling... discipline beats motivation every time... the morning is the only time the world hasn't interrupted your thinking yet... 28-second version at 22:10 is gold...",
    suggestedClip: {
      timecode: "22:10–22:38",
      duration: "28s",
      reason: "28-second hook outperforms 37s by 22% on YouTube Shorts — optimal for algorithm",
    },
  },
  {
    id: "sog-ep263",
    accountId: "lewis",
    title: "SOG Ep 263 — The Courage Code with Brené Brown",
    duration: "58m",
    recordedDate: "2026-03-22",
    topics: ["fear", "vulnerability", "courage", "emotional intelligence", "growth"],
    transcript:
      "fear isn't the enemy — fear is information... what fear is really telling you is that this matters... vulnerability is not weakness, it's the birthplace of courage...",
    suggestedClip: {
      timecode: "17:55–18:22",
      duration: "27s",
      reason: "Fear reframe under 30 seconds — high share velocity on YouTube based on past patterns",
    },
  },
  {
    id: "sog-ep265",
    accountId: "lewis",
    title: "SOG Ep 265 — The Identity Shift with James Clear",
    duration: "1h 04m",
    recordedDate: "2026-03-29",
    topics: ["identity", "atomic habits", "behavior change", "consistency", "systems"],
    transcript:
      "every action you take is a vote for the type of person you want to become... the goal is not to run a marathon, the goal is to become a runner... systems beat goals every single time...",
    suggestedClip: {
      timecode: "09:44–10:12",
      duration: "28s",
      reason: "Identity-first framing — James Clear content averages 1.4M views on this channel",
    },
  },
  // Grant Cardone archive
  {
    id: "10x-march-s3",
    accountId: "grant",
    title: "10X Masterclass — March 2026 Session 3",
    duration: "2h 15m",
    recordedDate: "2026-03-26",
    topics: ["scaling business", "10x rule", "revenue", "systems", "team building"],
    transcript:
      "you don't have a money problem, you have a target problem... 10x isn't about working harder, it's about thinking bigger... most people quit at the 2x level when the 10x was right there...",
    suggestedClip: {
      timecode: "44:10–44:38",
      duration: "28s",
      reason: "10x framing clips average $9,200 revenue — best-performing category for this account",
    },
  },
  {
    id: "re-summit-mar",
    accountId: "grant",
    title: "Real Estate Summit — March 2026",
    duration: "3h 00m",
    recordedDate: "2026-03-28",
    topics: ["real estate", "multifamily", "passive income", "cash flow", "investing"],
    transcript:
      "the biggest mistake first-time investors make is buying residential... commercial multifamily is where the money is... cap rates tell you everything...",
    suggestedClip: {
      timecode: "1:02:20–1:02:48",
      duration: "28s",
      reason: "Real estate clips drive 40% of course conversions — this angle hasn't been used yet",
    },
  },
];

// ─── PERFORMANCE HISTORY ────────────────────────────────────────────────────────

export const PERFORMANCE_HISTORY: Record<AccountId, PerformanceEntry[]> = {
  lewis: [
    { period: "2026-W01", label: "Dec 28–Jan 3", views: 0, clipsPosted: 0 },
    { period: "2026-W02", label: "Jan 4–10", views: 1_240_000, clipsPosted: 1 },
    { period: "2026-W03", label: "Jan 11–17", views: 0, clipsPosted: 0 },
    { period: "2026-W04", label: "Jan 18–24", views: 618_000, clipsPosted: 1 },
    { period: "2026-W05", label: "Jan 25–31", views: 0, clipsPosted: 0 },
    { period: "2026-W06", label: "Feb 1–7", views: 892_000, clipsPosted: 1 },
    { period: "2026-W07", label: "Feb 8–14", views: 0, clipsPosted: 0 },
    { period: "2026-W08", label: "Feb 15–21", views: 0, clipsPosted: 0 },
    { period: "2026-W09", label: "Feb 22–28", views: 847_000, clipsPosted: 1 },
    { period: "2026-W10", label: "Mar 1–7", views: 0, clipsPosted: 0 },
    { period: "2026-W11", label: "Mar 8–14", views: 0, clipsPosted: 0 },
    { period: "2026-W12", label: "Mar 15–21", views: 0, clipsPosted: 0 },
    { period: "2026-W13", label: "Mar 22–28", views: 0, clipsPosted: 0 },
  ],
  grant: [
    { period: "2026-W09", label: "Feb 22–28", revenue: 9_100, views: 2_800_000, clipsPosted: 4 },
    { period: "2026-W10", label: "Mar 1–7", revenue: 11_200, views: 3_400_000, clipsPosted: 5 },
    { period: "2026-W11", label: "Mar 8–14", revenue: 7_800, views: 2_100_000, clipsPosted: 5 },
    { period: "2026-W12", label: "Mar 15–21", revenue: 14_600, views: 4_100_000, clipsPosted: 5 },
    { period: "2026-W13", label: "Mar 22–28", revenue: 2_200, views: 820_000, clipsPosted: 2 },
  ],
  apex: [
    { period: "2026-W09", label: "Feb 22–28", impressions: 18_200_000, clipsPosted: 28 },
    { period: "2026-W10", label: "Mar 1–7", impressions: 21_400_000, clipsPosted: 31 },
    { period: "2026-W11", label: "Mar 8–14", impressions: 19_800_000, clipsPosted: 30 },
    { period: "2026-W12", label: "Mar 15–21", impressions: 23_100_000, clipsPosted: 34 },
    { period: "2026-W13", label: "Mar 22–28", impressions: 16_400_000, clipsPosted: 24 },
  ],
};

// ─── EXAMPLE PILLS ──────────────────────────────────────────────────────────────

export const ACCOUNT_SUGGESTIONS: Record<AccountId, string[]> = {
  lewis: [
    "It's been a few weeks since my last post. What's the best clip I can put out this week to maximize views?",
    "Search my archive for clips about morning routines and habits",
    "Show me my ROI dashboard and tell me what to post this week",
  ],
  grant: [
    "Create a clip from 12:34 to 13:01 in the latest sales training video, add auto-captions and BrandX template, and queue it for TikTok tomorrow morning",
    "Show me my revenue by clip this month — what's performing and what's not?",
    "What's in my archive that we haven't clipped yet with the highest revenue potential?",
  ],
  apex: [
    "Find the top 5 highest-reach clips across our roster ready to post this week and queue them across all platforms",
    "How are we tracking against the 120 clips/month target?",
    "Show me everything in Ready status for the Marcus Reid and Jade Williams accounts",
  ],
};

// ─── RUNTIME CLIP STORE (created/mutated during session) ─────────────────────────

const RUNTIME_CLIPS: OpusClip[] = [];
const CLIP_PATCHES = new Map<number, Partial<OpusClip>>();

let _nextClipId = Math.max(...OPUS_CLIPS.map((c) => c.id)) + 1;

export function addRuntimeClip(clip: Omit<OpusClip, "id">): OpusClip {
  const newClip: OpusClip = { id: _nextClipId++, ...clip };
  RUNTIME_CLIPS.push(newClip);
  return newClip;
}

export function patchClip(clipId: number, patch: Partial<OpusClip>): OpusClip | undefined {
  const existing = OPUS_CLIPS.find((c) => c.id === clipId) ?? RUNTIME_CLIPS.find((c) => c.id === clipId);
  if (!existing) return undefined;

  const current = { ...existing, ...(CLIP_PATCHES.get(clipId) ?? {}) };

  // Merge statusHistory (append, don't overwrite)
  const mergedHistory = patch.statusHistory
    ? [...(current.statusHistory ?? []), ...patch.statusHistory]
    : current.statusHistory;

  const updated: Partial<OpusClip> = { ...CLIP_PATCHES.get(clipId), ...patch, statusHistory: mergedHistory };
  CLIP_PATCHES.set(clipId, updated);

  return { ...current, ...updated };
}

// ─── HELPERS ────────────────────────────────────────────────────────────────────

export function getAccountById(id: AccountId): OpusAccount | undefined {
  return OPUS_ACCOUNTS.find((a) => a.id === id);
}

function applyPatch(clip: OpusClip): OpusClip {
  const patch = CLIP_PATCHES.get(clip.id);
  if (!patch) return clip;
  return { ...clip, ...patch };
}

export function getClipsByAccount(accountId: AccountId): OpusClip[] {
  return [
    ...OPUS_CLIPS.filter((c) => c.accountId === accountId).map(applyPatch),
    ...RUNTIME_CLIPS.filter((c) => c.accountId === accountId).map(applyPatch),
  ];
}

export function getClipById(clipId: number): OpusClip | undefined {
  const clip =
    OPUS_CLIPS.find((c) => c.id === clipId) ??
    RUNTIME_CLIPS.find((c) => c.id === clipId);
  return clip ? applyPatch(clip) : undefined;
}

export function getArchiveByAccount(accountId: AccountId): ArchiveVideo[] {
  return ARCHIVE_VIDEOS.filter((v) => v.accountId === accountId);
}

export function getPerformanceHistory(accountId: AccountId): PerformanceEntry[] {
  return PERFORMANCE_HISTORY[accountId] ?? [];
}

export function getReadyClipsByAccount(accountId: AccountId): OpusClip[] {
  return OPUS_CLIPS.filter((c) => c.accountId === accountId && c.status === "Ready");
}
