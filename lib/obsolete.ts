import type { ObsoleteCriterion } from "@/lib/types";

export interface ObsoleteEvaluationInput {
  deviceType: string;
  acquisitionYear: number;
  vendorSupport: string;
  warranty: string;
  mtbf: number;
  currentYear?: number;
}

export interface ObsoleteEvaluationResult {
  status: "Belum Obsolete" | "Perlu Evaluasi" | "Termasuk Obsolete";
  reasons: string[];
}

export function evaluateObsolete(criteria: ObsoleteCriterion[], input: ObsoleteEvaluationInput): ObsoleteEvaluationResult {
  const age = (input.currentYear ?? new Date().getFullYear()) - input.acquisitionYear;
  const obsolete: string[] = [];
  const review: string[] = [];

  for (const criterion of criteria.filter((item) => item.isActive)) {
    if (criterion.conditionType === "vendor_support" && input.vendorSupport === criterion.conditionValue) obsolete.push(criterion.description);
    if (criterion.conditionType === "age" && criterion.deviceType === input.deviceType && age > Number(criterion.conditionValue)) obsolete.push(`${criterion.description} Usia saat ini ${age} tahun.`);
    if (criterion.conditionType === "mtbf_warranty" && input.mtbf < Number(criterion.conditionValue) && input.warranty === "expired") obsolete.push(`${criterion.description} MTBF yang dimasukkan ${input.mtbf} hari.`);
  }

  if (input.vendorSupport === "unknown") review.push("Status dukungan vendor belum dapat dipastikan.");
  if ((input.deviceType === "server" && age === 5) || (input.deviceType === "network" && age === 6)) review.push("Usia perangkat tepat pada batas evaluasi dokumen.");
  if (input.mtbf < 30 && input.warranty !== "expired") review.push("MTBF di bawah 30 hari, tetapi masa garansi belum lewat.");

  if (obsolete.length) return { status: "Termasuk Obsolete", reasons: obsolete };
  if (review.length) return { status: "Perlu Evaluasi", reasons: review };
  return { status: "Belum Obsolete", reasons: ["Tidak ada kriteria obsolete aktif yang terpenuhi berdasarkan data yang diberikan."] };
}
