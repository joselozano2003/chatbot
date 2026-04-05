# Opus Intelligence — Demo Plan

**Total time:** ~12 minutes
**Three flows:** Decision engine → Create + approve/reject → Bulk workflow

---

## Setup (1 min)

Open the app. Point to the sidebar:

> "Three accounts are loaded — a solo creator, an enterprise brand, and a media agency. The active account changes the system prompt, the clip library, and the example prompts. The AI is aware of each account's KPI, approval workflow, and posting history at all times."

Switch between Lewis → Grant → Apex so the interviewer sees the sidebar update.

---

## Demo 1 — Lewis Howes: Decision Engine (3 min)

**Account:** Lewis Howes (Creator)

**What this shows:** OpusSearch, ROI reporting, self-publish flow (R2, R3, R5, R8)

**Prompt to use (click the pill):**

> "It's been a few weeks since my last post. What's the best clip I can put out this week to maximize views?"

**What the agent should do:**

1. Identifies last post: ClipID 3801 "How Champions Think" — 2026-02-28, 847K views
2. Surfaces ClipID 3802 "The One Habit" as the top recommendation
3. Explains *why* — 28s clips outperform 37s+ by 22% on YouTube, predicted 1.1M–1.6M views
4. Calls `displayClip` → clip card renders inline with ROI bar and status badge
5. Notes optimal posting window: Tuesday/Wednesday 8–10 AM PT
6. Self-publishes immediately (no approval gate) with BoldIntro template

**Follow-up to show context retention:**

> "What about the discipline clip — is that worth posting instead?"

Agent surfaces ClipID 3803, compares it to 3802 (31s vs 28s), recommends sticking with 3802.

**Key talking point:** "The agent doesn't just surface clips — it makes the call and explains it. That's the difference between a dashboard and a decision engine."

---

## Demo 2 — Grant Cardone: Create + Approve + Reject (4 min)

**Account:** Grant Cardone (Enterprise)

**What this shows:** Clip creation, approval gate, rejection with reason, audit log (R3, R4, R5, R6, R7)

**Prompt to use (click the pill):**

> "Create a clip from 12:34 to 13:01 in the latest sales training video, add auto-captions and BrandX template, and queue it for TikTok tomorrow morning."

**What the agent should do:**

1. Confirms: ClipID 4023 "Close More Deals" — 27s, BrandX, auto-captions, TikTok 9:00 AM PT
2. Flags $8,200 predicted revenue, 2.4M–3.1M predicted views
3. Calls `displayClip` → clip card renders
4. Notes approval gate: single approver required
5. Calls `requestClipApproval` → approval block renders with Approve / Reject buttons

**Reject the clip** (click Reject, type):

> "Hook needs to open on the close, not the setup — recut to start at 12:41"

**What the agent should do after rejection:**

1. Logs rejection: ClipID 4023 returned to Draft — reason: "Hook needs to open on the close, not the setup"
2. Confirms audit trail with timestamp and actor
3. Asks: "Recut to 12:41–13:01, or should I find a different moment from the same session?"

**Key talking point:** "The approval block is interactive. The rejection reason gets logged and attached to the clip. The agent picks up exactly where the human left off."

**Bonus — show the draft with rejection note:**

> "Show me what's in draft right now"

Agent lists ClipID 4022 (has a prior rejection) and 4023 (just rejected). The rejection notes are visible in the clip cards.

---

## Demo 3 — Apex Media Group: Bulk Workflow (4 min)

**Account:** Apex Media Group (Agency)

**What this shows:** Bulk search, pre-submission summary, two-stage approval, partial hold (R6, R7, R9)

**Prompt to use (click the pill):**

> "Find the top 5 highest-reach clips across our roster ready to post this week and queue them across all platforms."

**What the agent should do:**

1. Finds 5 Ready clips across 4 clients:
   - ClipID 5104 — Jade Williams — 3.1M predicted (TikTok, Instagram Reels)
   - ClipID 5102 — Dr. Sarah Chen — 2.3M predicted (Instagram Reels, YouTube Shorts)
   - ClipID 5101 — Jordan Belfort — 1.8M predicted (TikTok, YouTube Shorts)
   - ClipID 5106 — Jordan Belfort — 1.4M predicted (TikTok)  ← *flag: this one is Draft, not Ready*
   - ClipID 5103 — Marcus Reid — 900K predicted (LinkedIn, YouTube Shorts)

2. Surfaces pre-submission summary:
   - 5 clips across 4 clients
   - 9 posts across TikTok / Instagram Reels / YouTube Shorts / LinkedIn
   - Estimated combined reach: ~10.5M impressions
   - Scheduled over 5 days

3. Calls `requestClipApproval` with `approvalType: "editor"` (stage 1) for each clip

**For the partial hold:** When the editor approval block appears for ClipID 5103 (Marcus Reid finance clip), click Reject and type:

> "Tone review needed — LinkedIn compliance check required before this goes live"

**What the agent should do:**

1. Holds ClipID 5103, logs editor note
2. Escalates the other 4 clips to admin (stage 2) — shows second approval block
3. Admin approves — 8 posts queued
4. ClipID 5103 returns to Draft with editor note attached

**Key talking point:** "One rejection doesn't stop the batch. The rest of the clips move forward. The held clip sits in Draft with the reason attached, ready for the next cycle."

---

## Wrap (1 min)

> "Three account types, three different KPIs, three different approval structures — the agent knows which mode it's in and behaves accordingly. The clip cards, approval blocks, and audit trail are all rendered inline. There's no switching between tools or screens."

Point to what you'd build next if you had the role:
- Real video player embed in the clip card (scrub to timecode)
- Webhook to actual TikTok / YouTube Shorts posting APIs
- Live transcript indexing for OpusSearch against real video archives
- ROI dashboard view as a full-page artifact

---

## Prompts Cheat Sheet

| Flow | Prompt |
|------|--------|
| Lewis — decision engine | "It's been a few weeks since my last post. What's the best clip I can put out this week to maximize views?" |
| Lewis — search | "Search my archive for clips about morning routines and habits" |
| Lewis — ROI | "Show me my ROI dashboard and tell me what to post this week" |
| Grant — create clip | "Create a clip from 12:34 to 13:01 in the latest sales training video, add auto-captions and BrandX template, and queue it for TikTok tomorrow morning" |
| Grant — revenue | "Show me my revenue by clip this month — what's performing and what's not?" |
| Grant — archive | "What's in my archive that we haven't clipped yet with the highest revenue potential?" |
| Apex — bulk | "Find the top 5 highest-reach clips across our roster ready to post this week and queue them across all platforms" |
| Apex — output rate | "How are we tracking against the 120 clips/month target?" |
| Apex — by client | "Show me everything in Ready status for the Marcus Reid and Jade Williams accounts" |
