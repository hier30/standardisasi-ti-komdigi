"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { ArrowLeft, Eye, EyeOff, Info, LockKeyhole, LogIn, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePortal } from "@/components/providers/portal-provider";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";

function LoginForm() {
  const { login } = usePortal();
  const router = useRouter();
  const params = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return <div className="grid min-h-screen place-items-center bg-[#002b52] p-5 sm:p-8">
    <main className="w-full max-w-lg">
      <div className="mb-6 flex items-center justify-between gap-4 text-white">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#d8e8f5] hover:text-white"><ArrowLeft className="size-4" />Kembali ke portal</Link>
        <div className="flex items-center gap-3 text-right"><div><p className="font-heading text-sm font-bold">Standardisasi TI Komdigi</p><p className="text-xs text-[#b8cde0]">Pengelolaan Admin</p></div><span className="grid h-16 w-[76px] place-items-center rounded-md bg-white p-2"><Image src="/komdigi-logo.png" width={702} height={534} alt="Logo Komdigi" className="h-auto w-full object-contain" priority /></span></div>
      </div>
      <form className="rounded-lg border border-[#d5d9df] bg-white p-6 shadow-[0_18px_48px_rgba(0,18,36,.28)] sm:p-8" onSubmit={async (event) => { event.preventDefault(); setLoading(true); setError(""); const data = new FormData(event.currentTarget); const result = await login(String(data.get("email")), String(data.get("password")), data.get("remember") === "on"); setLoading(false); if (result.error) setError(result.error); else router.replace(params.get("redirect") || "/admin"); }}>
        <h1 className="font-heading text-3xl font-bold text-[#191c1e]">Masuk ke Portal</h1><p className="mt-2 text-[#434750]">Masukkan kredensial admin Anda.</p>
        {error ? <div className="mt-5 rounded-lg border border-[#ffb4ab] bg-[#ffdad6] p-3 text-sm text-[#93000a]">{error}</div> : null}
        <div className="mt-6 grid gap-4"><Field label="Email"><div className="relative"><User className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[#737782]" /><Input name="email" type="email" placeholder="admin@komdigi.go.id" className="pl-10" autoComplete="username" required /></div></Field><Field label="Kata Sandi"><div className="relative"><LockKeyhole className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[#737782]" /><Input name="password" type={showPassword ? "text" : "password"} placeholder="Masukkan kata sandi" className="px-10" autoComplete="current-password" required /><button type="button" className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-md text-[#737782] hover:bg-[#f2f4f7]" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}>{showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}</button></div></Field></div>
        <div className="mt-4 flex items-center justify-between gap-3 text-sm"><label className="flex items-center gap-2"><input name="remember" type="checkbox" className="size-4 accent-[#013f82]" />Ingat saya</label><button type="button" className="font-semibold text-[#013f82] underline" onClick={() => setError("Reset kata sandi belum tersedia. Hubungi administrator.")}>Lupa kata sandi?</button></div>
        <Button type="submit" className="mt-6 w-full" disabled={loading}><LogIn className="size-4" />{loading ? "Memverifikasi..." : "Masuk"}</Button>
      </form>
      <p className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-[#b8cde0]"><Info className="size-4 shrink-0" />Halaman ini hanya dapat diakses oleh pengelola Standardisasi TI Komdigi.</p>
    </main>
  </div>;
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}
