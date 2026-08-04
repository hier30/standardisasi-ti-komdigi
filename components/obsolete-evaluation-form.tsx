"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, SearchCheck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/input";
import type { ObsoleteCriterion } from "@/lib/types";
import { evaluateObsolete, type ObsoleteEvaluationResult } from "@/lib/obsolete";

export function ObsoleteEvaluationForm({ criteria }: { criteria: ObsoleteCriterion[] }) {
  const [result, setResult] = useState<ObsoleteEvaluationResult | null>(null);
  const evaluate = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const deviceType = String(data.get("deviceType"));
    const year = Number(data.get("year"));
    const vendorSupport = String(data.get("vendorSupport"));
    const warranty = String(data.get("warranty"));
    const mtbf = Number(data.get("mtbf"));
    setResult(evaluateObsolete(criteria, { deviceType, acquisitionYear: year, vendorSupport, warranty, mtbf }));
  };
  const config = result?.status === "Termasuk Obsolete" ? { Icon: XCircle, className: "border-[#ffb4ab] bg-[#ffdad6] text-[#93000a]" } : result?.status === "Perlu Evaluasi" ? { Icon: AlertTriangle, className: "border-[#f6d88c] bg-[#fff4d8] text-[#7a4d00]" } : { Icon: CheckCircle2, className: "border-[#b8e4c7] bg-[#e5f5eb] text-[#126b36]" };
  return <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]"><form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => { event.preventDefault(); evaluate(event.currentTarget); }}>
    <Field label="Jenis Perangkat atau Sistem"><Select name="deviceType" required defaultValue=""><option value="" disabled>Pilih jenis</option><option value="server">Server</option><option value="network">Network device</option><option value="other">Sistem/perangkat lain</option></Select></Field>
    <Field label="Tahun Pengadaan"><Input name="year" type="number" min="1990" max={new Date().getFullYear()} placeholder="Contoh: 2020" required /></Field>
    <Field label="Status Dukungan Vendor"><Select name="vendorSupport" defaultValue="supported"><option value="supported">Masih didukung</option><option value="eos">End of Support (EOS)</option><option value="unknown">Belum diketahui</option></Select></Field>
    <Field label="Status Garansi"><Select name="warranty" defaultValue="active"><option value="active">Masih berlaku</option><option value="expired">Lewat masa garansi</option></Select></Field>
    <Field label="MTBF Perkiraan (hari)" className="sm:col-span-2"><Input name="mtbf" type="number" min="1" placeholder="Berapa hari sebelum gangguan berikutnya?" required /></Field>
    <div className="sm:col-span-2 flex justify-end border-t border-[#e0e3e6] pt-4"><Button type="submit"><SearchCheck className="size-4" />Cek Status Kelayakan</Button></div>
  </form><div className={`grid min-h-64 place-items-center rounded-xl border p-6 ${result ? config.className : "border-[#d8dadd] bg-[#f7f9fc] text-[#737782]"}`}>
    {result ? <div className="w-full text-center"><config.Icon className="mx-auto size-10" /><h3 className="mt-3 font-heading text-xl font-bold">{result.status}</h3><ul className="mt-4 grid gap-2 text-left text-sm leading-6">{result.reasons.map((reason) => <li key={reason} className="flex gap-2"><span>•</span><span>{reason}</span></li>)}</ul></div> : <div className="text-center"><SearchCheck className="mx-auto size-10" /><p className="mt-3 text-sm leading-6">Hasil evaluasi akan muncul setelah seluruh data diisi.</p></div>}
  </div></div>;
}
