import { tool } from "ai";
import { z } from "zod";
import { patchClip } from "@/lib/opus/data";

export const updateClip = tool({
  description:
    "Update a clip's status and/or metadata. Call this whenever a clip's lifecycle changes (e.g. Draft → Approved, Approved → Posted, rejection back to Draft). Always follow with a displayClip call so the updated card renders in the chat.",
  inputSchema: z.object({
    clipId: z.number().describe("The clip ID to update"),
    status: z
      .enum(["Draft", "Ready", "Approved", "Posted"])
      .optional()
      .describe("New status for the clip"),
    scheduledFor: z.string().optional().describe("ISO timestamp for scheduled post"),
    postedAt: z.string().optional().describe("ISO timestamp when clip was posted"),
    statusHistoryEntry: z
      .object({
        status: z.enum(["Draft", "Ready", "Approved", "Posted"]),
        actor: z.string(),
        reason: z.string().optional(),
      })
      .optional()
      .describe("New entry to append to the status history audit trail"),
  }),
  execute: async ({ clipId, status, scheduledFor, postedAt, statusHistoryEntry }) => {
    const patch: Parameters<typeof patchClip>[1] = {};

    if (status) patch.status = status;
    if (scheduledFor) patch.scheduledFor = scheduledFor;
    if (postedAt) patch.postedAt = postedAt;
    if (statusHistoryEntry) {
      patch.statusHistory = [
        { ...statusHistoryEntry, timestamp: new Date().toISOString() },
      ];
    }

    const updated = patchClip(clipId, patch);
    if (!updated) {
      return { error: `Clip ${clipId} not found.` };
    }
    return { clip: updated };
  },
});
