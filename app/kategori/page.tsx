"use client";

import { AppShell } from "@/components/app-shell";
import { usePortal } from "@/components/providers/portal-provider";
import { CategoryCard, PageHeader } from "@/components/portal-components";

export default function CategoriesPage() {
  const { state } = usePortal();
  return <AppShell><PageHeader eyebrow="Katalog" title="Kategori Teknologi Informasi" description="Seluruh kategori dan subkategori mengikuti susunan tujuh domain pada dokumen Standardisasi Teknologi Informasi." /><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{state.categories.filter((category) => category.isActive).map((category) => <div key={category.id}><CategoryCard category={category} count={state.standards.filter((standard) => standard.categoryId === category.id && standard.isPublished).length} /><div className="mt-3 flex flex-wrap gap-2">{state.subcategories.filter((sub) => sub.categoryId === category.id && sub.isActive).map((sub) => <span key={sub.id} className="rounded-full border border-[#d8dadd] bg-white px-3 py-1 text-xs text-[#434750]">{sub.name}</span>)}</div></div>)}</div></AppShell>;
}
