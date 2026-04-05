"use client";

import { useOpusAccount } from "@/hooks/use-opus-account";
import { getClipsByAccount, type ClipStatus } from "@/lib/opus/data";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<ClipStatus, string> = {
  Ready: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  Draft: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Approved: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  Posted: "bg-muted text-muted-foreground",
};

export function OpusClipLibrary() {
  const { activeAccount } = useOpusAccount();
  const clips = getClipsByAccount(activeAccount);

  if (activeAccount === "apex") {
    return (
      <div className="px-2 pb-2">
        <div className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
          Clip Library
        </div>
        <div className="rounded-lg border border-sidebar-border/50 px-3 py-2.5">
          <p className="text-[11px] text-sidebar-foreground/50 leading-relaxed">
            Apex manages clips via bulk workflow. Ask the agent to surface clips
            across your roster.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 pb-2">
      <div className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
        Clip Library
      </div>
      <div className="flex flex-col gap-1">
        {clips.map((clip) => (
          <div
            className="rounded-lg border border-sidebar-border/50 px-2.5 py-2 hover:bg-sidebar-accent/30 transition-colors"
            key={clip.id}
          >
            <div className="flex items-start justify-between gap-1 mb-0.5">
              <span className="text-[11px] font-medium text-sidebar-foreground leading-tight truncate">
                {clip.title}
              </span>
              <span
                className={cn(
                  "shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-semibold",
                  STATUS_STYLES[clip.status]
                )}
              >
                {clip.status}
              </span>
            </div>
            <div className="text-[10px] text-sidebar-foreground/50">
              {clip.timecode} · {clip.duration}
            </div>
            {clip.predictedViews && (
              <div className="text-[10px] text-sidebar-foreground/50">
                ~{clip.predictedViews} views
              </div>
            )}
            {clip.actualViews && (
              <div className="text-[10px] text-sidebar-foreground/50">
                {clip.actualViews} actual views
              </div>
            )}
            {clip.predictedRevenue && (
              <div className="text-[10px] text-sidebar-foreground/50">
                {clip.predictedRevenue} predicted revenue
              </div>
            )}
            <div className="text-[9px] text-sidebar-foreground/40 mt-0.5">
              ClipID {clip.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
