"use client";

import Link from "next/link";
import {
  ChartNoAxesCombined, ClipboardCheck, Code2, Database, FileClock,
  GraduationCap, Monitor, RadioTower, Server, Shield, Users, Wrench,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { usePortal } from "@/components/providers/portal-provider";
import { cn, formatDateID } from "@/lib/utils";

const dashboardItems = [
  { slug: "pusat-data-drc", href: "/pusat-data", title: "Pusat Data", description: "Standar data center, server, storage, jaringan, dan software pendukung.", icon: Server, section: "Standar teknis", hoverTone: "blue" },
  { slug: "pengembangan-aplikasi", href: "/aplikasi", title: "Pembangunan Aplikasi", description: "Sistem operasi, framework, bahasa pemrograman, database, dan toolchain.", icon: Code2, section: "Standar teknis", hoverTone: "green" },
  { slug: "perangkat-end-device", href: "/end-device", title: "End Device", description: "Standar PC, notebook, software pengguna akhir, dan printer.", icon: Monitor, section: "Standar teknis", hoverTone: "blue" },
  { slug: "perangkat-keras-komunikasi", href: "/komunikasi", title: "Komunikasi", description: "Core layer, access point, firewall, backbone, LAN, dan monitoring.", icon: RadioTower, section: "Standar teknis", hoverTone: "green" },
  { slug: "pengamanan-informasi", href: "/pengamanan", title: "Pengamanan", description: "Pengamanan pusat data, server, aplikasi, network, dan end device.", icon: Shield, section: "Standar teknis", hoverTone: "blue" },
  { slug: "pengelolaan-data", href: "/data", title: "Pengelolaan Data", description: "Interoperabilitas, standar protokol, Satu Data Indonesia, dan GIS.", icon: Database, section: "Standar teknis", hoverTone: "green" },
  { href: "/sdm", title: "Kompetensi SDM", description: "Empat belas role beserta standar kompetensi teknologi informasi.", icon: Users, section: "Standar kompetensi", hoverTone: "blue", kind: "roles" },
  { href: "/obsolete", title: "Obsolete", description: "Kriteria End of Support, usia perangkat, MTBF, dan masa garansi.", icon: FileClock, section: "Kriteria evaluasi", hoverTone: "green", kind: "obsolete" },
] as const;

const hoverToneClasses = {
  blue: "hover:border-[#002b52] hover:bg-[#002b52]",
  green: "hover:border-[#07502a] hover:bg-[#07502a]",
};

export default function HomePage() {
  const { state } = usePortal();
  const published = state.standards.filter((standard) => standard.isPublished && standard.status === "berlaku");
  return <AppShell>
    <section className="mb-6 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
      <div>
        <h1 className="font-heading text-4xl font-bold leading-tight text-[#111820] md:text-5xl">Standardisasi <span className="relative inline-block text-[#0b548d] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-[#73bd80] after:content-['']">TI Komdigi</span></h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#525e69]">Monitor informasi standar infrastruktur teknologi informasi di lingkungan Kementerian Komunikasi dan Digital.</p>
      </div>
      <div className="grid min-w-[310px] grid-cols-2 divide-x divide-[#d5d7da] rounded-md bg-[#eeeded] px-6 py-5">
        <div><p className="text-xs text-[#68727d]">Total<br />Standar</p><p className="mt-1 font-heading text-4xl font-bold text-[#002b52]">{published.length}</p></div>
        <div className="pl-6"><p className="text-xs text-[#68727d]">Dokumen<br />Berlaku</p><p className="mt-2 text-sm font-bold text-[#258441]">{formatDateID(state.document.effectiveDate)}</p></div>
      </div>
    </section>

    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Kelompok standar teknologi informasi">
      {dashboardItems.map((item) => {
        const category = "slug" in item ? state.categories.find((entry) => entry.slug === item.slug) : undefined;
        const kind = "kind" in item ? item.kind : "standards";
        const count = kind === "roles" ? state.roles.filter((role) => role.isActive).length : kind === "obsolete" ? state.obsoleteCriteria.filter((criterion) => criterion.isActive).length : published.filter((standard) => standard.categoryId === category?.id).length;
        const Icon = item.icon;
        const FooterIcon = kind === "roles" ? GraduationCap : kind === "obsolete" ? ClipboardCheck : Wrench;
        return <Link key={item.href} href={item.href} className={cn("group flex min-h-[286px] flex-col rounded-md border border-[#dedede] bg-white p-6 text-[#17202a] shadow-[0_2px_6px_rgba(15,34,52,.04)] transition hover:-translate-y-0.5 hover:text-white hover:shadow-[0_10px_24px_rgba(15,34,52,.16)]", hoverToneClasses[item.hoverTone])}>
          <div className="flex items-start justify-between gap-3"><span className="grid size-14 place-items-center rounded-md bg-[#edf1f3] text-[#4f5b66] transition group-hover:bg-white/15 group-hover:text-white"><Icon className="size-7" /></span><span className="rounded-full bg-[#e9edf0] px-3 py-1 text-xs font-bold text-[#4d5964] transition group-hover:bg-[#b9ee9f] group-hover:text-[#174920]">{count} {kind === "roles" ? "Role" : kind === "obsolete" ? "Kriteria" : "Standar"}</span></div>
          <h2 className="mt-8 font-heading text-xl font-bold text-[#17202a] transition group-hover:text-white">{item.title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#5f6872] transition group-hover:text-white/80">{item.description}</p>
          <div className="mt-auto flex items-center gap-2 border-t border-[#e3e4e6] pt-4 text-xs text-[#7a8289] transition group-hover:border-white/15 group-hover:text-white/75"><FooterIcon className="size-4" />{item.section}</div>
        </Link>;
      })}
    </section>

    <section className="mt-6 flex flex-col justify-between gap-3 border-l-4 border-[#0b548d] bg-white px-5 py-4 sm:flex-row sm:items-center">
      <div><p className="text-xs font-bold uppercase text-[#6a747e]">Dokumen Acuan</p><p className="mt-1 font-heading font-bold text-[#002b52]">{state.document.standardizationNumber}</p></div>
      <Link href="/referensi" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b548d] hover:underline"><ChartNoAxesCombined className="size-4" />Lihat informasi dokumen</Link>
    </section>
  </AppShell>;
}
