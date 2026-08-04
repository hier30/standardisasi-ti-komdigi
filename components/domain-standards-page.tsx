"use client";

import Link from "next/link";
import { ArrowRight, FileText, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { usePortal } from "@/components/providers/portal-provider";
import { EmptyState, PageHeader } from "@/components/portal-components";
import { StatusBadge } from "@/components/ui/badge";
import { Input, Select } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const groupColorClasses = [
  "border-[#b8d7f0] bg-[#e8f3fb] text-[#07528f]",
  "border-[#b9dfc4] bg-[#e9f7ed] text-[#21663a]",
  "border-[#d8c7ee] bg-[#f2ebfa] text-[#68418d]",
  "border-[#ead49f] bg-[#fff5d9] text-[#7a5912]",
  "border-[#efc3c5] bg-[#fdecee] text-[#9b3038]",
  "border-[#b8dfdc] bg-[#e7f7f5] text-[#176a64]",
  "border-[#cbd2d8] bg-[#eef1f3] text-[#4d5964]",
];

export function DomainStandardsPage({ categorySlug, title, description, section, modern = false }: { categorySlug: string; title: string; description: string; section: string; modern?: boolean }) {
  const { state } = usePortal();
  const [query, setQuery] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const category = state.categories.find((item) => item.slug === categorySlug);
  const subcategories = state.subcategories.filter((item) => item.categoryId === category?.id && item.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
  const standards = useMemo(() => state.standards.filter((standard) => {
    if (standard.categoryId !== category?.id || !standard.isPublished || standard.status !== "berlaku") return false;
    const searchable = `${standard.name} ${standard.sourceNumber} ${standard.description} ${standard.details.map((detail) => `${detail.label} ${detail.minimumValue}`).join(" ")}`.toLowerCase();
    return (!query || searchable.includes(query.toLowerCase())) && (!subcategoryId || standard.subcategoryId === subcategoryId);
  }).sort((a, b) => a.sortOrder - b.sortOrder), [category?.id, query, state.standards, subcategoryId]);

  return <AppShell>
    <PageHeader eyebrow={section} title={title} description={description} actions={<div className="min-w-36 rounded-md bg-[#002b52] px-5 py-3 text-white"><span className="block text-xs text-white/70">Total Standar</span><strong className="font-heading text-2xl">{standards.length}</strong></div>} />
    <div className="mb-5 grid gap-3 border-y border-[#dfe3e7] bg-white px-4 py-4 md:grid-cols-[minmax(260px,1fr)_280px]">
      <div className="relative"><Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[#7b8590]" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Cari standar ${title.toLowerCase()}...`} className="pl-10" aria-label={`Cari ${title}`} /></div>
      <Select value={subcategoryId} onChange={(event) => setSubcategoryId(event.target.value)} aria-label="Filter kelompok standar"><option value="">Semua kelompok</option>{subcategories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Select>
    </div>

    {standards.length === 0 ? <EmptyState /> : <div className={cn("overflow-x-auto border border-[#dfe3e7] bg-white", modern && "rounded-md shadow-[0_4px_18px_rgba(15,34,52,.06)]")}>
      <table className="w-full min-w-[920px] text-left text-sm">
        <thead className={cn("text-xs font-bold uppercase", modern ? "sticky top-0 z-10 bg-[#002b52] text-white" : "bg-[#edf1f4] text-[#596570]")}><tr><th className="w-20 px-4 py-3">Nomor</th><th className="px-4 py-3">Nama Standar</th><th className="w-48 px-4 py-3">Kelompok</th><th className="px-4 py-3">Ringkasan Ketentuan</th><th className="w-28 px-4 py-3">Status</th><th className="w-16 px-4 py-3"><span className="sr-only">Aksi</span></th></tr></thead>
        <tbody>{standards.map((standard, index) => <tr key={standard.id} className={cn("border-t border-[#e2e5e8] align-top transition hover:bg-[#edf6fc]", modern && index % 2 === 1 && "bg-[#f7f9fb]")}>
          <td className={cn("px-4 font-bold text-[#0b548d]", modern ? "py-3" : "py-4")}>{index + 1}</td>
          <td className={cn("px-4", modern ? "py-3" : "py-4")}><Link href={`/standar/${standard.slug}`} className="font-heading font-bold text-[#17202a] hover:text-[#0b548d] hover:underline">{standard.name}</Link><p className="mt-1 line-clamp-2 text-xs leading-5 text-[#6a747e]">{standard.description}</p></td>
          <td className={cn("px-4 text-[#4f5b66]", modern ? "py-3" : "py-4")}>{(() => { const foundIndex = subcategories.findIndex((item) => item.id === standard.subcategoryId); const groupIndex = Math.max(0, foundIndex); const groupName = foundIndex >= 0 ? subcategories[foundIndex].name : "-"; return <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-semibold", groupColorClasses[groupIndex % groupColorClasses.length])}>{groupName}</span>; })()}</td>
          <td className={cn("px-4", modern ? "py-3" : "py-4")}>{modern ? <ul className="grid gap-1.5 text-[#4f5b66]">{standard.details.slice(0, 2).map((detail) => <li key={detail.id} className="grid grid-cols-[8px_1fr] gap-2 leading-5"><span className="mt-2 size-1.5 rounded-full bg-[#0b548d]" /><span><strong className="font-semibold text-[#34414d]">{detail.label}:</strong> {detail.minimumValue}</span></li>)}</ul> : <div className="flex gap-2"><FileText className="mt-0.5 size-4 shrink-0 text-[#0b548d]" /><span className="line-clamp-3 leading-5 text-[#4f5b66]">{standard.details.slice(0, 2).map((detail) => `${detail.label}: ${detail.minimumValue}`).join("; ")}</span></div>}</td>
          <td className={cn("px-4", modern ? "py-3" : "py-4")}><StatusBadge status={standard.status} /></td>
          <td className={cn("px-4", modern ? "py-3" : "py-4")}><Link href={`/standar/${standard.slug}`} className="grid size-9 place-items-center rounded-md text-[#0b548d] hover:bg-[#dbeaf5]" aria-label={`Lihat ${standard.name}`} title="Lihat detail"><ArrowRight className="size-4" /></Link></td>
        </tr>)}</tbody>
      </table>
    </div>}
  </AppShell>;
}
