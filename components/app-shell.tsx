"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Archive, BookOpenCheck, ChartNoAxesCombined, ClipboardList,
  Database, FileClock, GraduationCap, Grid3X3, History, Home, Info,
  LogIn, LogOut, Menu, Monitor, RadioTower, Search,
  Shield, Tags, Users, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePortal } from "@/components/providers/portal-provider";
import { cn } from "@/lib/utils";

const publicItems = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/pusat-data", label: "Pusat Data", icon: Database },
  { href: "/aplikasi", label: "Aplikasi", icon: Grid3X3 },
  { href: "/end-device", label: "End Device", icon: Monitor },
  { href: "/komunikasi", label: "Komunikasi", icon: RadioTower },
  { href: "/pengamanan", label: "Pengamanan", icon: Shield },
  { href: "/data", label: "Data", icon: ChartNoAxesCombined },
  { href: "/sdm", label: "SDM", icon: Users },
  { href: "/obsolete", label: "Obsolete", icon: FileClock },
  { href: "/referensi", label: "Referensi", icon: Info },
];

const adminItems = [
  { href: "/admin", label: "Dashboard Admin", icon: Home },
  { href: "/admin/standar", label: "Standardisasi TI Komdigi", icon: ClipboardList },
  { href: "/admin/kategori", label: "Kategori", icon: Tags },
  { href: "/admin/kompetensi", label: "SDM", icon: GraduationCap },
  { href: "/admin/obsolete", label: "Obsolete", icon: Archive },
  { href: "/admin/dokumen", label: "Referensi", icon: BookOpenCheck },
  { href: "/admin/riwayat", label: "Riwayat", icon: History },
];

export function AppHeader({ onMenu }: { onMenu: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { isAdmin, logout } = usePortal();
  return <header className="sticky top-0 z-40 flex h-[72px] items-center gap-3 border-b border-[#e3e6ea] bg-white px-4 lg:ml-[266px] lg:px-8">
    <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenu} aria-label="Buka navigasi"><Menu className="size-5" /></Button>
    <Link href="/" className="flex shrink-0 items-center gap-2 font-heading text-sm font-bold text-[#002b52] lg:hidden" aria-label="Standardisasi TI Komdigi"><Image src="/komdigi-icon.png" width={532} height={506} alt="" className="size-8 object-contain" /><span className="hidden md:inline">Standardisasi TI Komdigi</span></Link>
    <form className="mx-auto w-full max-w-xl lg:mx-0" onSubmit={(event) => { event.preventDefault(); router.push(`/standar?q=${encodeURIComponent(query)}`); }}>
      <div className="relative w-full"><Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#7a8490]" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari standar atau komponen..." className="h-11 border-transparent bg-[#f5f6f8] pl-12 focus-visible:border-[#0b548d]" aria-label="Pencarian global" /></div>
    </form>
    {isAdmin ? <Button variant="outline" size="icon" className="ml-auto" onClick={async () => { await logout(); router.push("/"); }} aria-label="Keluar admin" title="Keluar admin"><LogOut className="size-4" /></Button> : <Button variant="default" size="icon" className="ml-auto" onClick={() => router.push("/login")} aria-label="Masuk admin" title="Masuk admin"><LogIn className="size-4" /></Button>}
  </header>;
}

export function AppSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const isAdminArea = pathname.startsWith("/admin");
  const items = isAdminArea ? adminItems : publicItems;
  return <>
    {open ? <button className="fixed inset-0 z-50 bg-[#00172d]/55 lg:hidden" onClick={onClose} aria-label="Tutup navigasi" /> : null}
    <aside className={cn("fixed inset-y-0 left-0 z-[60] flex w-[266px] flex-col bg-[#002b52] text-white transition-transform", open ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}>
      <div className="flex h-[96px] items-center gap-3 border-b border-white/10 px-5">
        <Link href={isAdminArea ? "/admin" : "/"} className="flex min-w-0 items-center gap-3" aria-label="Standardisasi TI Komdigi">
          <span className="grid h-16 w-[76px] shrink-0 place-items-center rounded-sm bg-white p-2"><Image src="/komdigi-logo.png" width={702} height={534} alt="Logo Komdigi" className="h-auto w-full object-contain" priority /></span>
          <div className="min-w-0"><p className="font-heading text-sm font-bold leading-5">Standardisasi TI</p><p className="text-[11px] font-semibold text-[#8fc3ed]">Komdigi</p>{isAdminArea ? <p className="mt-0.5 text-[9px] font-semibold uppercase text-[#9db7cd]">Pengelolaan Admin</p> : null}</div>
        </Link>
        <Button variant="ghost" size="icon" className="ml-auto text-white hover:bg-white/10 lg:hidden" onClick={onClose} aria-label="Tutup navigasi"><X className="size-5" /></Button>
      </div>
      {isAdminArea ? <Link href="/" className="mx-3 mt-4 flex min-h-10 items-center gap-3 rounded-md border border-white/20 px-4 text-xs font-semibold uppercase text-[#c9d9e8] hover:bg-white/10"><Home className="size-[18px]" />Kembali ke Portal</Link> : null}
      <nav className="grid gap-1 px-3 py-4" aria-label={isAdminArea ? "Navigasi admin" : "Navigasi utama"}>{items.map((item) => {
        const exactOnly = item.href === "/" || item.href === "/admin";
        const active = exactOnly ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        return <Link key={item.href} href={item.href} onClick={onClose} className={cn("flex min-h-12 items-center gap-4 rounded-md px-4 text-xs font-semibold uppercase text-[#bfd1e1] transition hover:bg-white/8 hover:text-white", active && "bg-[#07528f] text-white shadow-[inset_3px_0_0_#5ea9df]")}><Icon className="size-[19px] shrink-0" />{item.label}</Link>;
      })}</nav>
      <div className="mt-auto border-t border-white/10 px-6 py-5 text-xs leading-5 text-[#91abc1]">
        <p className="font-semibold text-[#c9d9e8]">Kementerian Komunikasi dan Digital</p>
        <p>Standardisasi TI Komdigi</p>
      </div>
    </aside>
  </>;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="min-h-screen bg-[#f7f8fa] text-[#18212b]">
    <AppSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
    <AppHeader onMenu={() => setMenuOpen(true)} />
    <main className="min-h-[calc(100vh-72px)] lg:ml-[266px]"><div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-7">{children}</div></main>
    <footer className="border-t border-[#e0e4e8] bg-white py-5 text-xs text-[#66717d] lg:ml-[266px]"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 px-4 sm:px-6 md:flex-row lg:px-8"><span><strong className="text-[#002b52]">Standardisasi TI Komdigi</strong> - Sistem Informasi Standardisasi</span><span>ST-002/SJ.7/KITG/07/2024-01</span></div></footer>
  </div>;
}
