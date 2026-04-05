"use client";

import { PanelLeftIcon } from "lucide-react";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useOpusAccount } from "@/hooks/use-opus-account";
import { getAccountById } from "@/lib/opus/data";
import { cn } from "@/lib/utils";
import { VisibilitySelector, type VisibilityType } from "./visibility-selector";

const ACCOUNT_DOT_COLORS: Record<string, string> = {
  lewis: "bg-blue-500",
  grant: "bg-orange-500",
  apex: "bg-purple-500",
};

function PureChatHeader({
  chatId,
  selectedVisibilityType,
  isReadonly,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const { activeAccount } = useOpusAccount();
  const account = getAccountById(activeAccount);

  if (state === "collapsed" && !isMobile) {
    return null;
  }

  return (
    <header className="sticky top-0 flex h-14 items-center gap-2 bg-sidebar px-3 border-b border-sidebar-border/50">
      <Button
        className="md:hidden"
        onClick={toggleSidebar}
        size="icon-sm"
        variant="ghost"
      >
        <PanelLeftIcon className="size-4" />
      </Button>

      {/* Active account badge */}
      {account && (
        <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent/60 px-2.5 py-1.5">
          <div
            className={cn(
              "size-2 rounded-full",
              ACCOUNT_DOT_COLORS[activeAccount]
            )}
          />
          <span className="text-[12px] font-medium text-sidebar-foreground">
            {account.name}
          </span>
          <span className="hidden sm:inline text-[11px] text-sidebar-foreground/50">
            {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
          </span>
          <span className="hidden sm:inline text-[11px] text-sidebar-foreground/40">
            ·
          </span>
          <span className="hidden sm:inline text-[11px] text-sidebar-foreground/50">
            KPI: {account.primaryKPI}
          </span>
          <span className="hidden md:inline text-[11px] text-sidebar-foreground/40">
            ·
          </span>
          <span className="hidden md:inline text-[11px] text-sidebar-foreground/50">
            {account.approvalWorkflow}
          </span>
        </div>
      )}

      {!isReadonly && (
        <VisibilitySelector
          chatId={chatId}
          selectedVisibilityType={selectedVisibilityType}
        />
      )}

      {/* OpusClip branding */}
      <div className="ml-auto hidden md:flex items-center gap-1.5">
        <div className="size-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
        <span className="text-[12px] font-semibold text-sidebar-foreground/70">
          Opus Intelligence
        </span>
        <span className="text-[11px] text-sidebar-foreground/40">· Demo</span>
      </div>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return (
    prevProps.chatId === nextProps.chatId &&
    prevProps.selectedVisibilityType === nextProps.selectedVisibilityType &&
    prevProps.isReadonly === nextProps.isReadonly
  );
});
