import { Archive, CheckCircle2, Clock3, FileEdit } from "lucide-react";
import type { StandardStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const config = {
  berlaku: { label: "Berlaku", icon: CheckCircle2, className: "bg-[#e5f5eb] text-[#126b36] border-[#b8e4c7]" },
  draft: { label: "Draft", icon: FileEdit, className: "bg-[#eceef1] text-[#434750] border-[#d8dadd]" },
  ditinjau: { label: "Perlu ditinjau", icon: Clock3, className: "bg-[#fff4d8] text-[#7a4d00] border-[#f6d88c]" },
  arsip: { label: "Arsip", icon: Archive, className: "bg-[#ffdad6] text-[#93000a] border-[#ffb4ab]" },
};

export function StatusBadge({ status }: { status: StandardStatus }) {
  const item = config[status];
  const Icon = item.icon;
  return <span className={cn("inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold", item.className)}><Icon className="size-3.5" />{item.label}</span>;
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-full border border-[#b9c9dd] bg-[#eaf3fb] px-2.5 py-1 text-xs font-medium text-[#00487a]", className)}>{children}</span>;
}
