# Standardisasi TI Komdigi

Aplikasi Next.js untuk mendigitalisasi dokumen **Standardisasi Teknologi Informasi KOMDIGI** menjadi sistem informasi yang dapat dicari dan dikelola. Beranda dan sidebar mengikuti referensi dashboard yang disertakan, dengan mode produksi Supabase dan mode demo lokal.

## Fitur

- Katalog 36 standar teknis dengan 139 detail/baris sumber.
- Sidebar publik berisi Beranda serta sembilan menu: Pusat Data, Aplikasi, End Device, Komunikasi, Pengamanan, Data, SDM, Obsolete, dan Referensi.
- Enam halaman standar teknis berbentuk tabel informasi dengan pencarian dan filter kelompok.
- Detail standar, duplikasi, publikasi, arsip, pemulihan, dan soft delete.
- Tujuh kategori, 18 subkategori, 14 role, dan 119 butir kompetensi.
- Evaluator obsolete dinamis berdasarkan empat kriteria aktif.
- Informasi dokumen, referensi, dan ketentuan standardisasi.
- Login Supabase Auth, proteksi route admin, pemeriksaan role, RLS, dan audit log.
- CRUD admin untuk standar, kategori/subkategori, role/kompetensi, kriteria obsolete, dan metadata dokumen.
- Mode demo lokal sebagai fallback pengembangan; data disimpan di browser.

## Menjalankan Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Tanpa `.env.local`, aplikasi otomatis masuk **mode demo lokal**. Buka `/login`, lalu isi email dan kata sandi apa saja. Login demo hanya menguji alur UI dan bukan autentikasi produksi.

## Menghubungkan Supabase

1. Buat project Supabase milik Anda.
2. Jalankan `supabase/migrations/202608030001_initial_schema.sql` di SQL Editor.
3. Jalankan `supabase/seed.sql` untuk data internal lengkap. Jangan gunakan seed internal pada demo publik.
4. Salin `.env.example` menjadi `.env.local`, kemudian isi:

```env
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
```

5. Buat user admin melalui Supabase Authentication.
6. Ubah profil user tersebut menjadi admin:

```sql
update public.profiles
set role = 'admin', full_name = 'Nama Admin'
where email = 'admin@contoh.go.id';
```

7. Jalankan ulang aplikasi. Portal akan membaca dan menulis data PostgreSQL melalui Supabase; RLS tetap menjadi batas otorisasi utama.

Instruksi rinci tersedia di `docs/database-setup.md`. Jangan pernah menaruh service role key di variabel `NEXT_PUBLIC_*` atau source code.

## Verifikasi

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Deployment Vercel

Project ini siap diimpor ke Vercel sebagai project Next.js. Tambahkan dua environment variable Supabase di pengaturan Vercel untuk Production, Preview, dan Development. Deployment tidak dilakukan dari workspace ini karena dokumen bersifat internal dan membutuhkan izin eksplisit.

## Struktur Penting

- `app/`: route publik, login, dan admin.
- `components/`: layout, komponen portal, form admin, evaluator, dan komponen UI bergaya shadcn.
- `lib/internal-data.ts`: sumber data internal untuk mode demo dan generator seed.
- `supabase/migrations/`: schema, trigger, index, audit, dan RLS.
- `supabase/seed.sql`: seed internal lengkap.
- `supabase/seed-demo.sql`: seed aman berisi contoh generik.
- `docs/content-mapping.md`: pemetaan seluruh bagian sumber ke record dan halaman portal.
- `references/`: salinan sumber teks, PDF halaman 3-29, dan referensi desain; jangan dipublikasikan.
