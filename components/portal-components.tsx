"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle, ArrowRight, BookOpen, Boxes, CheckCircle2, ChevronRight,
  ClipboardList, Database, FileQuestion, GraduationCap, Search, Server,
  Shield, Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { AuditLog, Category, Standard } from "@/lib/types";
import { cn, excerpt, formatDateID } from "@/lib/utils";

export function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: string; actions?: React.ReactNode }) {
  return <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
    <div>{eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-[.08em] text-[#0261a2]">{eyebrow}</p> : null}<h1 className="font-heading text-3xl font-bold leading-tight text-[#00295a] md:text-4xl">{title}</h1>{description ? <p className="mt-2 max-w-3xl text-base leading-7 text-[#434750]">{description}</p> : null}</div>
    {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
  </div>;
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1 text-sm text-[#434750]">{items.map((item, index) => <span key={`${item.label}-${index}`} className="flex items-center gap-1">{index ? <ChevronRight className="size-4" /> : null}{item.href ? <Link className="hover:text-[#013f82] hover:underline" href={item.href}>{item.label}</Link> : <span className="font-semibold text-[#191c1e]">{item.label}</span>}</span>)}</nav>;
}

export function GlobalSearch({ initialValue = "", large = false }: { initialValue?: string; large?: boolean }) {
  const router = useRouter();
  return <form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); router.push(`/standar?q=${encodeURIComponent(String(form.get("q") || ""))}`); }} className="relative w-full">
    <Search className={cn("absolute left-4 top-1/2 -translate-y-1/2 text-[#737782]", large ? "size-6" : "size-5")} />
    <Input name="q" defaultValue={initialValue} placeholder="Cari nama standar, kategori, perangkat, atau spesifikasi..." className={cn("pl-12", large && "h-14 text-base")} aria-label="Cari standar" />
  </form>;
}

const icons = { standards: ClipboardList, categories: Boxes, roles: GraduationCap, obsolete: AlertCircle };
export function StatCard({ label, value, type, note }: { label: string; value: number | string; type: keyof typeof icons; note: string }) {
  const Icon = icons[type];
  return <div className="rounded-xl border border-[#d8dadd] bg-white p-5 shadow-[0_4px_12px_rgba(1,63,130,.05)]"><div className="flex items-start justify-between gap-3"><p className="text-sm font-semibold text-[#434750]">{label}</p><span className={cn("grid size-10 place-items-center rounded-full", type === "obsolete" ? "bg-[#ffdad6] text-[#ba1a1a]" : "bg-[#d7e7fb] text-[#013f82]")}><Icon className="size-5" /></span></div><p className="mt-3 font-heading text-3xl font-bold text-[#00295a]">{value}</p><p className="mt-1 text-xs text-[#737782]">{note}</p></div>;
}

const categoryIcons = { server: Server, code: BookOpen, laptop: ClipboardList, network: Wifi, shield: Shield, database: Database, graduation: GraduationCap };
export function CategoryCard({ category, count }: { category: Category; count: number }) {
  const Icon = categoryIcons[category.icon as keyof typeof categoryIcons] || Boxes;
  return <Link href={`/standar?kategori=${category.slug}`} className="group flex min-h-[168px] flex-col rounded-xl border border-[#d8dadd] bg-white p-5 shadow-[0_4px_12px_rgba(1,63,130,.04)] transition hover:-translate-y-0.5 hover:border-[#76b8fe] hover:shadow-[0_8px_18px_rgba(1,63,130,.08)]">
    <div className="flex items-start justify-between gap-3"><span className="grid size-11 place-items-center rounded-lg bg-[#eaf3fb] text-[#013f82]"><Icon className="size-5" /></span><ArrowRight className="size-5 text-[#737782] transition group-hover:translate-x-1 group-hover:text-[#013f82]" /></div>
    <h3 className="mt-4 font-heading text-lg font-semibold text-[#00295a]">{category.name}</h3><p className="mt-1 line-clamp-2 text-sm leading-5 text-[#434750]">{category.description}</p><p className="mt-auto pt-3 text-xs font-semibold text-[#0261a2]">{count} standar</p>
  </Link>;
}

export function MinimumRecommendationComparison({ standard, compact = false, modern = false }: { standard: Standard; compact?: boolean; modern?: boolean }) {
  const details = compact ? standard.details.slice(0, 3) : standard.details;
  const hasRecommendation = details.some((detail) => detail.recommendedValue);
  if (!compact) return <div className={cn("overflow-x-auto border border-[#dfe3e7] bg-white", modern && "rounded-md shadow-[0_4px_18px_rgba(15,34,52,.06)]")}><table className="w-full min-w-[720px] text-left text-sm">
    <thead className={cn("text-xs font-bold uppercase", modern ? "sticky top-0 z-10 bg-[#002b52] text-white" : "bg-[#edf1f4] text-[#596570]")}><tr><th className="w-20 px-5 py-4">No</th><th className="w-64 px-5 py-4">Item</th><th className="px-5 py-4">Value</th></tr></thead>
    <tbody>{details.map((detail, index) => { const values = detail.minimumValue.split(";").map((value) => value.trim()).filter(Boolean); return <tr key={detail.id} className={cn("border-t border-[#dfe3e7] align-top", modern && index % 2 === 1 && "bg-[#f7f9fb]")}>
      <td className={cn("px-5 font-bold text-[#0b548d]", modern ? "py-3.5" : "py-4")}>{index + 1}</td>
      <td className={cn("px-5 font-semibold text-[#44515d]", modern ? "border-x border-[#dfe3e7] bg-[#eef3f7] py-3.5" : "bg-[#f7f8fa] py-4")}>{detail.label}</td>
      <td className={cn("px-5", modern ? "py-3.5" : "py-4")}>{modern && values.length > 1 ? <ul className="grid gap-1.5 font-medium leading-6 text-[#17202a]">{values.map((value) => <li key={value} className="grid grid-cols-[8px_1fr] gap-2"><span className="mt-2.5 size-1.5 rounded-full bg-[#0b548d]" /><span>{value}</span></li>)}</ul> : <p className="font-semibold leading-7 text-[#17202a]">{detail.minimumValue}</p>}{detail.recommendedValue ? <p className="mt-2 border-l-2 border-[#0b548d] pl-3 text-sm leading-6 text-[#4f5b66]"><span className="font-semibold text-[#0b548d]">Rekomendasi:</span> {detail.recommendedValue}</p> : null}{detail.notes ? <p className="mt-2 text-sm leading-6 text-[#6a747e]">{detail.notes}</p> : null}</td>
    </tr>; })}</tbody>
  </table></div>;
  return <div className={cn("grid gap-3", hasRecommendation && "md:grid-cols-2")}>
    <div className="rounded-lg border border-[#d8dadd] bg-[#f7f9fc] p-4"><p className="mb-3 flex items-center gap-2 text-sm font-semibold"><CheckCircle2 className="size-4 text-[#013f82]" />Ketentuan dalam dokumen</p><div className="grid gap-2">{details.map((detail) => <div key={detail.id} className="grid gap-1 border-b border-[#e0e3e6] pb-2 text-sm last:border-0 last:pb-0"><span className="text-[#434750]">{detail.label}</span><strong className="font-semibold leading-5 text-[#191c1e]">{detail.minimumValue}</strong>{detail.notes ? <span className="text-xs text-[#737782]">{detail.notes}</span> : null}</div>)}</div></div>
    {hasRecommendation ? <div className="rounded-lg border border-[#b9d5f6] bg-[#eef5ff] p-4"><p className="mb-3 text-sm font-semibold text-[#013f82]">Spesifikasi rekomendasi</p>{details.map((detail) => detail.recommendedValue ? <div key={detail.id} className="mb-2 border-b border-[#d7e7fb] pb-2 text-sm"><span className="text-[#434750]">{detail.label}</span><strong className="block text-[#00295a]">{detail.recommendedValue}</strong></div> : null)}</div> : null}
  </div>;
}

export function StandardCard({ standard, category }: { standard: Standard; category?: Category }) {
  return <article className="flex flex-col overflow-hidden rounded-xl border border-[#d8dadd] bg-white shadow-[0_4px_12px_rgba(1,63,130,.04)]">
    <div className="border-b border-[#d8dadd] p-5"><div className="mb-3 flex items-start justify-between gap-3"><span className="text-xs font-bold uppercase tracking-[.08em] text-[#0261a2]">{category?.name}</span><StatusBadge status={standard.status} /></div><h2 className="font-heading text-xl font-semibold text-[#191c1e]">{standard.name}</h2></div>
    <div className="flex-1 p-5"><MinimumRecommendationComparison standard={standard} compact /></div>
    <div className="px-5 pb-5"><Link href={`/standar/${standard.slug}`} className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#00295a] text-sm font-semibold text-[#00295a] hover:bg-[#eaf3fb]">Lihat Detail Lengkap <ArrowRight className="size-4" /></Link></div>
  </article>;
}

export function StandardsTable({ standards, categories }: { standards: Standard[]; categories: Category[] }) {
  return <div className="overflow-x-auto rounded-xl border border-[#d8dadd] bg-white"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-[#f2f4f7] text-xs uppercase tracking-[.05em] text-[#434750]"><tr><th className="px-4 py-3">Nomor</th><th className="px-4 py-3">Nama Standar</th><th className="px-4 py-3">Kategori</th><th className="px-4 py-3">Versi</th><th className="px-4 py-3">Tanggal</th><th className="px-4 py-3">Status</th></tr></thead><tbody>{standards.map((standard, index) => <tr key={standard.id} className="border-t border-[#e0e3e6] hover:bg-[#f7fbff]"><td className="px-4 py-3 font-semibold text-[#0261a2]">{index + 1}</td><td className="px-4 py-3"><Link className="font-semibold text-[#191c1e] hover:text-[#013f82] hover:underline" href={`/standar/${standard.slug}`}>{standard.name}</Link></td><td className="px-4 py-3 text-[#434750]">{categories.find((category) => category.id === standard.categoryId)?.name}</td><td className="px-4 py-3">{standard.version}</td><td className="px-4 py-3 text-[#434750]">{formatDateID(standard.updatedAt)}</td><td className="px-4 py-3"><StatusBadge status={standard.status} /></td></tr>)}</tbody></table></div>;
}

export function FilterPanel({ children }: { children: React.ReactNode }) {
  return <div className="mb-6 rounded-xl border border-[#d8dadd] bg-white p-4 shadow-[0_4px_12px_rgba(1,63,130,.04)]">{children}</div>;
}

export function Pagination({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (page: number) => void }) {
  if (totalPages <= 1) return null;
  return <nav className="mt-6 flex items-center justify-center gap-2" aria-label="Paginasi"><Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPage(page - 1)}>Sebelumnya</Button><span className="px-3 text-sm text-[#434750]">Halaman {page} dari {totalPages}</span><Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>Berikutnya</Button></nav>;
}

export function EmptyState({ title = "Data tidak ditemukan", description = "Coba ubah kata kunci atau filter yang digunakan." }: { title?: string; description?: string }) {
  return <div className="grid min-h-64 place-items-center rounded-xl border border-dashed border-[#c3c6d2] bg-white p-8 text-center"><div><FileQuestion className="mx-auto size-10 text-[#737782]" /><h3 className="mt-3 font-heading text-lg font-semibold text-[#00295a]">{title}</h3><p className="mt-1 text-sm text-[#434750]">{description}</p></div></div>;
}

export function LoadingSkeleton() {
  return <div className="grid animate-pulse gap-4 md:grid-cols-2"><div className="h-64 rounded-xl bg-[#e6e8eb]" /><div className="h-64 rounded-xl bg-[#e6e8eb]" /></div>;
}

export function ErrorState({ message }: { message: string }) {
  return <div className="flex items-center gap-3 rounded-lg border border-[#ffb4ab] bg-[#ffdad6] p-4 text-sm text-[#93000a]"><AlertCircle className="size-5 shrink-0" />{message}</div>;
}

export function AuditLogTable({ logs }: { logs: AuditLog[] }) {
  return <div className="overflow-x-auto rounded-xl border border-[#d8dadd] bg-white"><table className="w-full min-w-[820px] text-left text-sm"><thead className="bg-[#f2f4f7]"><tr><th className="px-4 py-3">Waktu</th><th className="px-4 py-3">Admin</th><th className="px-4 py-3">Entitas</th><th className="px-4 py-3">Aksi</th><th className="px-4 py-3">Data</th></tr></thead><tbody>{logs.map((log) => <tr key={log.id} className="border-t border-[#e0e3e6]"><td className="px-4 py-3 text-[#434750]">{new Date(log.createdAt).toLocaleString("id-ID")}</td><td className="px-4 py-3">{log.user}</td><td className="px-4 py-3"><strong>{log.entityName}</strong><span className="block text-xs text-[#737782]">{log.entityType}</span></td><td className="px-4 py-3"><Badge>{log.action}</Badge></td><td className="max-w-xs px-4 py-3 text-xs text-[#434750]">{excerpt(JSON.stringify(log.newData ?? log.oldData ?? {}), 100)}</td></tr>)}</tbody></table></div>;
}
