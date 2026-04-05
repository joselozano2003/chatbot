import { tool } from "ai";
import { z } from "zod";
import { getClipById } from "@/lib/opus/data";

export const requestClipApproval = tool({
  description:
    "Show an approval block in the chat for a clip that requires human sign-off before posting. Use this when a clip needs to go through an approval gate (enterprise single-approver or agency two-stage).",
  inputSchema: z.object({
    clipId: z.number().describe("The clip ID requiring approval"),
    approvalType: z
      .enum(["single", "editor", "admin"])
      .describe(
        "single = enterprise single approver, editor = agency stage 1, admin = agency stage 2"
      ),
    stage: z.number().optional().describe("Stage number (1 or 2 for two-stage workflows)"),
    scheduledFor: z
      .string()
      .optional()
      .describe("When the clip is scheduled to post (ISO string or human-readable)"),
    platform: z.string().optional().describe("Target platform for the post"),
    context: z
      .string()
      .optional()
      .describe("Additional context for the approver"),
  }),
  execute: async ({ clipId, approvalType, stage, scheduledFor, platform, context }) => {
    const clip = getClipById(clipId);
    if (!clip) {
      return { error: `Clip ${clipId} not found in library.` };
    }
    return {
      clip,
      approvalType,
      stage: stage ?? 1,
      scheduledFor,
      platform,
      context,
      requestedAt: new Date().toISOString(),
    };
  },
});
