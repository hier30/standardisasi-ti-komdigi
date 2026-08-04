import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-[#f7f9fc] p-6 text-center"><div><FileQuestion className="mx-auto size-12 text-[#737782]" /><h1 className="mt-4 font-heading text-3xl font-bold text-[#00295a]">Halaman tidak ditemukan</h1><p className="mt-2 text-[#434750]">Alamat yang Anda buka tidak tersedia di portal.</p><Link href="/" className={`${buttonVariants()} mt-6`}>Kembali ke Beranda</Link></div></main>;
}
