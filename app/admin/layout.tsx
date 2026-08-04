import { AdminGuard } from "@/components/admin-guard";
import { AppShell } from "@/components/app-shell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminGuard><AppShell>{children}</AppShell></AdminGuard>;
}
