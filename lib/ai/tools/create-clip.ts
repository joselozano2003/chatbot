import { tool } from "ai";
import { z } from "zod";
import { addRuntimeClip, type AccountId, type Platform } from "@/lib/opus/data";

export const createClip = tool({
  description:
    "Create a new clip from a source video. Always call this when the user asks to create or make a clip. After calling this, call displayClip with the returned clipId.",
  inputSchema: z.object({
    accountId: z
      .enum(["lewis", "grant", "apex"])
      .describe("The account this clip belongs to"),
    title: z.string().describe("A short descriptive title for the clip"),
    timecode: z.string().describe("The timecode range, e.g. '9:34–10:15'"),
    duration: z.string().describe("Duration string, e.g. '41s'"),
    sourceVideo: z.string().describe("The source video title"),
    template: z.string().optional().describe("Template name, e.g. 'BrandX'"),
    platforms: z
      .array(z.enum(["YouTube", "TikTok", "YouTube Shorts", "Instagram Reels", "LinkedIn"]))
      .optional()
      .describe("Target platforms"),
    predictedViews: z.string().optional().describe("Predicted view range, e.g. '2.2M–2.9M'"),
    predictedRevenue: z.string().optional().describe("Predicted revenue, e.g. '$7,600'"),
    scheduledFor: z.string().optional().describe("ISO timestamp for scheduled post, e.g. '2026-03-31T09:00:00Z'"),
    client: z.string().optional().describe("Client name (Apex agency clips only)"),
  }),
  execute: async ({
    accountId,
    title,
    timecode,
    duration,
    sourceVideo,
    template,
    platforms,
    predictedViews,
    predictedRevenue,
    scheduledFor,
    client,
  }) => {
    const now = new Date().toISOString();
    const clip = addRuntimeClip({
      accountId: accountId as AccountId,
      title,
      timecode,
      duration,
      sourceVideo,
      template,
      platforms: platforms as Platform[] | undefined,
      predictedViews,
      predictedRevenue,
      scheduledFor,
      client,
      status: "Draft",
      statusHistory: [{ status: "Draft", timestamp: now, actor: "Opus Intelligence" }],
    });
    return { clipId: clip.id, clip };
  },
});
