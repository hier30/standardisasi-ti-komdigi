# Panduan Penggunaan Dashboard Daftar Standar TI KOMDIGI

**Nama aplikasi:** Dashboard Daftar Standar TI KOMDIGI  
**Nomor dokumen acuan:** ST-002/SJ.7/KITG/07/2024-01  
**Versi panduan:** 1.0  
**Tanggal dibuat:** 10 Agustus 2026  
**Instansi:** Kementerian Komunikasi dan Digital

---

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [Panduan untuk Guest](#2-panduan-untuk-guest)
3. [Panduan untuk Admin](#3-panduan-untuk-admin)
4. [FAQ](#4-faq)
5. [Kontak/PIC Teknis](#5-kontakpic-teknis)

---

## 1. Pendahuluan

### 1.1 Tujuan Dokumen

Dokumen ini menjadi panduan resmi penggunaan **Dashboard Daftar Standar TI KOMDIGI** bagi pengguna baru dan admin baru. Panduan ini menjelaskan cara mengakses dashboard, membaca data standar, mencari informasi, masuk sebagai admin, serta mengelola data standar TI melalui fitur administrasi.

Panduan ini ditulis dengan bahasa operasional agar dapat langsung digunakan saat pelatihan, serah terima sistem, maupun kegiatan pengelolaan data harian.

### 1.2 Ruang Lingkup

Panduan ini digunakan oleh:

- **Guest**, yaitu pengguna umum yang hanya membaca informasi standar TI tanpa login.
- **Admin**, yaitu pengelola sistem yang memiliki hak akses penuh untuk menambah, membaca, memperbarui, menghapus, mempublikasikan, mengarsipkan, dan mengelola data standar.
- **PIC teknis atau pengelola aplikasi**, yaitu pihak yang membantu apabila terdapat kendala akses, data, atau operasional.

Panduan ini mencakup penggunaan fitur utama dashboard, bukan panduan pengembangan kode aplikasi.

### 1.3 Ringkasan Sistem

Dashboard Daftar Standar TI KOMDIGI adalah aplikasi web untuk mendigitalisasi dokumen resmi **Standardisasi Teknologi Informasi Kementerian Komunikasi dan Digital**. Sistem ini membantu pengguna membaca daftar standar TI secara terstruktur berdasarkan kategori, sedangkan admin dapat mengelola data standar melalui halaman administrasi.

Kategori standar TI yang dicakup meliputi:

- Data Center
- Server
- Network
- Perangkat Keras Komunikasi
- End Device
- Aplikasi
- Pengelolaan Data
- Pengamanan
- Kompetensi SDM

### 1.4 Definisi Istilah

| Istilah | Definisi |
|---|---|
| Dashboard | Halaman utama yang menampilkan ringkasan dan navigasi menuju modul standar TI. |
| Guest | Pengguna yang tidak login dan hanya memiliki akses baca. |
| Admin | Pengguna yang login dan memiliki hak akses pengelolaan data. |
| Standar TI | Ketentuan atau acuan teknis yang berasal dari dokumen Standardisasi TI KOMDIGI. |
| Kategori | Pengelompokan standar berdasarkan domain, seperti Data Center, Aplikasi, End Device, Pengamanan, dan lainnya. |
| Subkategori | Pengelompokan lebih rinci di dalam kategori, misalnya Server, Storage, Software, atau Printer. |
| CRUD | Create, Read, Update, Delete; yaitu kemampuan menambah, membaca, memperbarui, dan menghapus data. |
| Draft | Data standar yang sudah disimpan tetapi belum dipublikasikan. |
| Berlaku | Status standar yang sudah aktif dan dapat dibaca pengguna. |
| Arsip | Status standar yang tidak ditampilkan sebagai standar aktif, tetapi masih tersimpan dalam sistem. |
| Obsolete | Perangkat atau sistem yang perlu dievaluasi karena usia, dukungan vendor, MTBF, atau masa garansi. |
| Supabase | Layanan backend yang digunakan untuk database PostgreSQL, autentikasi, API, dan pengamanan akses data. |
| RLS | Row Level Security; pembatasan akses data pada level database berdasarkan aturan keamanan. |

### 1.5 Tech Stack Singkat

| Komponen | Teknologi | Fungsi |
|---|---|---|
| Frontend | Next.js 14, React, TypeScript, Tailwind CSS | Menampilkan dashboard, halaman standar, pencarian, login, dan admin panel. |
| Backend | Supabase | Menyediakan API data, autentikasi, role, dan pengamanan akses. |
| Database | PostgreSQL di Supabase | Menyimpan data standar, kategori, subkategori, kompetensi, dokumen, obsolete, user, dan riwayat. |
| Auth | Supabase Auth | Mengatur proses login admin dan sesi pengguna. |
| Security | Supabase RLS | Membatasi akses data berdasarkan aturan dan role. |

---

## 2. Panduan untuk Guest

Guest adalah pengguna yang membuka dashboard tanpa login. Guest dapat membaca data standar TI, membuka detail standar, dan menggunakan pencarian. Guest tidak dapat menambah, mengubah, menghapus, mempublikasikan, atau mengarsipkan data.

### 2.1 Cara Mengakses Dashboard

**Langkah 1.** Buka browser, kemudian masukkan alamat dashboard pada kolom alamat browser. Gunakan URL resmi yang diberikan oleh pengelola sistem, misalnya `<URL-DASHBOARD>`.

[SCREENSHOT: Browser menampilkan kolom alamat dengan URL dashboard yang akan diakses]

**Langkah 2.** Tekan tombol **Enter** pada keyboard dan tunggu sampai halaman beranda dashboard tampil.

[SCREENSHOT: Halaman beranda Dashboard Daftar Standar TI KOMDIGI tampil dengan logo Komdigi dan sidebar navigasi]

**Langkah 3.** Pastikan Anda berada pada halaman **Beranda** dan tidak diminta untuk login. Apabila hanya ingin membaca standar, Anda tidak perlu masuk sebagai admin.

[SCREENSHOT: Halaman beranda publik dengan kartu modul standar terlihat]

> **Catatan:** Guest tidak perlu menggunakan email atau kata sandi. Tombol login hanya digunakan oleh admin.

### 2.2 Penjelasan Tampilan Utama/Beranda

**Langkah 1.** Perhatikan bagian sidebar di sisi kiri halaman. Sidebar berisi menu utama seperti **Beranda**, **Pusat Data**, **Aplikasi**, **End Device**, **Komunikasi**, **Pengamanan**, **Data**, **SDM**, **Obsolete**, dan **Referensi**.

[SCREENSHOT: Sidebar publik dengan daftar menu utama terlihat jelas]

**Langkah 2.** Perhatikan bagian ringkasan di halaman beranda. Bagian ini menampilkan informasi seperti total standar dan dokumen acuan yang sedang berlaku.

[SCREENSHOT: Area ringkasan beranda yang menampilkan total standar dan tanggal dokumen berlaku]

**Langkah 3.** Perhatikan kartu modul pada halaman beranda. Setiap kartu mewakili kelompok standar atau fitur, seperti Pusat Data, Pembangunan Aplikasi, End Device, Komunikasi, Pengamanan, Pengelolaan Data, Kompetensi SDM, dan Obsolete.

[SCREENSHOT: Kartu-kartu modul pada halaman beranda terlihat lengkap]

### 2.3 Cara Mencari Standar TI Berdasarkan Kategori

**Langkah 1.** Klik salah satu menu kategori pada sidebar, misalnya **Pusat Data**, **Aplikasi**, **End Device**, **Komunikasi**, **Pengamanan**, **Data**, atau **SDM**.

[SCREENSHOT: Sidebar dengan salah satu menu kategori sedang dipilih]

**Langkah 2.** Tunggu sampai halaman kategori terbuka. Baca judul halaman dan deskripsi singkat untuk memastikan kategori yang dibuka sudah benar.

[SCREENSHOT: Halaman kategori standar dengan judul dan daftar standar terlihat]

**Langkah 3.** Gulir halaman jika daftar standar lebih panjang dari layar. Pilih standar yang ingin dibaca lebih lanjut.

[SCREENSHOT: Daftar standar dalam suatu kategori dengan beberapa item terlihat]

### 2.4 Cara Melihat Detail Suatu Standar

**Langkah 1.** Pada halaman kategori atau daftar standar, klik nama standar yang ingin dibuka.

[SCREENSHOT: Daftar standar dengan salah satu nama standar siap diklik]

**Langkah 2.** Tunggu sampai halaman detail standar tampil. Pastikan judul standar, kategori, nomor referensi, versi, dan status standar terlihat.

[SCREENSHOT: Halaman detail standar dengan judul, metadata, dan status terlihat]

**Langkah 3.** Baca bagian detail teknis atau tabel ketentuan yang tersedia pada halaman tersebut.

[SCREENSHOT: Bagian detail teknis standar dengan label dan nilai ketentuan terlihat]

**Langkah 4.** Gunakan tombol kembali browser atau klik menu sidebar untuk kembali ke daftar standar lainnya.

[SCREENSHOT: Halaman detail standar dengan sidebar navigasi yang dapat digunakan untuk kembali ke menu lain]

### 2.5 Cara Menggunakan Pencarian dan Filter

**Langkah 1.** Klik kolom pencarian di bagian atas halaman yang bertuliskan **Cari standar atau komponen...**.

[SCREENSHOT: Kolom pencarian global pada header dashboard terlihat]

**Langkah 2.** Ketik kata kunci standar, komponen, atau istilah yang ingin dicari, misalnya `server`, `firewall`, `database`, atau `printer`.

[SCREENSHOT: Kolom pencarian berisi contoh kata kunci pencarian]

**Langkah 3.** Tekan **Enter** untuk membuka halaman hasil pencarian standar.

[SCREENSHOT: Halaman hasil pencarian standar berdasarkan kata kunci terlihat]

**Langkah 4.** Jika halaman menyediakan filter kategori atau kelompok, pilih filter yang sesuai untuk mempersempit hasil.

[SCREENSHOT: Halaman daftar standar dengan filter kategori atau kelompok terlihat]

**Langkah 5.** Klik standar yang paling sesuai dari hasil pencarian untuk membaca detailnya.

[SCREENSHOT: Hasil pencarian dengan salah satu standar siap dibuka]

> **Catatan:** Jika hasil pencarian tidak muncul, gunakan kata kunci yang lebih umum. Contoh: gunakan `network` atau `jaringan` daripada nama perangkat yang terlalu spesifik.

### 2.6 Batasan Akses Guest

Guest memiliki batasan sebagai berikut:

- Tidak dapat login ke halaman admin tanpa akun resmi.
- Tidak dapat menambah data standar.
- Tidak dapat mengedit data standar.
- Tidak dapat menghapus data standar.
- Tidak dapat mengubah kategori, subkategori, dokumen, kompetensi, atau kriteria obsolete.
- Tidak dapat melihat fitur pengelolaan data admin secara penuh.

---

## 3. Panduan untuk Admin

Admin adalah pengguna yang bertanggung jawab mengelola data standar TI. Bagian ini dibuat sangat rinci untuk admin baru yang belum pernah menggunakan sistem.

> **Perhatian:** Gunakan akun admin hanya untuk pekerjaan pengelolaan data resmi. Jangan membagikan email, kata sandi, atau sesi login kepada pengguna lain.

### 3.1 Cara Login ke Sistem

**Langkah 1.** Buka browser, kemudian masukkan alamat dashboard pada kolom alamat browser, misalnya `<URL-DASHBOARD>`.

[SCREENSHOT: Browser dengan URL dashboard pada kolom alamat]

**Langkah 2.** Setelah halaman beranda tampil, klik ikon atau tombol **Masuk Admin** pada bagian kanan atas halaman.

[SCREENSHOT: Halaman beranda dengan tombol atau ikon masuk admin di kanan atas terlihat]

**Langkah 3.** Pastikan halaman login terbuka. Halaman login menampilkan judul **Masuk ke Portal**, kolom **Email**, kolom **Kata Sandi**, pilihan **Ingat saya**, dan tombol **Masuk**.

[SCREENSHOT: Halaman login dengan field email, password, checkbox ingat saya, dan tombol masuk terlihat]

**Langkah 4.** Klik kolom **Email**, lalu masukkan email admin yang telah diberikan oleh pengelola sistem.

[SCREENSHOT: Kolom email pada halaman login terisi contoh alamat email admin]

**Langkah 5.** Klik kolom **Kata Sandi**, lalu masukkan kata sandi akun admin.

[SCREENSHOT: Kolom kata sandi pada halaman login terisi karakter tersamarkan]

**Langkah 6.** Jika perlu melihat kata sandi sementara, klik ikon mata pada kolom kata sandi. Klik kembali ikon tersebut untuk menyembunyikan kata sandi.

[SCREENSHOT: Ikon tampil/sembunyikan kata sandi pada kolom password terlihat]

**Langkah 7.** Jika menggunakan perangkat pribadi atau perangkat kerja yang aman, centang pilihan **Ingat saya**. Jika menggunakan perangkat bersama, jangan centang pilihan ini.

[SCREENSHOT: Checkbox ingat saya pada halaman login terlihat]

> **Perhatian:** Jangan gunakan fitur **Ingat saya** pada komputer umum atau komputer yang dipakai bersama.

**Langkah 8.** Klik tombol **Masuk** untuk memverifikasi akun admin.

[SCREENSHOT: Tombol Masuk pada halaman login sedang diklik]

**Langkah 9.** Tunggu proses verifikasi selesai. Jika kredensial benar dan akun memiliki role admin, sistem akan membuka halaman **Dashboard Admin**.

[SCREENSHOT: Dashboard Admin tampil dengan ringkasan standar aktif, kategori, role SDM, dan kriteria obsolete]

**Langkah 10.** Jika muncul pesan gagal login, periksa kembali email dan kata sandi. Pastikan tidak ada salah ketik, spasi tambahan, atau penggunaan akun non-admin.

[SCREENSHOT: Halaman login menampilkan pesan error email atau kata sandi tidak sesuai]

### 3.2 Penjelasan Navigasi Khusus Admin

**Langkah 1.** Setelah login, perhatikan sidebar admin di sisi kiri. Sidebar admin berbeda dari sidebar publik dan menampilkan menu pengelolaan.

[SCREENSHOT: Sidebar admin dengan label Pengelolaan Admin terlihat]

**Langkah 2.** Gunakan menu **Dashboard Admin** untuk melihat ringkasan data, pintasan pengelolaan, dan pembaruan terbaru.

[SCREENSHOT: Halaman Dashboard Admin dengan kartu statistik dan pintasan pengelolaan data]

**Langkah 3.** Gunakan menu **Standardisasi TI Komdigi** untuk membuka daftar standar yang dapat ditambah, diedit, dipublikasikan, diarsipkan, atau dihapus.

[SCREENSHOT: Halaman Kelola Standardisasi TI Komdigi dengan tabel data standar dan tombol aksi]

**Langkah 4.** Gunakan menu **Kategori** untuk mengatur kategori dan subkategori standar.

[SCREENSHOT: Halaman Kelola Kategori & Subkategori dengan kartu kategori dan tombol tambah kategori]

**Langkah 5.** Gunakan menu **SDM** untuk mengelola role kompetensi dan butir kompetensi.

[SCREENSHOT: Halaman kelola kompetensi SDM pada area admin]

**Langkah 6.** Gunakan menu **Obsolete** untuk mengelola kriteria evaluasi perangkat atau sistem obsolete.

[SCREENSHOT: Halaman admin obsolete dengan daftar kriteria dan tombol pengelolaan]

**Langkah 7.** Gunakan menu **Referensi** untuk memperbarui informasi dokumen, seperti nama dokumen, nomor standardisasi, unit penerbit, status, tanggal, tujuan, dan ruang lingkup.

[SCREENSHOT: Halaman edit informasi dokumen pada area admin]

**Langkah 8.** Gunakan menu **Riwayat** untuk melihat catatan aktivitas perubahan data.

[SCREENSHOT: Halaman riwayat perubahan data admin]

**Langkah 9.** Gunakan tombol **Kembali ke Portal** jika ingin melihat tampilan publik tanpa keluar dari sesi admin.

[SCREENSHOT: Sidebar admin dengan tombol Kembali ke Portal terlihat]

### 3.3 Cara Menambah Data Standar TI Baru

**Langkah 1.** Dari halaman admin, klik menu **Standardisasi TI Komdigi** pada sidebar.

[SCREENSHOT: Sidebar admin dengan menu Standardisasi TI Komdigi dipilih]

**Langkah 2.** Pada halaman kelola standar, klik tombol **Tambah Standar**.

[SCREENSHOT: Halaman Kelola Standardisasi TI Komdigi dengan tombol Tambah Standar terlihat]

**Langkah 3.** Pastikan halaman **Tambah Standardisasi TI Komdigi** terbuka. Halaman ini berisi bagian metadata standar dan bagian detail teknis.

[SCREENSHOT: Halaman Tambah Standardisasi TI Komdigi dengan form metadata dan detail teknis terlihat]

**Langkah 4.** Isi kolom **Versi** dengan versi standar, misalnya `2025.1`. Pastikan format versi konsisten dengan data yang sudah ada.

[SCREENSHOT: Kolom Versi pada form tambah standar terisi]

**Langkah 5.** Isi kolom **Nama Standar** dengan nama standar yang jelas dan sesuai dokumen acuan.

[SCREENSHOT: Kolom Nama Standar pada form tambah standar terisi]

**Langkah 6.** Periksa kolom **Slug**. Sistem dapat mengisi slug otomatis dari nama standar, tetapi admin tetap harus memastikan slug singkat, huruf kecil, dan tidak mengandung spasi.

[SCREENSHOT: Kolom Slug berisi teks huruf kecil dengan pemisah tanda hubung]

> **Catatan:** Slug digunakan pada alamat halaman detail standar. Gunakan contoh format `server-production` atau `pengamanan-aplikasi`.

**Langkah 7.** Pilih **Kategori** standar dari daftar pilihan yang tersedia. Contoh kategori meliputi Pusat Data & DRC, Pengembangan Aplikasi, Perangkat End Device, Perangkat Keras Komunikasi, Pengamanan Informasi, Pengelolaan Data, atau Kompetensi SDM.

[SCREENSHOT: Dropdown Kategori terbuka dan menampilkan pilihan kategori]

**Langkah 8.** Pilih **Subkategori** jika standar memiliki subkategori. Jika tidak ada subkategori yang sesuai, pilih **Tanpa subkategori**.

[SCREENSHOT: Dropdown Subkategori terbuka dan menampilkan pilihan yang sesuai kategori]

**Langkah 9.** Isi **Tanggal Berlaku** sesuai tanggal mulai berlakunya standar.

[SCREENSHOT: Field Tanggal Berlaku dengan date picker atau tanggal terisi]

**Langkah 10.** Isi **Tanggal Tinjau** sesuai jadwal peninjauan ulang standar.

[SCREENSHOT: Field Tanggal Tinjau dengan date picker atau tanggal terisi]

**Langkah 11.** Isi kolom **Deskripsi** dengan ringkasan standar minimal satu kalimat yang menjelaskan isi standar.

[SCREENSHOT: Kolom Deskripsi pada form tambah standar terisi]

> **Perhatian:** Kolom deskripsi wajib diisi dan sebaiknya tidak terlalu pendek agar pengguna memahami konteks standar.

**Langkah 12.** Isi kolom **Tujuan** dengan tujuan penerapan standar. Jika tujuan mengikuti pola umum, gunakan kalimat yang menjelaskan bahwa standar menjadi acuan teknis yang seragam, aman, efisien, dan konsisten.

[SCREENSHOT: Kolom Tujuan pada form tambah standar terisi]

**Langkah 13.** Isi kolom **Ruang Lingkup** dengan cakupan standar, misalnya perangkat, aplikasi, data, keamanan, atau domain teknis terkait.

[SCREENSHOT: Kolom Ruang Lingkup pada form tambah standar terisi]

**Langkah 14.** Isi kolom **Ketentuan Teknis** apabila terdapat ketentuan umum sebelum rincian detail teknis.

[SCREENSHOT: Kolom Ketentuan Teknis pada form tambah standar terisi]

**Langkah 15.** Isi kolom **Catatan Implementasi** jika ada informasi tambahan yang harus diperhatikan saat standar diterapkan.

[SCREENSHOT: Kolom Catatan Implementasi pada form tambah standar terisi]

**Langkah 16.** Isi kolom **Referensi Dokumen** dengan nomor atau sumber dokumen, misalnya `ST-002/SJ.7/KITG/07/2024-01 - Bagian 3.x.x`.

[SCREENSHOT: Kolom Referensi Dokumen pada form tambah standar terisi]

**Langkah 17.** Pada bagian **Detail Teknis**, isi field **Label 1** dengan nama atribut teknis, misalnya `Processor`, `Memori`, `Firewall`, `Database`, atau `Printer`.

[SCREENSHOT: Bagian Detail Teknis dengan field Label 1 terlihat dan terisi]

**Langkah 18.** Isi field **Satuan** jika atribut memiliki satuan, misalnya `GB`, `Gbps`, `tahun`, atau `unit`. Kosongkan jika tidak ada satuan.

[SCREENSHOT: Field Satuan pada detail teknis terisi atau dikosongkan sesuai kebutuhan]

**Langkah 19.** Isi field **Nilai/Ketentuan** dengan ketentuan minimal atau persyaratan utama dari atribut tersebut.

[SCREENSHOT: Field Nilai/Ketentuan pada detail teknis terisi]

> **Perhatian:** Field **Nilai/Ketentuan** wajib diisi. Hindari menulis data yang belum diverifikasi dari dokumen acuan.

**Langkah 20.** Isi field **Rekomendasi** jika ada nilai rekomendasi tambahan. Kosongkan jika tidak ada rekomendasi.

[SCREENSHOT: Field Rekomendasi pada detail teknis terisi atau kosong]

**Langkah 21.** Isi field **Catatan** jika ada keterangan tambahan, pengecualian, atau catatan implementasi khusus.

[SCREENSHOT: Field Catatan pada detail teknis terisi]

**Langkah 22.** Jika standar memiliki lebih dari satu detail teknis, klik tombol **Tambah detail**.

[SCREENSHOT: Tombol Tambah detail pada bagian Detail Teknis terlihat]

**Langkah 23.** Isi detail tambahan dengan pola yang sama: **Label**, **Satuan**, **Nilai/Ketentuan**, **Rekomendasi**, dan **Catatan**.

[SCREENSHOT: Detail teknis tambahan pada form tambah standar terlihat]

**Langkah 24.** Jika ada detail yang salah dan belum diperlukan, klik tombol **Hapus detail** pada blok detail tersebut.

[SCREENSHOT: Tombol Hapus detail pada salah satu blok detail teknis terlihat]

> **Catatan:** Sistem minimal membutuhkan satu detail teknis. Tombol hapus detail dapat tidak aktif apabila hanya tersisa satu detail.

**Langkah 25.** Periksa kembali seluruh field wajib sebelum menyimpan. Pastikan tidak ada nomor dokumen, kategori, tanggal, deskripsi, atau detail teknis yang kosong.

[SCREENSHOT: Form tambah standar terisi lengkap dari bagian metadata sampai detail teknis]

**Langkah 26.** Klik tombol **Simpan Draft** jika data belum final atau masih perlu diperiksa ulang.

[SCREENSHOT: Tombol Simpan Draft pada bagian bawah form tambah standar terlihat]

**Langkah 27.** Klik tombol **Publikasikan** jika data sudah final dan siap ditampilkan sebagai standar berlaku.

[SCREENSHOT: Tombol Publikasikan pada bagian bawah form tambah standar terlihat]

**Langkah 28.** Tunggu sampai muncul notifikasi bahwa standar berhasil disimpan atau dipublikasikan.

[SCREENSHOT: Notifikasi berhasil menyimpan atau mempublikasikan standar terlihat]

**Langkah 29.** Setelah sistem kembali ke halaman kelola standar, cari standar yang baru dibuat untuk memastikan data sudah masuk.

[SCREENSHOT: Tabel kelola standar menampilkan standar baru yang baru ditambahkan]

### 3.4 Cara Mengedit atau Memperbarui Data Standar

**Langkah 1.** Buka menu **Standardisasi TI Komdigi** dari sidebar admin.

[SCREENSHOT: Sidebar admin dengan menu Standardisasi TI Komdigi terlihat]

**Langkah 2.** Gunakan kolom pencarian **Cari nama standar...** untuk mencari standar yang ingin diperbarui.

[SCREENSHOT: Kolom pencarian di halaman kelola standar berisi kata kunci standar]

**Langkah 3.** Jika diperlukan, gunakan filter **Status** untuk menampilkan standar berstatus Berlaku, Draft, Perlu Ditinjau, atau Arsip.

[SCREENSHOT: Dropdown status pada halaman kelola standar terbuka]

**Langkah 4.** Jika diperlukan, gunakan pilihan urutan **Urutan data**, **Nama A-Z**, atau **Terbaru** untuk memudahkan pencarian.

[SCREENSHOT: Dropdown pengurutan pada halaman kelola standar terbuka]

**Langkah 5.** Pada baris standar yang ingin diubah, klik ikon **Edit**.

[SCREENSHOT: Tabel kelola standar dengan ikon Edit pada salah satu baris terlihat]

**Langkah 6.** Pastikan halaman edit standar terbuka dan data lama sudah terisi pada form.

[SCREENSHOT: Halaman edit standar dengan data lama pada field form terlihat]

**Langkah 7.** Perbarui field yang diperlukan, seperti nama standar, kategori, subkategori, tanggal tinjau, deskripsi, tujuan, ruang lingkup, ketentuan teknis, atau detail teknis.

[SCREENSHOT: Salah satu field pada halaman edit standar sedang diperbarui]

**Langkah 8.** Jika memperbarui detail teknis, pastikan setiap label dan nilai ketentuan tetap sesuai dokumen acuan.

[SCREENSHOT: Bagian Detail Teknis pada halaman edit standar sedang diperbarui]

**Langkah 9.** Klik **Simpan Draft** jika perubahan belum siap dipublikasikan.

[SCREENSHOT: Tombol Simpan Draft pada halaman edit standar terlihat]

**Langkah 10.** Klik **Publikasikan** jika perubahan sudah selesai dan standar harus tampil sebagai data berlaku.

[SCREENSHOT: Tombol Publikasikan pada halaman edit standar terlihat]

**Langkah 11.** Tunggu sampai muncul notifikasi berhasil.

[SCREENSHOT: Notifikasi standar berhasil diperbarui terlihat]

**Langkah 12.** Buka halaman detail standar untuk memastikan perubahan tampil sesuai yang diharapkan.

[SCREENSHOT: Halaman detail standar setelah perubahan dipublikasikan]

> **Catatan:** Jika Anda tidak yakin perubahan sudah benar, simpan sebagai draft terlebih dahulu dan lakukan pengecekan ulang sebelum publikasi.

### 3.5 Cara Mengarsipkan dan Memulihkan Data Standar

**Langkah 1.** Buka halaman **Standardisasi TI Komdigi** pada area admin.

[SCREENSHOT: Halaman kelola standar admin terbuka]

**Langkah 2.** Cari standar yang ingin diarsipkan.

[SCREENSHOT: Tabel standar dengan baris standar yang akan diarsipkan terlihat]

**Langkah 3.** Klik ikon **Arsipkan** pada baris standar tersebut.

[SCREENSHOT: Ikon arsip pada baris standar terlihat]

**Langkah 4.** Tunggu sampai status standar berubah menjadi **Arsip** atau muncul notifikasi status berhasil diperbarui.

[SCREENSHOT: Status standar berubah menjadi Arsip pada tabel admin]

**Langkah 5.** Untuk memulihkan standar yang diarsipkan, pilih filter status **Arsip**.

[SCREENSHOT: Filter status Arsip dipilih pada halaman kelola standar]

**Langkah 6.** Klik ikon **Pulihkan** pada standar yang berstatus arsip.

[SCREENSHOT: Ikon Pulihkan pada baris standar arsip terlihat]

**Langkah 7.** Tunggu sampai status standar diperbarui. Setelah dipulihkan, standar biasanya kembali menjadi draft dan perlu dipublikasikan ulang jika akan ditampilkan sebagai standar berlaku.

[SCREENSHOT: Status standar hasil pemulihan terlihat pada tabel admin]

### 3.7 Cara Menghapus Data Standar

**Langkah 1.** Buka menu **Standardisasi TI Komdigi** dari sidebar admin.

[SCREENSHOT: Sidebar admin dengan menu Standardisasi TI Komdigi dipilih]

**Langkah 2.** Cari standar yang akan dihapus menggunakan kolom pencarian atau filter status.

[SCREENSHOT: Kolom pencarian/filter standar digunakan untuk menemukan standar]

**Langkah 3.** Pastikan standar yang dipilih benar. Periksa nama, kategori, versi, dan statusnya.

[SCREENSHOT: Baris standar yang akan dihapus terlihat jelas pada tabel]

**Langkah 4.** Klik ikon **Hapus** pada baris standar tersebut.

[SCREENSHOT: Ikon Hapus pada baris standar terlihat]

**Langkah 5.** Baca dialog konfirmasi penghapusan. Dialog akan menjelaskan bahwa standar akan dihapus secara lunak dan tetap tercatat pada riwayat.

[SCREENSHOT: Dialog konfirmasi Hapus standar dengan deskripsi peringatan terlihat]

> **Perhatian:** Hapus data hanya jika standar memang tidak boleh digunakan lagi. Untuk data yang hanya tidak aktif sementara, gunakan fitur **Arsipkan**.

**Langkah 6.** Jika sudah yakin, klik tombol konfirmasi pada dialog penghapusan.

[SCREENSHOT: Tombol konfirmasi pada dialog Hapus standar terlihat]

**Langkah 7.** Tunggu sampai muncul notifikasi bahwa standar berhasil dihapus.

[SCREENSHOT: Notifikasi standar berhasil dihapus terlihat]

**Langkah 8.** Periksa tabel standar untuk memastikan standar tidak lagi tampil pada daftar aktif.

[SCREENSHOT: Tabel standar setelah data dihapus terlihat]

### 3.8 Cara Menghapus Banyak Standar Sekaligus

**Langkah 1.** Buka halaman **Standardisasi TI Komdigi** pada area admin.

[SCREENSHOT: Halaman kelola standar dengan tabel daftar standar terlihat]

**Langkah 2.** Centang kotak pilihan pada baris standar yang ingin diproses.

[SCREENSHOT: Beberapa checkbox baris standar sudah dicentang]

**Langkah 3.** Pastikan bar tindakan massal muncul di atas tabel. Bar ini menampilkan jumlah standar yang dipilih.

[SCREENSHOT: Bar tindakan massal dengan jumlah standar dipilih terlihat]

**Langkah 4.** Klik tombol **Hapus** pada bar tindakan massal jika seluruh standar yang dipilih memang akan dihapus.

[SCREENSHOT: Tombol Hapus pada bar tindakan massal terlihat]

> **Perhatian:** Tindakan massal berisiko menghapus beberapa data sekaligus. Periksa kembali daftar yang dicentang sebelum menekan tombol proses.

**Langkah 5.** Tunggu sampai muncul notifikasi bahwa sejumlah standar berhasil diproses.

[SCREENSHOT: Notifikasi pemrosesan massal standar berhasil terlihat]

### 3.9 Cara Mempublikasikan Banyak Standar Sekaligus

**Langkah 1.** Buka halaman **Standardisasi TI Komdigi** pada area admin.

[SCREENSHOT: Halaman kelola standar dengan tabel data standar terlihat]

**Langkah 2.** Centang standar berstatus draft yang sudah siap dipublikasikan.

[SCREENSHOT: Beberapa standar draft dicentang pada tabel admin]

**Langkah 3.** Klik tombol **Publikasikan** pada bar tindakan massal.

[SCREENSHOT: Tombol Publikasikan pada bar tindakan massal terlihat]

**Langkah 4.** Tunggu sampai notifikasi berhasil muncul dan status standar berubah menjadi **Berlaku**.

[SCREENSHOT: Tabel admin menunjukkan standar yang dipilih berubah status menjadi Berlaku]

### 3.10 Cara Mengelola Kategori

**Langkah 1.** Klik menu **Kategori** pada sidebar admin.

[SCREENSHOT: Sidebar admin dengan menu Kategori dipilih]

**Langkah 2.** Pastikan halaman **Kelola Kategori & Subkategori** terbuka. Halaman ini menampilkan kartu kategori, status aktif/nonaktif, jumlah standar yang menggunakan kategori, dan daftar subkategori.

[SCREENSHOT: Halaman Kelola Kategori & Subkategori dengan beberapa kartu kategori terlihat]

**Langkah 3.** Untuk menambah kategori, klik tombol **Tambah Kategori**.

[SCREENSHOT: Tombol Tambah Kategori pada halaman kategori terlihat]

**Langkah 4.** Isi field **Nama** dengan nama kategori yang akan ditambahkan.

[SCREENSHOT: Dialog Tambah Kategori dengan field Nama terisi]

**Langkah 5.** Isi field **Slug** dengan format huruf kecil tanpa spasi, misalnya `pengelolaan-data`.

[SCREENSHOT: Field Slug pada dialog kategori terisi]

**Langkah 6.** Isi field **Deskripsi** dengan penjelasan singkat kategori.

[SCREENSHOT: Field Deskripsi pada dialog kategori terisi]

**Langkah 7.** Pilih field **Ikon** sesuai karakter kategori, misalnya Server, Code, Shield, Database, atau Boxes.

[SCREENSHOT: Dropdown Ikon pada dialog kategori terbuka]

**Langkah 8.** Isi field **Urutan** dengan angka urutan tampil kategori.

[SCREENSHOT: Field Urutan pada dialog kategori terisi angka]

**Langkah 9.** Centang **Aktif** jika kategori akan digunakan dan ditampilkan dalam sistem.

[SCREENSHOT: Checkbox Aktif pada dialog kategori terlihat]

**Langkah 10.** Klik tombol **Simpan** untuk menyimpan kategori.

[SCREENSHOT: Tombol Simpan pada dialog kategori terlihat]

**Langkah 11.** Untuk mengedit kategori, klik ikon **Edit** pada kartu kategori yang ingin diperbarui.

[SCREENSHOT: Ikon Edit pada kartu kategori terlihat]

**Langkah 12.** Perbarui field yang diperlukan, lalu klik **Simpan**.

[SCREENSHOT: Dialog Edit Kategori dengan data kategori terisi]

**Langkah 13.** Untuk menonaktifkan atau mengaktifkan kategori, klik ikon **Aktif/nonaktif** pada kartu kategori.

[SCREENSHOT: Ikon power Aktif/nonaktif pada kartu kategori terlihat]

**Langkah 14.** Untuk menghapus kategori, klik ikon **Hapus** pada kartu kategori.

[SCREENSHOT: Ikon Hapus pada kartu kategori terlihat]

**Langkah 15.** Baca dialog konfirmasi penghapusan kategori, lalu lanjutkan hanya jika kategori belum digunakan oleh standar.

[SCREENSHOT: Dialog konfirmasi Hapus kategori terlihat]

> **Perhatian:** Kategori yang masih digunakan oleh standar tidak dapat dihapus. Pindahkan atau ubah data standar terlebih dahulu jika kategori benar-benar harus dihapus.

### 3.11 Cara Mengelola Subkategori

**Langkah 1.** Buka halaman **Kategori** pada area admin.

[SCREENSHOT: Halaman Kelola Kategori & Subkategori terbuka]

**Langkah 2.** Pilih kartu kategori yang akan diberi subkategori baru.

[SCREENSHOT: Salah satu kartu kategori dengan daftar subkategori terlihat]

**Langkah 3.** Klik tombol **Tambah subkategori** pada kartu kategori tersebut.

[SCREENSHOT: Tombol Tambah subkategori pada kartu kategori terlihat]

**Langkah 4.** Pastikan field **Kategori** sudah sesuai dengan kategori induk.

[SCREENSHOT: Dialog Tambah Subkategori dengan field Kategori terpilih]

**Langkah 5.** Isi field **Nama** subkategori.

[SCREENSHOT: Field Nama pada dialog subkategori terisi]

**Langkah 6.** Isi field **Slug** subkategori dengan format huruf kecil tanpa spasi.

[SCREENSHOT: Field Slug pada dialog subkategori terisi]

**Langkah 7.** Isi field **Deskripsi** subkategori.

[SCREENSHOT: Field Deskripsi pada dialog subkategori terisi]

**Langkah 8.** Isi field **Urutan** dengan angka urutan tampil.

[SCREENSHOT: Field Urutan pada dialog subkategori terisi]

**Langkah 9.** Centang **Aktif** jika subkategori masih digunakan.

[SCREENSHOT: Checkbox Aktif pada dialog subkategori terlihat]

**Langkah 10.** Klik tombol **Simpan Subkategori**.

[SCREENSHOT: Tombol Simpan Subkategori pada dialog subkategori terlihat]

**Langkah 11.** Untuk mengedit subkategori, klik ikon **Edit** di sebelah nama subkategori.

[SCREENSHOT: Ikon Edit di sebelah nama subkategori terlihat]

**Langkah 12.** Untuk menghapus subkategori, klik ikon **Hapus** di sebelah nama subkategori, lalu baca dialog konfirmasi.

[SCREENSHOT: Dialog konfirmasi Hapus subkategori terlihat]

> **Perhatian:** Subkategori yang masih digunakan oleh standar tidak dapat dihapus.

### 3.12 Cara Mengelola Kompetensi SDM

**Langkah 1.** Klik menu **SDM** pada sidebar admin.

[SCREENSHOT: Sidebar admin dengan menu SDM dipilih]

**Langkah 2.** Pilih role kompetensi yang ingin dikelola atau klik tombol tambah role jika tersedia pada halaman.

[SCREENSHOT: Halaman kelola kompetensi SDM dengan daftar role terlihat]

**Langkah 3.** Isi atau perbarui field **Nama Role** sesuai jabatan atau peran TI.

[SCREENSHOT: Form kompetensi dengan field Nama Role terisi]

**Langkah 4.** Pilih field **Level**, misalnya Dasar atau Profesional.

[SCREENSHOT: Dropdown Level pada form kompetensi terbuka]

**Langkah 5.** Isi field **Slug** dengan format huruf kecil tanpa spasi.

[SCREENSHOT: Field Slug role kompetensi terisi]

**Langkah 6.** Isi field **Deskripsi** untuk menjelaskan peran tersebut.

[SCREENSHOT: Field Deskripsi role kompetensi terisi]

**Langkah 7.** Isi field **Tags Role** dengan kata kunci yang dipisahkan koma jika diperlukan.

[SCREENSHOT: Field Tags Role berisi beberapa tag dipisahkan koma]

**Langkah 8.** Pada bagian kompetensi, isi nomor kompetensi, deskripsi kompetensi, kelompok kompetensi, dan tag kompetensi jika ada.

[SCREENSHOT: Bagian butir kompetensi pada form role terlihat]

**Langkah 9.** Klik **Tambah Kompetensi** jika role memiliki lebih dari satu butir kompetensi.

[SCREENSHOT: Tombol Tambah Kompetensi pada form role terlihat]

**Langkah 10.** Centang **Aktif** jika role kompetensi masih berlaku.

[SCREENSHOT: Checkbox Aktif pada form role kompetensi terlihat]

**Langkah 11.** Klik **Simpan Role** untuk menyimpan perubahan.

[SCREENSHOT: Tombol Simpan Role pada form kompetensi terlihat]

### 3.13 Cara Mengelola Kriteria Obsolete

**Langkah 1.** Klik menu **Obsolete** pada sidebar admin.

[SCREENSHOT: Sidebar admin dengan menu Obsolete dipilih]

**Langkah 2.** Pilih kriteria yang ingin diedit atau klik tombol tambah kriteria jika tersedia.

[SCREENSHOT: Halaman admin obsolete dengan daftar kriteria terlihat]

**Langkah 3.** Isi field **Nama** kriteria dengan nama yang mudah dipahami.

[SCREENSHOT: Form kriteria obsolete dengan field Nama terisi]

**Langkah 4.** Pilih field **Jenis Perangkat**, misalnya Semua, Server, atau Network device.

[SCREENSHOT: Dropdown Jenis Perangkat pada form obsolete terbuka]

**Langkah 5.** Pilih field **Tipe Kondisi**, misalnya Dukungan vendor, Usia, atau MTBF dan garansi.

[SCREENSHOT: Dropdown Tipe Kondisi pada form obsolete terbuka]

**Langkah 6.** Pilih field **Operator**, misalnya Sama dengan, Lebih dari, atau Kurang dari.

[SCREENSHOT: Dropdown Operator pada form obsolete terbuka]

**Langkah 7.** Isi field **Nilai** dan **Satuan** sesuai ketentuan kriteria.

[SCREENSHOT: Field Nilai dan Satuan pada form obsolete terisi]

**Langkah 8.** Isi field **Urutan** agar kriteria tampil dalam urutan yang benar.

[SCREENSHOT: Field Urutan pada form obsolete terisi]

**Langkah 9.** Isi field **Deskripsi** untuk menjelaskan kondisi obsolete.

[SCREENSHOT: Field Deskripsi kriteria obsolete terisi]

**Langkah 10.** Centang **Harus lewat masa garansi** jika kriteria hanya berlaku setelah masa garansi berakhir.

[SCREENSHOT: Checkbox Harus lewat masa garansi pada form obsolete terlihat]

**Langkah 11.** Centang **Aktif** jika kriteria masih digunakan.

[SCREENSHOT: Checkbox Aktif pada form obsolete terlihat]

**Langkah 12.** Klik **Simpan Kriteria**.

[SCREENSHOT: Tombol Simpan Kriteria pada form obsolete terlihat]

### 3.14 Cara Mengelola Informasi Dokumen/Referensi

**Langkah 1.** Klik menu **Referensi** pada sidebar admin.

[SCREENSHOT: Sidebar admin dengan menu Referensi dipilih]

**Langkah 2.** Pastikan halaman edit informasi dokumen terbuka.

[SCREENSHOT: Halaman edit informasi dokumen dengan form metadata terlihat]

**Langkah 3.** Perbarui field **Nama Dokumen** jika nama dokumen berubah.

[SCREENSHOT: Field Nama Dokumen pada form referensi terisi]

**Langkah 4.** Perbarui field **Nomor Dokumen** dan **Nomor Standardisasi** sesuai dokumen resmi.

[SCREENSHOT: Field Nomor Dokumen dan Nomor Standardisasi terlihat]

**Langkah 5.** Perbarui field **Unit Penerbit**, **Status**, **Tanggal Ditetapkan**, dan **Tanggal Berlaku**.

[SCREENSHOT: Field Unit Penerbit, Status, Tanggal Ditetapkan, dan Tanggal Berlaku terlihat]

**Langkah 6.** Perbarui field **Tujuan**, **Ruang Lingkup**, dan **Informasi Lampiran** jika diperlukan.

[SCREENSHOT: Field Tujuan, Ruang Lingkup, dan Informasi Lampiran terlihat]

**Langkah 7.** Klik tombol **Simpan Dokumen**.

[SCREENSHOT: Tombol Simpan Dokumen pada halaman referensi admin terlihat]

### 3.15 Cara Melihat Riwayat Perubahan

**Langkah 1.** Klik menu **Riwayat** pada sidebar admin.

[SCREENSHOT: Sidebar admin dengan menu Riwayat dipilih]

**Langkah 2.** Baca daftar aktivitas perubahan yang ditampilkan, termasuk jenis entitas, aksi, waktu, dan pengguna.

[SCREENSHOT: Tabel riwayat perubahan data terlihat]

**Langkah 3.** Gunakan riwayat sebagai acuan awal apabila terdapat data yang berubah, hilang, atau perlu ditelusuri.

[SCREENSHOT: Baris riwayat perubahan yang menunjukkan aksi update atau delete terlihat]

### 3.16 Cara Logout dari Sistem

**Langkah 1.** Pastikan Anda sudah selesai melakukan pengelolaan data.

[SCREENSHOT: Dashboard admin atau halaman admin yang sedang terbuka]

**Langkah 2.** Klik ikon **Keluar Admin** pada bagian kanan atas halaman.

[SCREENSHOT: Tombol atau ikon logout di kanan atas header admin terlihat]

**Langkah 3.** Tunggu sampai sistem kembali ke halaman publik atau sesi admin berakhir.

[SCREENSHOT: Halaman publik setelah admin logout terlihat]

**Langkah 4.** Jika menggunakan komputer bersama, tutup browser setelah logout.

[SCREENSHOT: Browser dengan halaman publik setelah logout siap ditutup]

> **Perhatian:** Selalu logout setelah selesai bekerja, terutama pada perangkat yang digunakan bersama.

### 3.17 Troubleshooting Umum

#### 3.17.1 Tidak Bisa Login

**Langkah 1.** Pastikan email admin sudah benar dan menggunakan format email yang valid.

[SCREENSHOT: Field email login dengan alamat email yang benar terlihat]

**Langkah 2.** Pastikan kata sandi sudah benar. Klik ikon mata jika perlu memeriksa sementara.

[SCREENSHOT: Field password login dengan ikon tampil/sembunyikan kata sandi terlihat]

**Langkah 3.** Jika pesan error tetap muncul, hubungi PIC teknis untuk memastikan akun Anda memiliki role admin.

[SCREENSHOT: Pesan error login atau akun tidak memiliki hak akses admin terlihat]

#### 3.17.2 Lupa Kata Sandi

**Langkah 1.** Klik tombol **Lupa kata sandi?** pada halaman login.

[SCREENSHOT: Tombol Lupa kata sandi pada halaman login terlihat]

**Langkah 2.** Jika sistem menampilkan informasi bahwa reset kata sandi belum tersedia, catat akun email Anda.

[SCREENSHOT: Pesan reset kata sandi belum tersedia terlihat]

**Langkah 3.** Hubungi PIC teknis atau administrator utama untuk proses reset kata sandi melalui pengelola autentikasi.

[SCREENSHOT: Catatan kontak PIC teknis atau instruksi reset password internal]

#### 3.17.3 Error Saat Submit Form

**Langkah 1.** Periksa field wajib yang belum diisi. Field seperti nama, slug, kategori, deskripsi, referensi dokumen, tanggal, dan detail teknis harus lengkap.

[SCREENSHOT: Form admin dengan pesan validasi field wajib terlihat]

**Langkah 2.** Periksa format slug. Gunakan huruf kecil, angka, dan tanda hubung. Jangan gunakan spasi.

[SCREENSHOT: Field slug dengan format yang benar terlihat]

**Langkah 3.** Periksa koneksi internet atau koneksi ke backend apabila sistem menggunakan Supabase production.

[SCREENSHOT: Halaman admin dengan notifikasi error koneksi atau submit gagal]

**Langkah 4.** Jika error tetap terjadi, dokumentasikan pesan error dan laporkan ke PIC teknis.

[SCREENSHOT: Pesan error submit form yang akan dilaporkan terlihat]

#### 3.17.4 Data Tidak Muncul Setelah Disimpan

**Langkah 1.** Periksa apakah data disimpan sebagai **Draft** atau sudah **Dipublikasikan**.

[SCREENSHOT: Tabel admin dengan status standar draft atau berlaku terlihat]

**Langkah 2.** Jika data masih draft, buka data tersebut lalu klik **Publikasikan** apabila sudah siap tampil sebagai data berlaku.

[SCREENSHOT: Halaman edit standar dengan tombol Publikasikan terlihat]

**Langkah 3.** Gunakan tombol reset filter atau kosongkan pencarian jika data tidak terlihat karena filter aktif.

[SCREENSHOT: Tombol Reset filter pada halaman kelola standar terlihat]

**Langkah 4.** Muat ulang halaman browser untuk memastikan data terbaru sudah terbaca.

[SCREENSHOT: Browser menampilkan halaman kelola standar setelah refresh]

#### 3.17.5 Kategori atau Subkategori Tidak Bisa Dihapus

**Langkah 1.** Periksa jumlah standar yang menggunakan kategori atau subkategori tersebut.

[SCREENSHOT: Kartu kategori menampilkan jumlah standar yang menggunakan kategori]

**Langkah 2.** Jika masih digunakan, pindahkan standar terkait ke kategori atau subkategori lain terlebih dahulu.

[SCREENSHOT: Form edit standar dengan dropdown kategori/subkategori terlihat]

**Langkah 3.** Setelah tidak digunakan, ulangi proses hapus kategori atau subkategori.

[SCREENSHOT: Dialog hapus kategori/subkategori setelah tidak digunakan oleh standar]

---

## 4. FAQ

### 4.1 Apakah Guest harus login untuk membaca standar?

Tidak. Guest dapat membuka dashboard dan membaca standar tanpa login.

### 4.2 Apa perbedaan Guest dan Admin?

Guest hanya dapat membaca data. Admin dapat menambah, mengedit, menghapus, mempublikasikan, mengarsipkan, mengelola kategori, mengelola kompetensi, mengelola obsolete, mengubah informasi dokumen, dan melihat riwayat perubahan.

### 4.3 Apa yang harus dilakukan jika data standar belum final?

Simpan data sebagai **Draft** terlebih dahulu. Publikasikan hanya setelah data diperiksa dan siap ditampilkan kepada pengguna.

### 4.4 Kapan fitur Arsip digunakan?

Gunakan arsip jika standar tidak ingin ditampilkan sebagai standar aktif, tetapi datanya masih perlu disimpan. Arsip lebih aman daripada hapus untuk data yang mungkin masih diperlukan.

### 4.5 Apakah data yang dihapus langsung hilang permanen?

Pada standar, penghapusan dilakukan secara lunak dan tetap tercatat pada riwayat. Namun, admin tetap harus berhati-hati karena data tidak lagi tampil sebagai data aktif.

### 4.6 Mengapa kategori tidak bisa dihapus?

Kategori tidak dapat dihapus jika masih digunakan oleh standar. Ubah kategori standar terkait terlebih dahulu sebelum menghapus kategori.

### 4.7 Mengapa standar yang baru dibuat tidak muncul di halaman publik?

Kemungkinan standar masih berstatus draft atau terkena filter pencarian. Buka halaman admin, periksa status standar, lalu publikasikan jika sudah siap.

### 4.8 Apa fungsi slug?

Slug digunakan sebagai bagian dari alamat halaman standar. Slug harus singkat, mudah dibaca, huruf kecil, dan tidak mengandung spasi.

### 4.9 Apakah admin dapat mengubah dokumen acuan?

Admin dapat memperbarui informasi dokumen melalui menu **Referensi** pada area admin, seperti nama dokumen, nomor standardisasi, unit penerbit, status, tanggal, tujuan, ruang lingkup, dan informasi lampiran.

### 4.10 Apa yang harus dilakukan jika lupa kata sandi?

Gunakan informasi pada tombol **Lupa kata sandi?**. Jika reset mandiri belum tersedia, hubungi PIC teknis atau administrator utama.

### 4.11 Apakah sistem bisa menggunakan SSO KOMDIGI?

Secara teknis dapat disiapkan apabila layanan SSO KOMDIGI mendukung protokol seperti OAuth 2.0, OpenID Connect, atau SAML. Integrasi tersebut memerlukan konfigurasi tambahan dari pengelola identitas instansi.

### 4.12 Apa backend yang digunakan sistem?

Sistem menggunakan **Supabase** sebagai backend. Supabase menyediakan database PostgreSQL, autentikasi, API, dan Row Level Security.

---

## 5. Kontak/PIC Teknis

Jika terjadi kendala teknis, hubungi PIC berikut:

| Kebutuhan | PIC/Unit | Kontak |
|---|---|---|
| Akses akun admin | Administrator Dashboard Daftar Standar TI KOMDIGI | `<nama.pic@komdigi.go.id>` |
| Reset kata sandi | PIC teknis aplikasi | `<nama.pic@komdigi.go.id>` |
| Koreksi data standar | Pengelola Standardisasi TI | `<nama.pic@komdigi.go.id>` |
| Gangguan aplikasi atau database | Tim pengembang/operasional sistem | `<nama.pic@komdigi.go.id>` |

> **Catatan:** Ganti placeholder kontak di atas dengan nama, unit, email, atau nomor layanan resmi yang ditetapkan oleh pengelola sistem.

---

## Lampiran A. Checklist Singkat Admin Baru

- Pastikan memiliki akun admin.
- Login melalui halaman `/login`.
- Pelajari menu admin sebelum mengubah data.
- Simpan draft jika data belum final.
- Publikasikan hanya data yang sudah diverifikasi.
- Gunakan arsip untuk data yang tidak aktif sementara.
- Hindari menghapus data tanpa persetujuan.
- Periksa riwayat setelah melakukan perubahan penting.
- Logout setelah selesai bekerja.

## Lampiran B. Placeholder Screenshot yang Perlu Diisi

Dokumen ini menggunakan placeholder `[SCREENSHOT: ...]` pada setiap langkah operasional. Saat finalisasi dokumen, ganti setiap placeholder dengan tangkapan layar aktual dari sistem sesuai deskripsi yang tertulis.
