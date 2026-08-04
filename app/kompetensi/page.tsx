"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { usePortal } from "@/components/providers/portal-provider";
import { EmptyState, PageHeader } from "@/components/portal-components";
import { Badge } from "@/components/ui/badge";
import { Input, Select } from "@/components/ui/input";

export default function CompetenciesPage() {
  const { state } = usePortal();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("");
  const roles = useMemo(() => state.roles.filter((role) => role.isActive && (!query || `${role.name} ${role.tags.join(" ")} ${role.competencies.map((item) => item.description).join(" ")}`.toLowerCase().includes(query.toLowerCase())) && (!group || role.competencies.some((item) => item.group === group))), [group, query, state.roles]);
  const groups = Array.from(new Set(state.roles.flatMap((role) => role.competencies.map((item) => item.group))));
  return <AppShell><PageHeader eyebrow="Sumber Daya Manusia" title="Standar Kompetensi TI" description="Seluruh 14 role dan setiap butir kompetensinya ditampilkan sesuai urutan dokumen sumber." />
    <div className="mb-6 grid gap-3 rounded-xl border border-[#d8dadd] bg-white p-4 md:grid-cols-[1fr_280px]"><div className="relative"><Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[#737782]" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari role, teknologi, atau kompetensi..." className="pl-10" /></div><Select value={group} onChange={(event) => setGroup(event.target.value)}><option value="">Semua kelompok</option>{groups.map((item) => <option key={item}>{item}</option>)}</Select></div>
    {roles.length === 0 ? <EmptyState title="Role tidak ditemukan" /> : <div className="grid items-start gap-5 xl:grid-cols-2">{roles.map((role, index) => <article key={role.id} className="overflow-hidden rounded-xl border border-[#d8dadd] bg-white"><div className="border-b border-[#d8dadd] p-5"><div className="flex items-start justify-between gap-3"><div><span className="text-xs font-bold text-[#0261a2]">Role {index + 1}</span><h2 className="mt-1 font-heading text-xl font-semibold text-[#191c1e]">{role.name}</h2></div><Badge>{role.level}</Badge></div><div className="mt-3 flex flex-wrap gap-2">{role.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div></div><div className="p-5"><ol className="grid gap-3">{role.competencies.slice(0, 5).map((item) => <li key={item.id} className="flex gap-3 text-sm leading-6 text-[#434750]"><CheckCircle2 className="mt-1 size-4 shrink-0 text-[#0261a2]" /><span>{item.description}</span></li>)}</ol>{role.competencies.length > 5 ? <p className="mt-3 text-xs text-[#737782]">+{role.competencies.length - 5} butir kompetensi lainnya</p> : null}<Link href={`/kompetensi/${role.slug}`} className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#00295a] text-sm font-semibold text-[#00295a] hover:bg-[#eaf3fb]">Lihat Detail Lengkap <ArrowRight className="size-4" /></Link></div></article>)}</div>}
  </AppShell>;
}
