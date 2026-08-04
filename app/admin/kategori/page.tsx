"use client";

import { useState } from "react";
import { Edit3, Plus, Power, Trash2 } from "lucide-react";
import { CategoryForm, SubcategoryForm } from "@/components/admin-forms";
import { usePortal } from "@/components/providers/portal-provider";
import { PageHeader } from "@/components/portal-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog, Dialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import type { Category, Subcategory } from "@/lib/types";

export default function AdminCategoriesPage() {
  const { state, saveCategory, deleteCategory, deleteSubcategory } = usePortal();
  const { toast } = useToast();
  const [editing, setEditing] = useState<Category | "new" | null>(null);
  const [deleting, setDeleting] = useState<Category | null>(null);
  const [subEditing, setSubEditing] = useState<Subcategory | { categoryId: string } | null>(null);
  const [subDeleting, setSubDeleting] = useState<Subcategory | null>(null);

  return <>
    <PageHeader eyebrow="Taksonomi" title="Kelola Kategori & Subkategori" description="Atur nama, urutan, dan status aktif. Data yang masih digunakan oleh standar tidak dapat dihapus." actions={<Button onClick={() => setEditing("new")}><Plus className="size-4" />Tambah Kategori</Button>} />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[...state.categories].sort((a, b) => a.sortOrder - b.sortOrder).map((category) => <article key={category.id} className="rounded-xl border border-[#d8dadd] bg-white p-5">
      <div className="flex items-start justify-between gap-3"><div><span className="text-xs font-semibold text-[#0261a2]">Urutan {category.sortOrder}</span><h2 className="mt-1 font-heading text-lg font-semibold text-[#00295a]">{category.name}</h2></div><Badge className={category.isActive ? "border-[#b8e4c7] bg-[#e5f5eb] text-[#126b36]" : ""}>{category.isActive ? "Aktif" : "Nonaktif"}</Badge></div>
      <p className="mt-3 text-sm leading-6 text-[#434750]">{category.description}</p>
      <div className="mt-4 grid gap-2">{state.subcategories.filter((sub) => sub.categoryId === category.id).map((sub) => <div key={sub.id} className="flex items-center gap-2 rounded-lg bg-[#f2f4f7] px-3 py-2 text-xs"><span className="mr-auto font-medium">{sub.name}</span><button onClick={() => setSubEditing(sub)} aria-label={`Edit ${sub.name}`}><Edit3 className="size-3.5" /></button><button className="text-[#ba1a1a]" onClick={() => setSubDeleting(sub)} aria-label={`Hapus ${sub.name}`}><Trash2 className="size-3.5" /></button></div>)}</div>
      <Button variant="ghost" size="sm" className="mt-2 w-full" onClick={() => setSubEditing({ categoryId: category.id })}><Plus className="size-4" />Tambah subkategori</Button>
      <p className="mt-3 text-xs text-[#737782]">{state.standards.filter((standard) => standard.categoryId === category.id).length} standar menggunakan kategori ini</p>
      <div className="mt-4 flex justify-end gap-1 border-t border-[#e0e3e6] pt-3"><Button variant="ghost" size="icon" title="Aktif/nonaktif" onClick={() => saveCategory({ ...category, isActive: !category.isActive, updatedAt: new Date().toISOString() })}><Power className="size-4" /></Button><Button variant="ghost" size="icon" title="Edit" onClick={() => setEditing(category)}><Edit3 className="size-4" /></Button><Button variant="ghost" size="icon" className="text-[#ba1a1a]" title="Hapus" onClick={() => setDeleting(category)}><Trash2 className="size-4" /></Button></div>
    </article>)}</div>
    <Dialog open={Boolean(editing)} title={editing === "new" ? "Tambah Kategori" : "Edit Kategori"} onClose={() => setEditing(null)}>{editing ? <CategoryForm initial={editing === "new" ? undefined : editing} onDone={() => setEditing(null)} /> : null}</Dialog>
    <Dialog open={Boolean(subEditing)} title={(subEditing && "id" in subEditing) ? "Edit Subkategori" : "Tambah Subkategori"} onClose={() => setSubEditing(null)}>{subEditing ? <SubcategoryForm initial={"id" in subEditing ? subEditing : undefined} categoryId={"categoryId" in subEditing ? subEditing.categoryId : undefined} onDone={() => setSubEditing(null)} /> : null}</Dialog>
    <ConfirmDialog open={Boolean(deleting)} title="Hapus kategori?" description={`Kategori "${deleting?.name || ""}" hanya dapat dihapus bila belum digunakan.`} onClose={() => setDeleting(null)} onConfirm={async () => { if (!deleting) return; const result = await deleteCategory(deleting.id); setDeleting(null); toast(result.error || "Kategori berhasil dihapus.", result.error ? "error" : "success"); }} />
    <ConfirmDialog open={Boolean(subDeleting)} title="Hapus subkategori?" description={`Subkategori "${subDeleting?.name || ""}" hanya dapat dihapus bila belum digunakan.`} onClose={() => setSubDeleting(null)} onConfirm={async () => { if (!subDeleting) return; const result = await deleteSubcategory(subDeleting.id); setSubDeleting(null); toast(result.error || "Subkategori berhasil dihapus.", result.error ? "error" : "success"); }} />
  </>;
}
