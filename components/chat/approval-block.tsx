"use client";

import { AlertTriangleIcon, CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useActiveChat } from "@/hooks/use-active-chat";
import type { OpusClip } from "@/lib/opus/data";
import { cn } from "@/lib/utils";

type ApprovalBlockProps = {
  clip: OpusClip;
  approvalType: "single" | "editor" | "admin";
  stage: number;
  scheduledFor?: string;
  platform?: string;
  context?: string;
  requestedAt: string;
};

const APPROVAL_LABELS: Record<string, { title: string; actor: string }> = {
  single: { title: "Awaiting Approver Sign-off", actor: "Approver" },
  editor: { title: "Awaiting Editor Review (Stage 1 of 2)", actor: "Editor" },
  admin: { title: "Awaiting Admin Approval (Stage 2 of 2)", actor: "Admin" },
};

export function ApprovalBlock({
  clip,
  approvalType,
  stage,
  scheduledFor,
  platform,
  context,
  requestedAt,
}: ApprovalBlockProps) {
  const { sendMessage } = useActiveChat();
  const [decided, setDecided] = useState<"approved" | "rejected" | null>(null);
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const label = APPROVAL_LABELS[approvalType] ?? APPROVAL_LABELS.single;

  const handleApprove = () => {
    setDecided("approved");
    const ts = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    sendMessage({
      role: "user",
      parts: [
        {
          type: "text",
          text: `[APPROVAL DECISION — ${ts}] ClipID ${clip.id} "${clip.title}" — APPROVED by ${label.actor}.${scheduledFor ? ` Proceed with scheduling for ${scheduledFor}${platform ? ` on ${platform}` : ""}.` : ""}`,
        },
      ],
    });
  };

  const handleReject = () => {
    if (!rejectReason.trim()) return;
    setDecided("rejected");
    const ts = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    sendMessage({
      role: "user",
      parts: [
        {
          type: "text",
          text: `[APPROVAL DECISION — ${ts}] ClipID ${clip.id} "${clip.title}" — REJECTED by ${label.actor}. Reason: ${rejectReason}. Please return this clip to Draft with this reason logged and ask how to proceed.`,
        },
      ],
    });
  };

  if (decided === "approved") {
    return (
      <div className="w-full rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 flex items-center gap-3">
        <CheckIcon className="size-4 text-emerald-500 shrink-0" />
        <div>
          <p className="text-[13px] font-medium text-emerald-700 dark:text-emerald-300">
            ClipID {clip.id} approved
          </p>
          <p className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80">
            Decision sent to agent
          </p>
        </div>
      </div>
    );
  }

  if (decided === "rejected") {
    return (
      <div className="w-full rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 flex items-center gap-3">
        <XIcon className="size-4 text-red-500 shrink-0" />
        <div>
          <p className="text-[13px] font-medium text-red-700 dark:text-red-300">
            ClipID {clip.id} rejected
          </p>
          <p className="text-[11px] text-red-600/80 dark:text-red-400/80">
            Returned to Draft · Reason logged
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-amber-500/40 bg-amber-500/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-amber-500/20">
        <AlertTriangleIcon className="size-4 text-amber-500 shrink-0" />
        <span className="text-[13px] font-semibold text-amber-700 dark:text-amber-300">
          {label.title}
        </span>
        {stage > 1 && (
          <span className="ml-auto rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 dark:text-amber-300">
            Stage {stage}
          </span>
        )}
      </div>

      {/* Clip info */}
      <div className="px-4 py-3 space-y-1.5">
        <div className="flex items-baseline gap-2">
          <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
            ClipID {clip.id}
          </span>
          <span className="text-[13px] font-semibold text-foreground">
            {clip.title}
          </span>
        </div>
        <div className="flex flex-wrap gap-3 text-[12px] text-muted-foreground">
          <span>{clip.timecode} · {clip.duration}</span>
          {platform && <span>→ {platform}</span>}
          {scheduledFor && (
            <span className="font-medium text-foreground">
              Scheduled: {scheduledFor}
            </span>
          )}
        </div>
        {clip.predictedRevenue && (
          <div className="text-[12px] font-medium text-emerald-600 dark:text-emerald-400">
            Predicted revenue: {clip.predictedRevenue}
          </div>
        )}
        {clip.predictedViews && (
          <div className="text-[12px] text-muted-foreground">
            Predicted views: {clip.predictedViews}
          </div>
        )}
        {context && (
          <p className="text-[12px] text-muted-foreground italic">{context}</p>
        )}
        <div className="text-[10px] text-muted-foreground/60">
          Requested {new Date(requestedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {/* Reject reason input */}
      {showRejectInput && (
        <div className="px-4 pb-3">
          <textarea
            autoFocus
            className={cn(
              "w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-[12px] text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            )}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Reason for rejection (e.g. hook needs to open on the close, not the setup)"
            rows={2}
            value={rejectReason}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-amber-500/20">
        {!showRejectInput ? (
          <>
            <Button
              className="h-8 flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px]"
              onClick={handleApprove}
              size="sm"
            >
              <CheckIcon className="size-3.5 mr-1.5" />
              Approve
            </Button>
            <Button
              className="h-8 flex-1 text-[12px]"
              onClick={() => setShowRejectInput(true)}
              size="sm"
              variant="outline"
            >
              <XIcon className="size-3.5 mr-1.5" />
              Reject
            </Button>
          </>
        ) : (
          <>
            <Button
              className="h-8 flex-1 bg-red-600 hover:bg-red-700 text-white text-[12px]"
              disabled={!rejectReason.trim()}
              onClick={handleReject}
              size="sm"
            >
              <XIcon className="size-3.5 mr-1.5" />
              Submit Rejection
            </Button>
            <Button
              className="h-8 text-[12px]"
              onClick={() => {
                setShowRejectInput(false);
                setRejectReason("");
              }}
              size="sm"
              variant="ghost"
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
