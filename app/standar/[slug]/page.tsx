"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Archive, Copy, Edit3 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { usePortal } from "@/components/providers/portal-provider";
import { Breadcrumb, MinimumRecommendationComparison } from "@/components/portal-components";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { formatDateID } from "@/lib/utils";

const categoryRoutes: Record<string, string> = {
  "pusat-data-drc": "/pusat-data",
  "pengembangan-aplikasi": "/aplikasi",
  "perangkat-end-device": "/end-device",
  "perangkat-keras-komunikasi": "/komunikasi",
  "pengamanan-informasi": "/pengamanan",
  "pengelolaan-data": "/data",
};

export default function StandardDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { state, isAdmin, duplicateStandard, archiveStandard } = usePortal();
  const { toast } = useToast();
  const standard = state.standards.find((item) => item.slug === slug);

  if (!standard) return <AppShell><div className="rounded-md border border-[#d8dadd] bg-white p-8 text-center"><h1 className="font-heading text-2xl font-bold text-[#00295a]">Standar tidak ditemukan</h1><Link href="/" className={`${buttonVariants()} mt-5`}>Kembali</Link></div></AppShell>;

  const category = state.categories.find((item) => item.id === standard.categoryId);
  const subcategory = state.subcategories.find((item) => item.id === standard.subcategoryId);
  const categoryHref = category ? categoryRoutes[category.slug] || "/" : "/";

  return <AppShell>
    <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: category?.name || "Standardisasi TI Komdigi", href: categoryHref }, { label: standard.name }]} />
    {isAdmin ? <div className="mb-5 flex flex-wrap justify-end gap-2 no-print"><Button variant="outline" onClick={async () => { await duplicateStandard(standard); toast("Standar berhasil diduplikasi."); router.push("/admin/standar"); }}><Copy className="size-4" />Duplikasi</Button><Link href={`/admin/standar/${standard.id}/edit`} className={buttonVariants()}><Edit3 className="size-4" />Edit</Link><Button variant="danger" onClick={async () => { await archiveStandard(standard.id); toast("Status standar diperbarui."); }}><Archive className="size-4" />Arsipkan</Button></div> : null}
    <article className="border border-[#d8dadd] bg-white p-6 md:p-8"><div className="flex flex-wrap items-center gap-2">{category ? <Badge>{category.name}</Badge> : null}{subcategory ? <Badge>{subcategory.name}</Badge> : null}<StatusBadge status={standard.status} /><span className="ml-auto text-sm text-[#737782]">Terakhir diperbarui: {formatDateID(standard.updatedAt)}</span></div><h1 className="mt-5 font-heading text-3xl font-bold leading-tight text-[#191c1e] md:text-4xl">{standard.name}</h1><p className="mt-4 max-w-4xl text-base leading-7 text-[#434750]">{standard.description}</p></article>
    <section className="mt-6"><MinimumRecommendationComparison standard={standard} modern /></section>
  </AppShell>;
}
