"use client";

import { useState } from "react";
import { Edit3, GripVertical, Plus, Trash2 } from "lucide-react";
import { CompetencyForm } from "@/components/admin-forms";
import { usePortal } from "@/components/providers/portal-provider";
import { PageHeader } from "@/components/portal-components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog, Dialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import type { CompetencyRole } from "@/lib/types";

export default function AdminCompetenciesPage() {
  const { state, deleteRole } = usePortal(); const { toast } = useToast();
  const [editing, setEditing] = useState<CompetencyRole | "new" | null>(null); const [deleting, setDeleting] = useState<CompetencyRole | null>(null);
  const roles = [...state.roles].sort((a, b) => a.sortOrder - b.sortOrder);

  return <><PageHeader eyebrow="Kompetensi SDM" title="Kelola Role dan Butir Kompetensi" description="Role, urutan, tags, dan butir kompetensi dapat dikelola dari halaman ini." actions={<Button onClick={() => setEditing("new")}><Plus className="size-4" />Tambah Role</Button>} />
    <div className="overflow-x-auto rounded-xl border border-[#d8dadd] bg-white"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-[#f2f4f7]"><tr><th className="px-4 py-3">Urutan</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Tags</th><th className="px-4 py-3">Kompetensi</th><th className="px-4 py-3">Aksi</th></tr></thead><tbody>{roles.map((role, index) => <tr key={role.id} className="border-t border-[#e0e3e6]"><td className="px-4 py-3"><span className="flex items-center gap-2"><GripVertical className="size-4 text-[#737782]" />{index + 1}</span></td><td className="px-4 py-3"><strong>{role.name}</strong><span className="block text-xs text-[#737782]">{role.level} - {role.isActive ? "Aktif" : "Nonaktif"}</span></td><td className="px-4 py-3"><div className="flex flex-wrap gap-1">{role.tags.slice(0, 3).map((tag) => <Badge key={tag}>{tag}</Badge>)}</div></td><td className="px-4 py-3">{role.competencies.length} butir</td><td className="px-4 py-3"><div className="flex gap-1"><Button variant="ghost" size="icon" title="Edit" onClick={() => setEditing(role)}><Edit3 className="size-4" /></Button><Button variant="ghost" size="icon" className="text-[#ba1a1a]" title="Hapus" onClick={() => setDeleting(role)}><Trash2 className="size-4" /></Button></div></td></tr>)}</tbody></table></div>
    <Dialog open={Boolean(editing)} title={editing === "new" ? "Tambah Role Kompetensi" : `Edit ${editing?.name ?? "Role"}`} onClose={() => setEditing(null)}>{editing ? <CompetencyForm initial={editing === "new" ? undefined : editing} onDone={() => setEditing(null)} /> : null}</Dialog>
    <ConfirmDialog open={Boolean(deleting)} title="Hapus role kompetensi?" description={`Role "${deleting?.name || ""}" beserta seluruh butirnya akan dihapus.`} onClose={() => setDeleting(null)} onConfirm={async () => { if (deleting) await deleteRole(deleting.id); setDeleting(null); toast("Role kompetensi berhasil dihapus."); }} />
  </>;
}
