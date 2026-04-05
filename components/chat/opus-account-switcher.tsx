"use client";

import { useOpusAccount } from "@/hooks/use-opus-account";
import { OPUS_ACCOUNTS, type AccountId } from "@/lib/opus/data";
import { cn } from "@/lib/utils";

const ACCOUNT_COLORS: Record<AccountId, string> = {
  lewis: "bg-blue-500",
  grant: "bg-orange-500",
  apex: "bg-purple-500",
};

const ACCOUNT_INITIALS: Record<AccountId, string> = {
  lewis: "LH",
  grant: "GC",
  apex: "AM",
};

const TYPE_LABELS: Record<string, string> = {
  creator: "Creator",
  enterprise: "Enterprise",
  agency: "Agency",
};

export function OpusAccountSwitcher() {
  const { activeAccount, setActiveAccount } = useOpusAccount();

  return (
    <div className="px-2 pb-1">
      <div className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
        Accounts
      </div>
      <div className="flex flex-col gap-1">
        {OPUS_ACCOUNTS.map((account) => {
          const isActive = activeAccount === account.id;
          return (
            <button
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors duration-150",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
              key={account.id}
              onClick={() => setActiveAccount(account.id)}
              type="button"
            >
              <div
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-white",
                  ACCOUNT_COLORS[account.id]
                )}
              >
                {ACCOUNT_INITIALS[account.id]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12px] font-medium leading-tight">
                  {account.name}
                </div>
                <div className="text-[10px] text-sidebar-foreground/50">
                  {TYPE_LABELS[account.type]} · {account.primaryKPI}
                </div>
              </div>
              {isActive && (
                <div className="size-1.5 shrink-0 rounded-full bg-blue-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
