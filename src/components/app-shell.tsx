"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppNav } from "@/components/ds-pending/app-nav";
import { useLibrary } from "@/lib/library";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { ready } = useLibrary();

  return (
    <div className="flex min-h-full flex-1" data-ready={ready ? "true" : "false"}>
      <AppNav pathname={pathname} />
      <div className="flex min-w-0 flex-1 flex-col pb-20 md:pb-0 md:pl-64">
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
