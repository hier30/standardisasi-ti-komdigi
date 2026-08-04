# Setup Database dan Admin Supabase

## 1. Buat Project

Buat project Supabase baru pada organisasi milik Anda. Simpan URL project dan publishable key. Secret key tidak diperlukan oleh frontend.

## 2. Jalankan Migration

Buka SQL Editor dan jalankan:

`supabase/migrations/202608030001_initial_schema.sql`

Migration membuat tabel berikut:

- `profiles`
- `documents`
- `document_sections`
- `categories`
- `subcategories`
- `standards`
- `standard_details`
- `competency_roles`
- `competency_groups`
- `competencies`
- `obsolete_criteria`
- `audit_logs`

Migration juga membuat foreign key, unique constraint, index pencarian, trigger `updated_at`, trigger audit, soft delete pada standar, helper `is_admin()`, dan RLS.

## 3. Pilih Seed

Untuk penggunaan internal/private, jalankan `supabase/seed.sql`. File ini memuat seluruh konten hasil ekstraksi dokumen.

Untuk seminar atau demo publik, gunakan `supabase/seed-demo.sql`. Jangan menjalankan seed internal pada project publik tanpa persetujuan pemilik data.

Seed internal dapat dibuat ulang setelah data TypeScript diperbarui:

```bash
node scripts/generate-supabase-seed.mjs
node scripts/generate-content-mapping.mjs
```

## 4. Buat Admin Pertama

1. Buka Authentication > Users > Add user.
2. Isi email dan kata sandi admin.
3. Pastikan user telah terbentuk pada `auth.users`.
4. Trigger migration otomatis membuat record `profiles` dengan role `viewer`.
5. Jalankan:

```sql
update public.profiles
set role = 'admin', full_name = 'Administrator Standar TI'
where email = 'EMAIL_ADMIN';
```

## 5. Environment Lokal

Buat `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
```

Kedua variabel ini memang digunakan di browser dan tetap dibatasi oleh RLS. Jangan menambahkan secret key atau `SUPABASE_SERVICE_ROLE_KEY` ke frontend.

## 6. Model Akses

- Guest membaca dokumen berstatus `Berlaku`, kategori aktif, standar `berlaku` yang dipublikasikan dan belum dihapus, role aktif, serta kriteria obsolete aktif.
- Admin harus login dan memiliki `profiles.role = 'admin'` untuk mutation dan membaca audit log.
- Route `/admin/*` diverifikasi di `proxy.ts`, UI diverifikasi oleh `AdminGuard`, dan database memverifikasi kembali melalui RLS.
- Penghapusan standar mengisi `deleted_at`; data tidak hilang secara fisik.

## 7. Pemulihan

Untuk memulihkan standar yang di-soft-delete:

```sql
update public.standards
set deleted_at = null, status = 'draft', is_published = false
where id = 'ID_STANDAR';
```

Publikasikan kembali melalui halaman admin setelah data diperiksa.
