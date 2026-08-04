"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Grid2X2, List, RotateCcw } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { usePortal } from "@/components/providers/portal-provider";
import { EmptyState, FilterPanel, LoadingSkeleton, PageHeader, Pagination, StandardCard, StandardsTable } from "@/components/portal-components";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";

function CatalogContent() {
  const { state, ready } = usePortal();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const page = Math.max(1, Number(params.get("page") || 1));
  const view = params.get("view") === "table" ? "table" : "grid";

  const update = (changes: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(changes).forEach(([key, value]) => value ? next.set(key, value) : next.delete(key));
    if (!("page" in changes)) next.delete("page");
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (query !== (params.get("q") || "")) update({ q: query });
    }, 350);
    return () => window.clearTimeout(timer);
    // Query parameters intentionally drive all filter state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const filtered = useMemo(() => {
    const needle = (params.get("q") || "").toLowerCase();
    const categorySlug = params.get("kategori") || "";
    const category = state.categories.find((item) => item.slug === categorySlug);
    const sub = params.get("subkategori") || "";
    const status = params.get("status") || "berlaku";
    const year = params.get("tahun") || "";
    const sort = params.get("sort") || "source";
    const result = state.standards.filter((standard) => {
      if (!standard.isPublished && status === "berlaku") return false;
      const searchable = `${standard.name} ${standard.description} ${standard.sourceNumber} ${standard.details.map((detail) => `${detail.label} ${detail.minimumValue}`).join(" ")} ${state.categories.find((item) => item.id === standard.categoryId)?.name}`.toLowerCase();
      return (!needle || searchable.includes(needle)) && (!category || standard.categoryId === category.id) && (!sub || standard.subcategoryId === sub) && (!status || standard.status === status) && (!year || standard.effectiveDate.startsWith(year));
    });
    return result.sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : sort === "updated" ? b.updatedAt.localeCompare(a.updatedAt) : a.sortOrder - b.sortOrder);
  }, [params, state.categories, state.standards]);

  if (!ready) return <LoadingSkeleton />;
  const perPage = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const items = filtered.slice((Math.min(page, totalPages) - 1) * perPage, Math.min(page, totalPages) * perPage);
  const selectedCategory = state.categories.find((item) => item.slug === params.get("kategori"));

  return <>
    <PageHeader eyebrow="Katalog Resmi" title="Daftar Standar Teknologi Informasi" description="Cari, filter, dan bandingkan seluruh ketentuan teknis yang berlaku di lingkungan Kementerian Komunikasi dan Digital." />
    <FilterPanel><div className="grid gap-3 lg:grid-cols-[minmax(260px,1.5fr)_1fr_1fr_1fr_auto]">
      <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari standar atau spesifikasi..." aria-label="Cari standar" />
      <Select value={params.get("kategori") || ""} onChange={(event) => update({ kategori: event.target.value, subkategori: "" })} aria-label="Filter kategori"><option value="">Semua kategori</option>{state.categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}</Select>
      <Select value={params.get("subkategori") || ""} onChange={(event) => update({ subkategori: event.target.value })} aria-label="Filter subkategori"><option value="">Semua subkategori</option>{state.subcategories.filter((sub) => !selectedCategory || sub.categoryId === selectedCategory.id).map((sub) => <option key={sub.id} value={sub.id}>{sub.name}</option>)}</Select>
      <Select value={params.get("status") || "berlaku"} onChange={(event) => update({ status: event.target.value })} aria-label="Filter status"><option value="berlaku">Berlaku</option><option value="draft">Draft</option><option value="ditinjau">Perlu ditinjau</option><option value="arsip">Arsip</option><option value="">Semua status</option></Select>
      <div className="flex rounded-lg border border-[#c3c6d2] p-1"><Button variant={view === "grid" ? "default" : "ghost"} size="icon" className="size-9 min-h-9" onClick={() => update({ view: "grid" })} aria-label="Tampilan kartu"><Grid2X2 className="size-4" /></Button><Button variant={view === "table" ? "default" : "ghost"} size="icon" className="size-9 min-h-9" onClick={() => update({ view: "table" })} aria-label="Tampilan tabel"><List className="size-4" /></Button></div>
    </div><div className="mt-3 flex flex-wrap items-center gap-3 border-t border-[#e0e3e6] pt-3"><Select className="w-auto min-w-44" value={params.get("sort") || "source"} onChange={(event) => update({ sort: event.target.value })} aria-label="Urutkan"><option value="source">Urutan dokumen</option><option value="name">Nama A-Z</option><option value="updated">Terbaru diperbarui</option></Select><Select className="w-auto min-w-32" value={params.get("tahun") || ""} onChange={(event) => update({ tahun: event.target.value })} aria-label="Filter tahun"><option value="">Semua tahun</option><option value="2025">2025</option></Select><Button variant="ghost" size="sm" onClick={() => { setQuery(""); router.replace(pathname); }}><RotateCcw className="size-4" />Reset filter</Button><span className="ml-auto text-sm text-[#434750]">{filtered.length} standar ditemukan</span></div></FilterPanel>
    {items.length === 0 ? <EmptyState /> : view === "table" ? <StandardsTable standards={items} categories={state.categories} /> : <div className="grid gap-5 xl:grid-cols-2">{items.map((standard) => <StandardCard key={standard.id} standard={standard} category={state.categories.find((category) => category.id === standard.categoryId)} />)}</div>}
    <Pagination page={Math.min(page, totalPages)} totalPages={totalPages} onPage={(next) => update({ page: String(next) })} />
  </>;
}

export default function StandardsPage() {
  return <AppShell><Suspense fallback={<LoadingSkeleton />}><CatalogContent /></Suspense></AppShell>;
}
