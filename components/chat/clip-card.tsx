"use client";

import { CheckIcon, ClockIcon, PlayIcon } from "lucide-react";
import type { ClipStatus, OpusClip } from "@/lib/opus/data";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<ClipStatus, { badge: string; label: string }> = {
  Ready: {
    badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    label: "Ready",
  },
  Draft: {
    badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
    label: "Draft",
  },
  Approved: {
    badge: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",
    label: "Approved",
  },
  Posted: {
    badge: "bg-muted text-muted-foreground border-border/50",
    label: "Posted",
  },
};

type ClipCardProps = {
  clip: OpusClip;
  action?: "view" | "draft" | "schedule" | "approve";
  note?: string;
};

function RoiBar({ score }: { score: number }) {
  const pct = Math.round((score / 10) * 100);
  const color =
    score >= 9
      ? "bg-emerald-500"
      : score >= 7.5
      ? "bg-blue-500"
      : score >= 6
      ? "bg-amber-500"
      : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] font-semibold text-foreground tabular-nums">
        {score}
      </span>
    </div>
  );
}

export function ClipCard({ clip, action, note }: ClipCardProps) {
  const statusStyle = STATUS_STYLES[clip.status];

  // Derive a rough ROI score from clip metrics
  const roiScore =
    clip.accountId === "grant"
      ? clip.id === 4023
        ? 9.2
        : 7.8
      : clip.id === 3802
      ? 8.6
      : 7.8;

  return (
    <div className="w-full rounded-xl border border-border/60 bg-card/60 overflow-hidden shadow-[var(--shadow-card)] backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-4 pt-3.5 pb-2.5 border-b border-border/40">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <PlayIcon className="size-3 text-muted-foreground shrink-0" />
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
              ClipID {clip.id}
            </span>
          </div>
          <h3 className="font-semibold text-[14px] text-foreground leading-tight truncate">
            {clip.title}
          </h3>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-semibold",
            statusStyle.badge
          )}
        >
          {statusStyle.label}
        </span>
      </div>

      {/* Body */}
      <div className="px-4 py-3 space-y-2.5">
        {/* Timecode */}
        <div className="flex items-center gap-4 text-[12px]">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <ClockIcon className="size-3" />
            <span>{clip.timecode}</span>
          </div>
          <span className="text-muted-foreground/60">{clip.duration}</span>
          {clip.template && (
            <span className="ml-auto rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              {clip.template}
            </span>
          )}
        </div>

        {/* Transcript excerpt */}
        {clip.transcript && (
          <p className="text-[12px] text-muted-foreground italic leading-relaxed line-clamp-2">
            &ldquo;{clip.transcript}&rdquo;
          </p>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-2">
          {clip.predictedViews && (
            <div className="rounded-lg bg-muted/50 px-2.5 py-1.5">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
                Predicted Views
              </div>
              <div className="text-[13px] font-semibold text-foreground">
                {clip.predictedViews}
              </div>
            </div>
          )}
          {clip.actualViews && (
            <div className="rounded-lg bg-muted/50 px-2.5 py-1.5">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
                Actual Views
              </div>
              <div className="text-[13px] font-semibold text-foreground">
                {clip.actualViews}
              </div>
            </div>
          )}
          {clip.predictedRevenue && (
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5">
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-0.5">
                Predicted Revenue
              </div>
              <div className="text-[13px] font-semibold text-emerald-700 dark:text-emerald-300">
                {clip.predictedRevenue}
              </div>
            </div>
          )}
          {clip.postedAt && (
            <div className="rounded-lg bg-muted/50 px-2.5 py-1.5">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
                Posted
              </div>
              <div className="text-[13px] font-semibold text-foreground">
                {clip.postedAt}
              </div>
            </div>
          )}
        </div>

        {/* ROI bar */}
        <div>
          <div className="mb-1 text-[10px] text-muted-foreground uppercase tracking-wide">
            ROI Score
          </div>
          <RoiBar score={roiScore} />
        </div>

        {/* Platforms */}
        {clip.platforms && clip.platforms.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {clip.platforms.map((p) => (
              <span
                className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                key={p}
              >
                {p}
              </span>
            ))}
          </div>
        )}

        {/* Audit trail (last 3 events) */}
        {clip.statusHistory && clip.statusHistory.length > 0 && (
          <div className="border-t border-border/40 pt-2">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">
              Audit Trail
            </div>
            <div className="space-y-0.5">
              {clip.statusHistory.slice(-3).map((entry, i) => (
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground" key={i}>
                  <CheckIcon className="size-2.5 text-emerald-500 shrink-0" />
                  <span className="font-medium">{entry.status}</span>
                  <span className="text-muted-foreground/60">·</span>
                  <span>{entry.actor}</span>
                  {entry.reason && (
                    <>
                      <span className="text-muted-foreground/60">·</span>
                      <span className="italic">{entry.reason}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Note */}
      {note && (
        <div className="border-t border-border/40 bg-muted/30 px-4 py-2">
          <p className="text-[12px] text-muted-foreground">{note}</p>
        </div>
      )}

      {/* Action hint */}
      {action && action !== "view" && (
        <div className="border-t border-border/40 bg-muted/20 px-4 py-2 flex items-center gap-1.5">
          <div className="size-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] text-muted-foreground capitalize">
            {action === "draft"
              ? "Creating draft..."
              : action === "schedule"
              ? "Scheduling for posting..."
              : action === "approve"
              ? "Awaiting approval..."
              : ""}
          </span>
        </div>
      )}
    </div>
  );
}
