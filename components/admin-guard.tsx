"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePortal } from "@/components/providers/portal-provider";
import { LoadingSkeleton } from "@/components/portal-components";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin, ready } = usePortal();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (ready && !isAdmin) router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [isAdmin, pathname, ready, router]);
  if (!ready || !isAdmin) return <div className="mx-auto max-w-4xl p-8"><LoadingSkeleton /></div>;
  return <>{children}</>;
}
