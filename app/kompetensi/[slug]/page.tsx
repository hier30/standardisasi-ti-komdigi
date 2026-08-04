"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { usePortal } from "@/components/providers/portal-provider";
import { Breadcrumb } from "@/components/portal-components";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export default function CompetencyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { state } = usePortal();
  const role = state.roles.find((item) => item.slug === slug);
  if (!role) return <AppShell><p>Role kompetensi tidak ditemukan.</p></AppShell>;
  const groups = Array.from(new Set(role.competencies.map((item) => item.group)));
  return <AppShell><Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "SDM", href: "/sdm" }, { label: role.name }]} /><article className="rounded-xl border border-[#d8dadd] bg-white p-6 md:p-8"><div className="flex flex-wrap gap-2"><Badge>{role.level}</Badge>{role.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div><h1 className="mt-5 font-heading text-3xl font-bold text-[#00295a] md:text-4xl">{role.name}</h1><p className="mt-3 text-[#434750]">{role.description}</p></article><div className="mt-6 grid gap-5">{groups.map((group) => <section key={group} className="rounded-xl border border-[#d8dadd] bg-white p-6"><h2 className="font-heading text-xl font-semibold text-[#00295a]">{group}</h2><ol className="mt-4 grid gap-4">{role.competencies.filter((item) => item.group === group).map((item, index) => <li key={item.id} className="grid grid-cols-[32px_1fr] gap-3 text-sm leading-7"><span className="grid size-8 place-items-center rounded-full border border-[#b9c9dd] bg-[#eaf3fb] font-semibold text-[#013f82]">{index + 1}</span><div><p>{item.description}</p>{item.tags.length ? <div className="mt-2 flex gap-2">{item.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div> : null}</div></li>)}</ol></section>)}</div><Link href="/sdm" className={`${buttonVariants({ variant: "outline" })} mt-6`}>Kembali ke daftar role</Link></AppShell>;
}
