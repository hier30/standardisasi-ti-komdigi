"use client";

import { BookOpenCheck, FileText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { usePortal } from "@/components/providers/portal-provider";
import { PageHeader } from "@/components/portal-components";
import { formatDateID } from "@/lib/utils";

export default function ReferensiPage() {
  const { state } = usePortal();
  const document = state.document;
  return <AppShell>
    <PageHeader eyebrow="Informasi Dokumen" title="Referensi Standardisasi TI Komdigi" description="Identitas, ruang lingkup, dan rujukan yang digunakan dalam penyusunan Standardisasi Teknologi Informasi." />
    <section className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
      <div className="border border-[#dfe3e7] bg-white"><div className="flex items-center gap-3 border-b border-[#dfe3e7] bg-[#edf1f4] px-5 py-4"><FileText className="size-5 text-[#0b548d]" /><h2 className="font-heading text-lg font-bold text-[#17202a]">Identitas Dokumen</h2></div><dl className="grid sm:grid-cols-2">{[
        ["Nama Dokumen", document.documentName], ["Nomor Standardisasi", document.standardizationNumber], ["Unit Penerbit", document.issuingUnit], ["Tanggal Ditetapkan", formatDateID(document.establishedDate)], ["Tanggal Berlaku", formatDateID(document.effectiveDate)], ["Status", document.status],
      ].map(([label, value]) => <div key={label} className="border-b border-[#e5e7e9] px-5 py-4 odd:sm:border-r"><dt className="text-xs font-semibold uppercase text-[#6a747e]">{label}</dt><dd className="mt-1 text-sm font-semibold leading-6 text-[#17202a]">{value}</dd></div>)}</dl></div>
      <div className="border border-[#dfe3e7] bg-[#002b52] p-5 text-white"><BookOpenCheck className="size-7 text-[#8fc3ed]" /><h2 className="mt-5 font-heading text-xl font-bold">Ruang Lingkup</h2><p className="mt-3 text-sm leading-7 text-white/80">{document.scope}</p></div>
    </section>

    <section className="mt-6 overflow-x-auto border border-[#dfe3e7] bg-white"><div className="border-b border-[#dfe3e7] px-5 py-4"><h2 className="font-heading text-lg font-bold text-[#17202a]">Daftar Referensi</h2></div><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-[#edf1f4] text-xs font-bold uppercase text-[#596570]"><tr><th className="w-16 px-4 py-3">No.</th><th className="px-4 py-3">Dokumen</th><th className="px-4 py-3">Bagian yang Dirujuk</th></tr></thead><tbody>{document.references.map((reference, index) => <tr key={reference.name} className="border-t border-[#e2e5e8]"><td className="px-4 py-4 font-bold text-[#0b548d]">{index + 1}</td><td className="px-4 py-4 font-semibold text-[#17202a]">{reference.name}</td><td className="px-4 py-4 text-[#4f5b66]">{reference.section}</td></tr>)}</tbody></table></section>

    <section className="mt-6 overflow-x-auto border border-[#dfe3e7] bg-white"><div className="border-b border-[#dfe3e7] px-5 py-4"><h2 className="font-heading text-lg font-bold text-[#17202a]">Istilah dan Definisi</h2></div><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-[#edf1f4] text-xs font-bold uppercase text-[#596570]"><tr><th className="w-64 px-4 py-3">Istilah</th><th className="px-4 py-3">Definisi</th></tr></thead><tbody>{document.definitions.map((item) => <tr key={item.term} className="border-t border-[#e2e5e8] align-top"><td className="px-4 py-4 font-semibold text-[#17202a]">{item.term}</td><td className="px-4 py-4 leading-6 text-[#4f5b66]">{item.definition}</td></tr>)}</tbody></table></section>
  </AppShell>;
}
