"use client";

import Link from "next/link";
import { ArrowRight, Search, Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { usePortal } from "@/components/providers/portal-provider";
import { EmptyState, PageHeader } from "@/components/portal-components";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";

export default function SdmPage() {
  const { state } = usePortal();
  const [query, setQuery] = useState("");
  const roles = useMemo(() => state.roles.filter((role) => role.isActive && (!query || `${role.name} ${role.competencies.map((item) => item.description).join(" ")}`.toLowerCase().includes(query.toLowerCase()))).sort((a, b) => a.sortOrder - b.sortOrder), [query, state.roles]);
  return <AppShell>
    <PageHeader eyebrow="Sumber Daya Manusia" title="Standar Kompetensi SDM" description="Daftar role teknologi informasi dan butir kompetensi yang dipersyaratkan dalam dokumen standardisasi." actions={<div className="min-w-36 rounded-md bg-[#064a22] px-5 py-3 text-white"><span className="block text-xs text-white/70">Total Role</span><strong className="font-heading text-2xl">{roles.length}</strong></div>} />
    <div className="mb-5 border-y border-[#dfe3e7] bg-white px-4 py-4"><div className="relative max-w-xl"><Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[#7b8590]" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari role atau kompetensi..." className="pl-10" aria-label="Cari role atau kompetensi" /></div></div>
    {roles.length === 0 ? <EmptyState title="Role tidak ditemukan" /> : <div className="overflow-x-auto border border-[#dfe3e7] bg-white"><table className="w-full min-w-[820px] text-left text-sm"><thead className="bg-[#edf1f4] text-xs font-bold uppercase text-[#596570]"><tr><th className="w-24 px-4 py-3">Nomor</th><th className="px-4 py-3">Role</th><th className="w-44 px-4 py-3">Tingkat</th><th className="w-48 px-4 py-3">Jumlah Kompetensi</th><th className="px-4 py-3">Cakupan</th><th className="w-16 px-4 py-3"><span className="sr-only">Aksi</span></th></tr></thead><tbody>{roles.map((role, index) => <tr key={role.id} className="border-t border-[#e2e5e8] hover:bg-[#f8fafb]"><td className="px-4 py-4 font-bold text-[#0b548d]">{index + 1}</td><td className="px-4 py-4"><Link href={`/kompetensi/${role.slug}`} className="font-heading font-bold text-[#17202a] hover:text-[#0b548d] hover:underline">{role.name}</Link></td><td className="px-4 py-4 text-[#4f5b66]">{role.level}</td><td className="px-4 py-4"><span className="inline-flex items-center gap-2"><Users className="size-4 text-[#0b548d]" />{role.competencies.length} butir</span></td><td className="px-4 py-4 text-[#4f5b66]">{role.competencies.slice(0, 2).map((item) => item.description).join("; ")}</td><td className="px-4 py-4"><Link href={`/kompetensi/${role.slug}`} className="grid size-9 place-items-center rounded-md text-[#0b548d] hover:bg-[#e5eff7]" aria-label={`Lihat ${role.name}`}><ArrowRight className="size-4" /></Link></td></tr>)}</tbody></table></div>}
  </AppShell>;
}
