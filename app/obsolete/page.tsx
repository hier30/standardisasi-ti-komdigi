"use client";

import { AlertTriangle, CalendarX2, Server, ShieldOff } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ObsoleteEvaluationForm } from "@/components/obsolete-evaluation-form";
import { usePortal } from "@/components/providers/portal-provider";
import { PageHeader } from "@/components/portal-components";

const icons = [ShieldOff, Server, CalendarX2, AlertTriangle];

export default function ObsoletePage() {
  const { state } = usePortal();
  const criteria = state.obsoleteCriteria.filter((item) => item.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
  return <AppShell>
    <PageHeader eyebrow="Evaluasi Perangkat" title="Perangkat atau Sistem Obsolete" description="Informasi kriteria perangkat atau sistem yang telah mencapai batas dukungan atau masa pakai." actions={<div className="min-w-36 rounded-md bg-[#555b62] px-5 py-3 text-white"><span className="block text-xs text-white/70">Total Kriteria</span><strong className="font-heading text-2xl">{criteria.length}</strong></div>} />
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{criteria.map((criterion, index) => {
      const Icon = icons[index % icons.length];
      return <article key={criterion.id} className="rounded-md border border-[#d8dadd] bg-white p-5 shadow-[0_2px_6px_rgba(15,34,52,.04)]">
        <div className="flex items-start justify-between gap-3"><span className={`grid size-11 place-items-center rounded-md ${index === 0 ? "bg-[#fde4e2] text-[#b11f28]" : "bg-[#dce8f7] text-[#003b70]"}`}><Icon className="size-5" /></span><span className="grid size-7 place-items-center rounded-full bg-[#edf1f4] text-xs font-bold text-[#4f5b66]">{index + 1}</span></div>
        <h2 className="mt-5 font-heading text-lg font-bold text-[#17202a]">{criterion.name}</h2>
        <p className="mt-2 text-sm leading-6 text-[#5f6872]">{criterion.description}</p>
      </article>;
    })}</section>
    <section className="mt-6 border border-[#dfe3e7] bg-white"><div className="flex items-start gap-3 border-b border-[#dfe3e7] bg-[#fff4e5] px-5 py-4"><AlertTriangle className="mt-0.5 size-5 shrink-0 text-[#a35b00]" /><div><h2 className="font-heading text-lg font-bold text-[#17202a]">Periksa Status Perangkat</h2><p className="mt-1 text-sm text-[#5f6872]">Masukkan informasi perangkat untuk mencocokkan kriteria aktif di atas.</p></div></div><div className="p-5"><ObsoleteEvaluationForm criteria={criteria} /></div></section>
  </AppShell>;
}
