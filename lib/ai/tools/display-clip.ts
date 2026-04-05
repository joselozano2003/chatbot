import { tool } from "ai";
import { z } from "zod";
import { getClipById } from "@/lib/opus/data";

export const displayClip = tool({
  description:
    "Display a clip card inline in the chat. Use this whenever you reference a specific clip by ID to show the user its details, status, and metrics.",
  inputSchema: z.object({
    clipId: z.number().describe("The clip ID to display (e.g. 3801, 3802, 4023, 4011)"),
    action: z
      .enum(["view", "draft", "schedule", "approve"])
      .optional()
      .describe("The intended action context for this clip display"),
    note: z.string().optional().describe("Optional note to attach to the clip display"),
  }),
  execute: async ({ clipId, action, note }) => {
    const clip = getClipById(clipId);
    if (!clip) {
      return { error: `Clip ${clipId} not found in library.` };
    }
    return { clip, action, note };
  },
});
