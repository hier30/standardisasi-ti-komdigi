import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { evaluateObsolete } from "../lib/obsolete.ts";

const root = process.cwd();
const seed = fs.readFileSync(path.join(root, "supabase", "seed.sql"), "utf8");
const migration = fs.readFileSync(path.join(root, "supabase", "migrations", "202608030001_initial_schema.sql"), "utf8");
const adminForms = fs.readFileSync(path.join(root, "components", "admin-forms.tsx"), "utf8");

test("seed internal memuat seluruh record utama", () => {
  assert.equal((seed.match(/insert into public\.standards /g) || []).length, 36);
  assert.equal((seed.match(/insert into public\.standard_details /g) || []).length, 139);
  assert.equal((seed.match(/insert into public\.competency_roles /g) || []).length, 14);
  assert.equal((seed.match(/insert into public\.competencies /g) || []).length, 119);
  assert.equal((seed.match(/insert into public\.obsolete_criteria /g) || []).length, 4);
});

test("migration mengaktifkan RLS dan proteksi admin", () => {
  assert.match(migration, /alter table public\.standards enable row level security/);
  assert.match(migration, /create policy standards_public_read/);
  assert.match(migration, /create policy standards_admin_all/);
  assert.match(migration, /create or replace function public\.write_audit_log/);
  assert.match(migration, /grant select on table public\.documents,[\s\S]*public\.obsolete_criteria to anon/);
  assert.match(migration, /grant insert, update, delete on table public\.documents,[\s\S]*public\.obsolete_criteria to authenticated/);
  assert.match(migration, /revoke all on public\.audit_logs from anon, authenticated/);
});

test("aksi publikasi standar tidak bergantung pada state asinkron", () => {
  assert.match(adminForms, /const submit = \(intent: "draft" \| "publish"\) => form\.handleSubmit/);
  assert.match(adminForms, /type="button" onClick=\{submit\("publish"\)\}/);
  assert.doesNotMatch(adminForms, /setIntent\("publish"\)/);
});

const criteria = [
  { id: "eos", sourceNumber: "3.8.1", name: "EOS", deviceType: "semua", description: "Sudah EOS.", conditionType: "vendor_support", operator: "eq", conditionValue: "eos", requiresWarrantyExpired: false, sortOrder: 1, isActive: true },
  { id: "server", sourceNumber: "3.8.2.a", name: "Usia Server", deviceType: "server", description: "Server lebih dari 5 tahun.", conditionType: "age", operator: "gt", conditionValue: "5", conditionUnit: "tahun", requiresWarrantyExpired: false, sortOrder: 2, isActive: true },
  { id: "mtbf", sourceNumber: "3.8.3", name: "MTBF", deviceType: "semua", description: "MTBF kurang dari 30 hari dan garansi lewat.", conditionType: "mtbf_warranty", operator: "lt", conditionValue: "30", conditionUnit: "hari", requiresWarrantyExpired: true, sortOrder: 3, isActive: true },
];

test("evaluator obsolete mengikuti kriteria aktif", () => {
  assert.equal(evaluateObsolete(criteria, { deviceType: "server", acquisitionYear: 2018, vendorSupport: "supported", warranty: "active", mtbf: 60, currentYear: 2026 }).status, "Termasuk Obsolete");
  assert.equal(evaluateObsolete(criteria, { deviceType: "server", acquisitionYear: 2021, vendorSupport: "unknown", warranty: "active", mtbf: 60, currentYear: 2026 }).status, "Perlu Evaluasi");
  assert.equal(evaluateObsolete(criteria, { deviceType: "server", acquisitionYear: 2024, vendorSupport: "supported", warranty: "active", mtbf: 60, currentYear: 2026 }).status, "Belum Obsolete");
});

test("seluruh route utama tersedia", () => {
  const routes = ["app/page.tsx", "app/pusat-data/page.tsx", "app/aplikasi/page.tsx", "app/end-device/page.tsx", "app/komunikasi/page.tsx", "app/pengamanan/page.tsx", "app/data/page.tsx", "app/sdm/page.tsx", "app/obsolete/page.tsx", "app/referensi/page.tsx", "app/login/page.tsx", "app/admin/page.tsx", "app/admin/standar/page.tsx", "app/admin/kategori/page.tsx", "app/admin/kompetensi/page.tsx", "app/admin/obsolete/page.tsx", "app/admin/dokumen/page.tsx", "app/admin/riwayat/page.tsx"];
  for (const route of routes) assert.equal(fs.existsSync(path.join(root, route)), true, route);
});
