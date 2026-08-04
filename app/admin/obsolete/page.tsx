"use client";

import { useState } from "react";
import { Edit3, Plus, Power, Trash2 } from "lucide-react";
import { ObsoleteCriterionForm } from "@/components/admin-forms";
import { usePortal } from "@/components/providers/portal-provider";
import { PageHeader } from "@/components/portal-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog, Dialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import type { ObsoleteCriterion } from "@/lib/types";

export default function AdminObsoletePage() {
  const { state, saveCriterion, deleteCriterion } = usePortal(); const { toast } = useToast();
  const [editing, setEditing] = useState<ObsoleteCriterion | "new" | null>(null); const [deleting, setDeleting] = useState<ObsoleteCriterion | null>(null);
  return <><PageHeader eyebrow="Evaluator Dinamis" title="Kelola Kriteria Obsolete" description="Perubahan kriteria aktif langsung digunakan oleh form evaluasi perangkat pada halaman publik." actions={<Button onClick={() => setEditing("new")}><Plus className="size-4" />Tambah Kriteria</Button>} />
    <div className="grid gap-4 md:grid-cols-2">{[...state.obsoleteCriteria].sort((a, b) => a.sortOrder - b.sortOrder).map((criterion, index) => <article key={criterion.id} className="rounded-xl border border-[#d8dadd] bg-white p-5"><div className="flex items-start justify-between"><div><span className="text-xs font-bold text-[#0261a2]">Kriteria {index + 1}</span><h2 className="mt-1 font-heading text-lg font-semibold text-[#00295a]">{criterion.name}</h2></div><Badge className={criterion.isActive ? "border-[#b8e4c7] bg-[#e5f5eb] text-[#126b36]" : ""}>{criterion.isActive ? "Aktif" : "Nonaktif"}</Badge></div><p className="mt-3 text-sm leading-6 text-[#434750]">{criterion.description}</p><dl className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-[#f2f4f7] p-3 text-xs"><div><dt className="text-[#737782]">Tipe Kondisi</dt><dd className="mt-1 font-semibold">{criterion.conditionType}</dd></div><div><dt className="text-[#737782]">Aturan</dt><dd className="mt-1 font-semibold">{criterion.operator} {criterion.conditionValue} {criterion.conditionUnit}</dd></div></dl><div className="mt-4 flex justify-end gap-1 border-t border-[#e0e3e6] pt-3"><Button variant="ghost" size="icon" title="Aktif/nonaktif" onClick={() => saveCriterion({ ...criterion, isActive: !criterion.isActive })}><Power className="size-4" /></Button><Button variant="ghost" size="icon" title="Edit" onClick={() => setEditing(criterion)}><Edit3 className="size-4" /></Button><Button variant="ghost" size="icon" className="text-[#ba1a1a]" title="Hapus" onClick={() => setDeleting(criterion)}><Trash2 className="size-4" /></Button></div></article>)}</div>
    <Dialog open={Boolean(editing)} title={editing === "new" ? "Tambah Kriteria" : "Edit Kriteria"} onClose={() => setEditing(null)}>{editing ? <ObsoleteCriterionForm initial={editing === "new" ? undefined : editing} onDone={() => setEditing(null)} /> : null}</Dialog>
    <ConfirmDialog open={Boolean(deleting)} title="Hapus kriteria?" description={`Kriteria "${deleting?.name || ""}" tidak lagi digunakan evaluator.`} onClose={() => setDeleting(null)} onConfirm={async () => { if (deleting) await deleteCriterion(deleting.id); setDeleting(null); toast("Kriteria berhasil dihapus."); }} />
  </>;
}
