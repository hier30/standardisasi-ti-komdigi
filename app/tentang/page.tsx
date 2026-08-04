"use client";

import { AppShell } from "@/components/app-shell";
import { usePortal } from "@/components/providers/portal-provider";
import { PageHeader } from "@/components/portal-components";
import { Badge } from "@/components/ui/badge";
import { formatDateID } from "@/lib/utils";

export default function AboutPage() {
  const { state } = usePortal();
  const document = state.document;
  return <AppShell><PageHeader eyebrow="Dokumen Resmi" title="Tentang Standardisasi TI Komdigi" description="Informasi umum, susunan, referensi, definisi, dan ketentuan pelaksanaan dokumen." />
    <section className="grid gap-6 xl:grid-cols-[1fr_320px]"><div className="grid gap-5">
      {document.sections.map((section) => <article key={section.id} className="rounded-xl border border-[#d8dadd] bg-white p-6"><div className="mb-3 flex items-center gap-3"><Badge>{section.sectionNumber}</Badge><h2 className="font-heading text-xl font-semibold text-[#00295a]">{section.title}</h2></div><p className="whitespace-pre-line text-sm leading-7 text-[#434750]">{section.content}</p></article>)}
      <article className="rounded-xl border border-[#d8dadd] bg-white p-6"><h2 className="font-heading text-xl font-semibold text-[#00295a]">Istilah dan Definisi</h2><dl className="mt-4 divide-y divide-[#e0e3e6]">{document.definitions.map((item) => <div key={item.term} className="grid gap-1 py-4 md:grid-cols-[220px_1fr]"><dt className="font-semibold text-[#191c1e]">{item.term}</dt><dd className="text-sm leading-6 text-[#434750]">{item.definition}</dd></div>)}</dl></article>
      <article className="rounded-xl border border-[#d8dadd] bg-white p-6"><h2 className="font-heading text-xl font-semibold text-[#00295a]">Referensi</h2><ol className="mt-4 grid gap-3">{document.references.map((reference, index) => <li key={reference.name} className="flex gap-3 text-sm leading-6"><span className="font-semibold text-[#0261a2]">{index + 1}.</span><span><strong>{reference.name}</strong><span className="block text-[#434750]">{reference.section}</span></span></li>)}</ol></article>
    </div><aside className="h-fit rounded-xl border border-[#b9c9dd] bg-white p-5 xl:sticky xl:top-24"><h2 className="font-heading text-lg font-semibold text-[#00295a]">Metadata Dokumen</h2><dl className="mt-4 grid gap-4 text-sm"><div><dt className="text-[#737782]">Nomor Standardisasi</dt><dd className="mt-1 break-words font-semibold">{document.standardizationNumber}</dd></div><div><dt className="text-[#737782]">Unit Penerbit</dt><dd className="mt-1 font-semibold">{document.issuingUnit}</dd></div><div><dt className="text-[#737782]">Tanggal Ditetapkan</dt><dd className="mt-1 font-semibold">{formatDateID(document.establishedDate)}</dd></div><div><dt className="text-[#737782]">Status</dt><dd className="mt-1"><Badge className="border-[#b8e4c7] bg-[#e5f5eb] text-[#126b36]">{document.status}</Badge></dd></div><div><dt className="text-[#737782]">Lampiran</dt><dd className="mt-1 font-semibold">{document.attachmentInformation}</dd></div><div><dt className="text-[#737782]">Riwayat Revisi</dt><dd className="mt-1 text-[#434750]">Halaman riwayat revisi tercantum pada daftar isi, tetapi isi tabelnya tidak tersedia dalam teks hasil ekstraksi.</dd></div></dl></aside></section>
  </AppShell>;
}
