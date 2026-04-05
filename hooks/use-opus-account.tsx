"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import type { AccountId } from "@/lib/opus/data";

type OpusAccountContextValue = {
  activeAccount: AccountId;
  setActiveAccount: Dispatch<SetStateAction<AccountId>>;
};

const OpusAccountContext = createContext<OpusAccountContextValue | null>(null);

const STORAGE_KEY = "opus-active-account";

export function OpusAccountProvider({ children }: { children: ReactNode }) {
  const [activeAccount, setActiveAccount] = useState<AccountId>("lewis");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as AccountId | null;
    if (stored && ["lewis", "grant", "apex"].includes(stored)) {
      setActiveAccount(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeAccount);
  }, [activeAccount]);

  return (
    <OpusAccountContext.Provider value={{ activeAccount, setActiveAccount }}>
      {children}
    </OpusAccountContext.Provider>
  );
}

export function useOpusAccount() {
  const context = useContext(OpusAccountContext);
  if (!context) {
    throw new Error("useOpusAccount must be used within OpusAccountProvider");
  }
  return context;
}
