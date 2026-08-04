"use client";

import Link from "next/link";
import { ArrowRight, BookOpenCheck, FileClock, GraduationCap, Plus, Tags } from "lucide-react";
import { usePortal } from "@/components/providers/portal-provider";
import { AuditLogTable, PageHeader, StatCard } from "@/components/portal-components";
import { buttonVariants } from "@/components/ui/button";

const shortcuts = [
  { href: "/admin/standar/tambah", label: "Tambah standar", icon: Plus },
  { href: "/admin/kategori", label: "Kelola kategori", icon: Tags },
  { href: "/admin/kompetensi", label: "Kelola kompetensi", icon: GraduationCap },
  { href: "/admin/obsolete", label: "Atur kriteria obsolete", icon: FileClock },
  { href: "/admin/dokumen", label: "Edit informasi dokumen", icon: BookOpenCheck },
];

export default function AdminDashboardPage() {
  const { state } = usePortal();
  const active = state.standards.filter((item) => item.status === "berlaku").length;
  return <><PageHeader eyebrow="Pengelolaan Konten" title="Dashboard Admin" description="Kelola data standar berdasarkan struktur Pusat Data, Aplikasi, End Device, Komunikasi, Pengamanan, Data, SDM, Obsolete, dan Referensi." actions={<Link href="/admin/standar/tambah" className={buttonVariants()}><Plus className="size-4" />Tambah Standar</Link>} />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Standar Aktif" value={active} type="standards" note="Standar teknis aktif" /><StatCard label="Kategori" value={state.categories.filter((item) => item.isActive).length} type="categories" note="Struktur menu teknis" /><StatCard label="Role SDM" value={state.roles.filter((item) => item.isActive).length} type="roles" note="Standar kompetensi" /><StatCard label="Kriteria Obsolete" value={state.obsoleteCriteria.filter((item) => item.isActive).length} type="obsolete" note="Kriteria evaluasi" /></div>
    <section className="mt-7"><h2 className="mb-4 font-heading text-xl font-semibold text-[#00295a]">Pengelolaan Data</h2><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{shortcuts.map((item) => { const Icon = item.icon; return <Link key={item.href} href={item.href} className="group flex min-h-28 flex-col justify-between rounded-md border border-[#d8dadd] bg-white p-4 hover:border-[#76b8fe]"><Icon className="size-6 text-[#013f82]" /><span className="flex items-center justify-between gap-2 text-sm font-semibold text-[#00295a]">{item.label}<ArrowRight className="size-4 transition group-hover:translate-x-1" /></span></Link>; })}</div></section>
    <section className="mt-7"><div className="mb-4 flex items-center justify-between"><h2 className="font-heading text-xl font-semibold text-[#00295a]">Pembaruan Terbaru</h2><Link href="/admin/riwayat" className="text-sm font-semibold text-[#0261a2] hover:underline">Lihat semua</Link></div><AuditLogTable logs={state.auditLogs.slice(0, 6)} /></section>
  </>;
}
