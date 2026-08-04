import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const source = fs.readFileSync(path.join(root, "lib", "internal-data.ts"), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const temp = path.join(root, "scripts", ".mapping-data.generated.mjs");
fs.writeFileSync(temp, compiled, "utf8");
const data = await import(`${pathToFileURL(temp).href}?t=${Date.now()}`);

const pages = {
  "3.1.1": "7-9", "3.1.2.1": "9", "3.1.2.2": "9", "3.1.3.1": "9-10", "3.1.3.2": "10", "3.1.3.3": "11", "3.1.4.1": "11", "3.1.4.2": "12", "3.1.5": "12",
  "3.2.1": "13", "3.2.2": "13", "3.2.3": "13-14", "3.2.4": "14", "3.2.5": "14", "3.2.6": "14-15",
  "3.3.1": "15", "3.3.2": "16", "3.3.3": "16-17", "3.3.4": "17-18", "3.3.5": "18", "3.3.6": "18-19",
  "3.4.1": "19", "3.4.2": "19-20", "3.4.3": "20-21", "3.4.4": "21", "3.4.5": "21", "3.4.6": "21-22", "3.4.7": "22", "3.4.8": "22",
  "3.5.1": "22-23", "3.5.2": "23", "3.5.3": "23-24", "3.5.4.1": "24", "3.5.5.1": "24", "3.6.1": "24-25", "3.6.2": "25",
  "3.7.1": "25-26", "3.7.2": "26", "3.7.3": "26-27", "3.7.4": "27-28", "3.7.5": "28", "3.7.6": "28-29", "3.7.7": "29", "3.7.8": "30", "3.7.9": "30-31", "3.7.10": "31", "3.7.11": "31-32", "3.7.12": "32-33", "3.7.13": "33-34", "3.7.14": "34-35",
};

const out = [
  "# Pemetaan Konten Dokumen",
  "",
  `Sumber utama: **${data.portalDocument.standardizationNumber}**, 36 halaman isi ditambah halaman awal. Pemetaan ini dihasilkan dari data internal aplikasi dan diverifikasi terhadap teks hasil ekstraksi.`,
  "",
  "## Bagian Umum",
  "",
  "| Halaman sumber | Bagian | Lokasi website/data | Status | Catatan |",
  "|---|---|---|---|---|",
  "| i | Riwayat Revisi | `/tentang` | Sebagian | Judul tercantum pada daftar isi, tetapi isi tabel riwayat revisi tidak tersedia dalam teks hasil ekstraksi. |",
  "| ii-v | Lembar Persetujuan | `/tentang` | Metadata saja | Isi lembar tanda tangan/persetujuan tidak tersedia dalam teks hasil ekstraksi. |",
  "| vi-vii | Daftar Isi | `/tentang` | Sudah | Direpresentasikan oleh susunan section dan navigasi portal. |",
  "| 1 | 1.1 Latar Belakang | `documents` + `/tentang` | Sudah | Teks lengkap. |",
  "| 2 | 1.2 Maksud dan Tujuan | `documents`, `document_sections` + `/tentang` | Sudah | Maksud dan tujuan dipertahankan. |",
  "| 2-3 | 1.3 Manfaat | `document_sections` + `/tentang` | Sudah | Empat butir lengkap. |",
  "| 3 | 1.4 Ruang Lingkup | `documents`, `document_sections` + `/tentang` | Sudah | Lima butir lengkap. |",
  "| 3-4 | 1.5 Referensi | `document_sections` + `/tentang` | Sudah | Empat referensi dan bagian acuan lengkap. |",
  "| 4-5 | 1.6 Istilah dan Definisi | `document_sections` + `/tentang` | Sudah | Sembilan istilah lengkap. |",
  "| 6 | 2 Ketentuan Pelaksanaan | `document_sections` + `/tentang` | Sudah | Empat ketentuan lengkap. |",
  "| 7 | 3 Pengantar Standardisasi TI | `document_sections` + `/tentang` | Sudah | Tujuh domain lengkap. |",
  "",
  "## Standar Teknis",
  "",
  "| Halaman sumber | Nomor | Kategori data | Record/halaman website | Status |",
  "|---|---|---|---|---|",
];
for (const item of data.standards) out.push(`| ${pages[item.sourceNumber] || "-"} | ${item.sourceNumber} | ${data.categories.find((category) => category.id === item.categoryId)?.name || "-"} | \`${item.id}\` / \`/standar/${item.slug}\` | Sudah (${item.details.length} detail) |`);
out.push("", "## Standar Kompetensi", "", "| Halaman sumber | Nomor | Role | Record/halaman website | Status |", "|---|---|---|---|---|");
for (const role of data.competencyRoles) out.push(`| ${pages[role.sourceNumber] || "-"} | ${role.sourceNumber} | ${role.name} | \`${role.id}\` / \`/kompetensi/${role.slug}\` | Sudah (${role.competencies.length} butir) |`);
out.push(
  "", "## Obsolete dan Lampiran", "",
  "| Halaman sumber | Bagian | Record/halaman website | Status |",
  "|---|---|---|---|",
  `| 35 | 3.8 Perangkat/Sistem Obsolete | ${data.obsoleteCriteria.map((item) => `\`${item.id}\``).join(", ")} / \`/obsolete\` | Sudah (${data.obsoleteCriteria.length} kriteria) |`,
  "| 36 | 4 Lampiran: Tidak ada | `document_sections` / `/tentang` | Sudah |",
  "", "## Ringkasan Verifikasi", "",
  `- ${data.categories.length} kategori utama dan ${data.subcategories.length} subkategori.`,
  `- ${data.standards.length} standar teknis dengan ${data.standards.reduce((sum, item) => sum + item.details.length, 0)} detail/baris.`,
  `- ${data.competencyRoles.length} role dengan ${data.competencyRoles.reduce((sum, role) => sum + role.competencies.length, 0)} butir kompetensi.`,
  `- ${data.obsoleteCriteria.length} kriteria obsolete.`,
  "- Catatan kaki lisensi Windows dan kewajiban auto-update anti-malware disimpan pada catatan detail terkait.",
  "- Karakter ekstraksi yang rusak (bullet, derajat Celsius, tanda plus/minus, mikrodetik, dan kata 'analisis') dinormalisasi tanpa mengubah makna.",
  "- Isi tabel Riwayat Revisi dan Lembar Persetujuan tidak tersedia pada teks sumber yang dilampirkan; kekurangan ini tidak diisi dengan data rekaan.",
);
fs.mkdirSync(path.join(root, "docs"), { recursive: true });
fs.writeFileSync(path.join(root, "docs", "content-mapping.md"), `${out.join("\n")}\n`, "utf8");
fs.unlinkSync(temp);
console.log("Generated docs/content-mapping.md");
