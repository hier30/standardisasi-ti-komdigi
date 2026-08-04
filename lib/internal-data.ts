import type {
  AuditLog,
  Category,
  CompetencyRole,
  ObsoleteCriterion,
  PortalDocument,
  PortalState,
  Standard,
  StandardDetail,
  Subcategory,
} from "@/lib/types";

const documentId = "doc-st-002";
const effectiveDate = "2025-10-03";
const reviewDate = "2026-10-03";

export const portalDocument: PortalDocument = {
  id: documentId,
  documentName: "Standardisasi Teknologi Informasi",
  documentNumber: "Standardisasi Teknologi Informasi",
  standardizationNumber: "ST-002/SJ.7/KITG/07/2024-01",
  issuingUnit: "Kementerian Komunikasi dan Digital - Sekretariat Jenderal",
  establishedDate: effectiveDate,
  effectiveDate,
  status: "Berlaku",
  purpose:
    "Standardisasi Teknologi Informasi (TI) ini disusun sebagai acuan dalam perencanaan, implementasi, dan pengelolaan perangkat serta layanan TI. Standardisasi ini tidak dimaksudkan untuk membatasi penggunaan teknologi, melainkan memastikan pemanfaatan TI tetap terarah, seragam, dan sesuai kebutuhan organisasi.",
  scope:
    "Infrastruktur TI; sistem informasi/aplikasi; data dan informasi; keamanan informasi/siber; serta kompetensi sumber daya manusia yang menggunakannya.",
  attachmentInformation: "Tidak ada.",
  sections: [
    {
      id: "section-1-1",
      sectionNumber: "1.1",
      title: "Latar Belakang",
      sortOrder: 1,
      content:
        "Perkembangan teknologi informasi yang cepat mendorong organisasi untuk terus beradaptasi dengan inovasi digital. Hal ini membuka peluang besar untuk meningkatkan produktivitas, transparansi, dan kualitas layanan. Namun, bersamaan dengan itu juga muncul tantangan seperti interoperabilitas sistem, keamanan data, serta kesiapan sumber daya manusia dalam menghadapi perubahan teknologi. Perbedaan cara penggunaan dan ketiadaan panduan yang seragam sering kali membuat layanan TI sulit diintegrasikan secara menyeluruh, bahkan berisiko menimbulkan masalah baru. Tanpa standar yang jelas, implementasi TI bisa berjalan tidak konsisten dan tidak terarah, menimbulkan duplikasi, serta menghambat kolaborasi antar unit kerja dan pencapaian tujuan organisasi. Untuk itu, dibutuhkan standardisasi TI yang menjadi pedoman bersama dalam perencanaan, pengembangan, dan penerapan teknologi agar setiap sistem saling terhubung, aman, efisien, dan konsisten.",
    },
    {
      id: "section-1-2",
      sectionNumber: "1.2",
      title: "Maksud dan Tujuan",
      sortOrder: 2,
      content:
        "Maksud: menjadi acuan dalam perencanaan, implementasi, dan pengelolaan perangkat serta layanan TI tanpa membatasi penggunaan teknologi. Tujuan: agar pengelolaan TI berjalan efektif, efisien, aman, dan konsisten melalui pedoman yang jelas mengenai teknologi yang harus disediakan, digunakan, dan dimiliki.",
    },
    {
      id: "section-1-3",
      sectionNumber: "1.3",
      title: "Manfaat",
      sortOrder: 3,
      content:
        "1) Menyediakan panduan yang jelas dalam perencanaan, pengembangan, implementasi, dan pemeliharaan layanan TI. 2) Menciptakan keseragaman standar TI untuk mengurangi kompleksitas, meningkatkan konsistensi, dan mempermudah manajemen TI. 3) Memastikan produk dan layanan TI memenuhi standar tertentu sehingga memiliki kualitas yang konsisten, andal, dan mudah dikendalikan. 4) Melindungi informasi sensitif dan mengurangi risiko terhadap keamanan informasi.",
    },
    {
      id: "section-1-4",
      sectionNumber: "1.4",
      title: "Ruang Lingkup",
      sortOrder: 4,
      content:
        "1) Infrastruktur TI. 2) Sistem informasi/aplikasi. 3) Data dan informasi. 4) Keamanan informasi/siber. 5) Kompetensi sumber daya manusia yang menggunakannya.",
    },
    {
      id: "section-2",
      sectionNumber: "2",
      title: "Ketentuan Pelaksanaan",
      sortOrder: 5,
      content:
        "1) Menjadi pedoman bagi seluruh pegawai Pusat Data dan Sarana Informatika (PDSI), serta dapat digunakan sebagai acuan standardisasi TI di lingkungan Kementerian Komunikasi dan Digital. 2) Berlaku sejak tanggal ditetapkan hingga digantikan dengan standardisasi baru. 3) Ditinjau ulang selambatnya satu tahun sejak ditetapkan dan diberlakukan. 4) Tetap berlaku otomatis pada periode yang sama jika tidak terdapat perubahan berdasarkan hasil peninjauan ulang.",
    },
    {
      id: "section-3",
      sectionNumber: "3",
      title: "Standardisasi Teknologi Informasi",
      sortOrder: 6,
      content:
        "Mencakup tujuh hal: Pusat Data/DC dan DRC; pembangunan dan pengembangan aplikasi; perangkat end device; perangkat keras komunikasi; pengamanan informasi; pengelolaan data; dan kompetensi sumber daya manusia.",
    },
    {
      id: "section-4",
      sectionNumber: "4",
      title: "Lampiran",
      sortOrder: 7,
      content: "Tidak ada.",
    },
  ],
  references: [
    {
      name: "Keputusan Menteri Komunikasi dan Informatika Nomor 320 Tahun 2023 tentang Pedoman Tata Kelola SPBE",
      section: "Ketentuan Umum; Kebijakan Internal Sistem Pemerintahan Berbasis Elektronik",
    },
    { name: "COBIT 2019", section: "APO01 - Managed I&T Management Framework" },
    { name: "ITIL v4", section: "Service Value System (SVS)" },
    { name: "ISO 27001, Information Security Management Systems", section: "Klausul 5.2 - Information Security Policy" },
  ],
  definitions: [
    { term: "Integrasi", definition: "Proses menghubungkan antar teknologi untuk menyederhanakan dan mengotomatisasi proses bisnis." },
    { term: "Kompatibilitas", definition: "Kesesuaian antar teknologi agar dapat berfungsi bersama, terutama saat dilakukan integrasi." },
    { term: "Precision Air Conditioner (PAC)", definition: "Sistem pendingin yang menjaga suhu dan kelembapan ruangan secara konstan untuk perangkat komputer yang membutuhkan pendinginan berkelanjutan." },
    { term: "Personal Computer (PC)", definition: "Komputer serba guna untuk penggunaan individu dan dioperasikan langsung oleh pengguna akhir." },
    { term: "Pengguna", definition: "Individu/pegawai ASN atau satuan/unit organisasi di lingkungan Kementerian Komunikasi dan Digital yang memanfaatkan layanan TI." },
    { term: "Port", definition: "Antarmuka fisik atau logis yang memungkinkan komputer terhubung dengan perangkat lain atau berkomunikasi dalam jaringan." },
    { term: "Pusat Data atau Data Center (DC)", definition: "Fasilitas penempatan sistem elektronik dan komponen terkait untuk penempatan, penyimpanan, pengolahan, dan pemulihan data." },
    { term: "Disaster Recovery Center (DRC)", definition: "Pusat Data cadangan untuk pencadangan dan pemulihan layanan bila terjadi gangguan, kegagalan, atau kerusakan pada pusat data utama." },
    { term: "Uninterruptible Power Supply (UPS)", definition: "Perangkat penyedia daya cadangan berbasis baterai yang memastikan suplai listrik tetap tersedia tanpa gangguan." },
  ],
};

export const categories: Category[] = [
  { id: "cat-dc", name: "Pusat Data & DRC", slug: "pusat-data-drc", description: "Lingkungan pusat data, server, storage, network, dan software pendukung.", icon: "server", sortOrder: 1, isActive: true, updatedAt: effectiveDate },
  { id: "cat-app", name: "Pengembangan Aplikasi", slug: "pengembangan-aplikasi", description: "Platform, framework, bahasa pemrograman, database, dan toolchain.", icon: "code", sortOrder: 2, isActive: true, updatedAt: effectiveDate },
  { id: "cat-end", name: "Perangkat End Device", slug: "perangkat-end-device", description: "PC, notebook, software pengguna akhir, dan printer.", icon: "laptop", sortOrder: 3, isActive: true, updatedAt: effectiveDate },
  { id: "cat-net", name: "Perangkat Keras Komunikasi", slug: "perangkat-keras-komunikasi", description: "Core, distribution, access, firewall, kabel, dan monitoring jaringan.", icon: "network", sortOrder: 4, isActive: true, updatedAt: effectiveDate },
  { id: "cat-sec", name: "Pengamanan Informasi", slug: "pengamanan-informasi", description: "Kontrol keamanan fisik, server, aplikasi, jaringan, dan endpoint.", icon: "shield", sortOrder: 5, isActive: true, updatedAt: effectiveDate },
  { id: "cat-data", name: "Pengelolaan Data", slug: "pengelolaan-data", description: "Interoperabilitas, protokol, Satu Data Indonesia, dan GIS.", icon: "database", sortOrder: 6, isActive: true, updatedAt: effectiveDate },
  { id: "cat-competency", name: "Kompetensi SDM", slug: "kompetensi-sdm", description: "Standar kompetensi untuk empat belas role teknologi informasi.", icon: "graduation", sortOrder: 7, isActive: true, updatedAt: effectiveDate },
];

export const subcategories: Subcategory[] = [
  ["sub-dc-env", "cat-dc", "Data Center Environment", "data-center-environment", 1],
  ["sub-server", "cat-dc", "Server", "server", 2],
  ["sub-storage", "cat-dc", "Storage", "storage", 3],
  ["sub-dc-network", "cat-dc", "Network", "network-dc", 4],
  ["sub-dc-software", "cat-dc", "Software", "software-dc", 5],
  ["sub-platform", "cat-app", "Platform Aplikasi", "platform-aplikasi", 1],
  ["sub-toolchain", "cat-app", "Toolchain", "toolchain", 2],
  ["sub-pc", "cat-end", "PC & Notebook", "pc-notebook", 1],
  ["sub-end-software", "cat-end", "Software End Device", "software-end-device", 2],
  ["sub-printer", "cat-end", "Printer", "printer", 3],
  ["sub-layer", "cat-net", "Network Layer", "network-layer", 1],
  ["sub-wireless", "cat-net", "Wireless & Security", "wireless-security", 2],
  ["sub-cabling", "cat-net", "Backbone & Cabling", "backbone-cabling", 3],
  ["sub-monitoring", "cat-net", "Monitoring", "monitoring", 4],
  ["sub-sec-infra", "cat-sec", "Keamanan Infrastruktur", "keamanan-infrastruktur", 1],
  ["sub-sec-app", "cat-sec", "Keamanan Aplikasi", "keamanan-aplikasi", 2],
  ["sub-interop", "cat-data", "Interoperabilitas", "interoperabilitas", 1],
  ["sub-gis", "cat-data", "GIS", "gis", 2],
].map(([id, categoryId, name, slug, sortOrder]) => ({
  id: String(id), categoryId: String(categoryId), name: String(name), slug: String(slug),
  description: `Standar ${String(name)} sesuai dokumen ST-002.`, sortOrder: Number(sortOrder), isActive: true,
}));

const d = (label: string, value: string, sortOrder: number, notes?: string): StandardDetail => ({
  id: `detail-${sortOrder}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  label,
  minimumValue: value,
  recommendedValue: "",
  notes,
  sortOrder,
});

function standard(
  sourceNumber: string,
  name: string,
  slug: string,
  categoryId: string,
  subcategoryId: string,
  details: StandardDetail[],
  technicalProvisions = "",
): Standard {
  return {
    id: `std-${sourceNumber.replace(/\./g, "-")}`,
    documentId,
    categoryId,
    subcategoryId,
    sourceNumber,
    name,
    slug,
    description: `Ketentuan resmi ${name} dalam Standardisasi Teknologi Informasi KOMDIGI.`,
    purpose: "Menjadi acuan teknis yang seragam, aman, efisien, dan konsisten di lingkungan KOMDIGI.",
    scope: categories.find((category) => category.id === categoryId)?.name,
    technicalProvisions,
    version: "2025.1",
    status: "berlaku",
    effectiveDate,
    reviewDate,
    documentReference: `${portalDocument.standardizationNumber} - Bagian ${sourceNumber}`,
    sortOrder: Number(sourceNumber.split(".").map((part) => part.padStart(2, "0")).join("")),
    isPublished: true,
    updatedAt: effectiveDate,
    details: details.map((detail) => ({ ...detail, id: `detail-${sourceNumber.replace(/\./g, "-")}-${detail.sortOrder}` })),
  };
}

export const standards: Standard[] = [
  standard("3.1.1", "Data Center Environment", "data-center-environment", "cat-dc", "sub-dc-env", [
    d("Rack", "Ukuran minimal 42U universal rack atau EIA standard 19 inci; minimal 2 unit PDU di dalam rack.", 1),
    d("UPS", "Kapasitas beban rata-rata tidak lebih dari 80% kapasitas UPS; memiliki pelaporan, pemantauan kinerja, dan sistem peringatan.", 2),
    d("PAC", "Menjaga suhu 18-24 C dan kelembapan relatif 50-55%.", 3),
    d("Floor", "Raised Floor +/- 30 cm.", 4),
    d("Sistem Pemadam", "Auto fire suppression system terintegrasi dengan detection/monitoring system.", 5),
    d("Sistem Pemantauan Video", "Penyimpanan rekaman minimal sampai dengan 1 bulan.", 6),
    d("Environment Monitoring System", "Suhu; kelembapan relatif; asap kebakaran; kebocoran air; tegangan listrik; peringatan kebakaran.", 7),
    d("Power Source", "Rack Server minimal 2 power source dengan jalur berbeda dan masing-masing menggunakan UPS; Pusat Data minimal 2 power source berbeda.", 8),
    d("Genset", "Mencakup beban jaringan, server/storage, penerangan, PAC, dan perangkat pendukung; tangki bahan bakar untuk operasi sampai dengan sekitar 8 jam.", 9),
    d("Environment Pusat Data", "Suhu 18-26 C; kelembapan relatif 50-60%.", 10),
    d("Aplikasi Pendukung", "Aplikasi Monitoring Perangkat TIK; Aplikasi Manajemen Aset; Aplikasi Pengelolaan Visitor.", 11),
  ]),
  standard("3.1.2.1", "Server Production", "server-production", "cat-dc", "sub-server", [
    d("Processor", "Kelas menengah-atas", 1), d("Memori", "Minimal 512 GB", 2), d("Penyimpanan Internal", "SSD 512 GB", 3), d("Konektivitas Jaringan", "10 GB", 4),
  ]),
  standard("3.1.2.2", "Server Disaster Recovery", "server-disaster-recovery", "cat-dc", "sub-server", [
    d("Processor", "Kelas menengah-atas", 1), d("Memori", "Minimal 512 GB", 2), d("Penyimpanan Internal", "SSD 512 GB", 3), d("Konektivitas Jaringan", "10 GB", 4),
  ]),
  standard("3.1.3.1", "Storage Production", "storage-production", "cat-dc", "sub-storage", [
    d("Tipe Penyimpanan", "SSD; NVMe", 1), d("Kinerja", "IOPS 100.000 iops; latensi maksimal 1 ms; throughput minimal 5 Gbps aggregate.", 2), d("Protocol", "SAN; NAS; Object Storage", 3), d("Redundansi", "Controller; PSU; Hot-swap", 4),
  ]),
  standard("3.1.3.2", "Storage Disaster Recovery", "storage-disaster-recovery", "cat-dc", "sub-storage", [
    d("Tipe Penyimpanan", "SSD; NVMe", 1), d("Kinerja", "IOPS 100.000 iops; latensi maksimal 1 ms; throughput minimal 5 Gbps aggregate.", 2), d("Protocol", "SAN; NAS; Object Storage", 3), d("Redundansi", "Controller; PSU; Hot-swap", 4),
  ]),
  standard("3.1.3.3", "Storage Cold Backup", "storage-cold-backup", "cat-dc", "sub-storage", [
    d("Tipe Penyimpanan", "HDD; SSD", 1), d("Kinerja", "IOPS 5.000 iops; latensi maksimal 15 ms; throughput minimal 1 Gbps aggregate.", 2), d("Protocol", "SAN; NAS; Object Storage", 3), d("Redundansi", "Controller; PSU; Hot-swap", 4),
  ]),
  standard("3.1.4.1", "Production Network", "production-network", "cat-dc", "sub-dc-network", [
    d("Port Uplink", "Minimal 10 GbE", 1), d("Jumlah Port", "Minimal 24 port", 2), d("Throughput", "Minimal 64 Gbps", 3), d("Latensi", "Maksimal 5 mikrodetik", 4),
  ]),
  standard("3.1.4.2", "Storage Network", "storage-network", "cat-dc", "sub-dc-network", [
    d("Port Speed", "Minimal 8 Gbps FC", 1), d("Jumlah Port", "Minimal 24 port", 2), d("Throughput", "Minimal 512 Gbps", 3), d("Latensi", "Maksimal 5 mikrodetik", 4),
  ]),
  standard("3.1.5", "Software Pusat Data", "software-pusat-data", "cat-dc", "sub-dc-software", [
    d("Virtualisasi", "Minimal VMWare ESXi 8.0", 1),
    d("Operating System", "Linux LTS selama masih supported dan updated; Windows Server 2019.", 2, "Pengguna wajib menyediakan/mengadakan lisensi sendiri."),
    d("Monitoring Tools", "Zabbix 6.0 LTS; Uptime Kuma 1.23.16", 3), d("Manajemen Aset", "Netbox DCIM v4", 4), d("SSL", "RSA-Key minimum 2048 bit", 5), d("Container", "Kubernetes", 6),
  ]),
  standard("3.2.1", "Sistem Operasi Aplikasi", "sistem-operasi-aplikasi", "cat-app", "sub-platform", [
    d("Operation System", "AlmaLinux 8.10; Ubuntu 22.04 LTS; Windows Server 2019; Debian 11 (Bullseye).", 1, "Lisensi Windows disediakan oleh pengguna."),
  ]),
  standard("3.2.2", "Kerangka Pemrograman", "kerangka-pemrograman", "cat-app", "sub-platform", [
    d("Back-End", "Laravel 10.x; CodeIgniter 4.x", 1), d("Front-End", "Next.js 13.x; Livewire 3.x; Angular 15", 2),
  ]),
  standard("3.2.3", "Bahasa Pemrograman", "bahasa-pemrograman", "cat-app", "sub-platform", [
    d("Back-End", "PHP 8.1; Golang 1.20; Java 17 LTS; Nodejs 18 LTS", 1), d("Front-End", "Nodejs 18 LTS", 2),
  ]),
  standard("3.2.4", "Database", "database", "cat-app", "sub-platform", [d("Database Management System", "PostgreSQL 14", 1)]),
  standard("3.2.5", "Application Server", "application-server", "cat-app", "sub-platform", [d("Server", "Apache 2.4.50; NGINX 1.22 (LTS)", 1)]),
  standard("3.2.6", "Toolchain Pengembangan", "toolchain-pengembangan", "cat-app", "sub-toolchain", [
    d("Source Code Management", "GIT 2.30", 1), d("Load Test", "Locust 2.0; Jmeter 5.4", 2), d("Security Test", "ZAP OWASP 2.10", 3), d("Static Analytics", "Sonar 9 LTS; Guardrails SaaS 2023+", 4), d("Test Automation", "Playwright 1.30", 5), d("Performance & Correctness Website", "Lighthouse (https://pagespeed.web.dev/)", 6),
  ]),
  standard("3.3.1", "PC atau Notebook Standar", "pc-notebook-standar", "cat-end", "sub-pc", [
    d("Processor", "Prosesor kelas mid-end (Intel Core i5 atau setara)", 1), d("Memori", "Minimal 8 GB DDR4", 2), d("Storage", "Minimal SSD 256 GB", 3), d("Graphic Card", "Integrated graphics card", 4), d("Display", "1920 x 1080 Full HD", 5), d("Connectivity Interface", "Support dual channel wireless", 6), d("Operating System", "Microsoft Windows 11; Linux LTS; MacOS 12 Monterey", 7),
  ]),
  standard("3.3.2", "PC atau Notebook Khusus", "pc-notebook-khusus", "cat-end", "sub-pc", [
    d("Processor", "Prosesor kelas high-end (minimum Intel Core i7 atau setara)", 1), d("Memori", "Minimal 16 GB DDR4", 2), d("Storage", "Minimal SSD 500 GB", 3), d("Graphic Card", "Dedicated graphics card", 4), d("Display", "1920 x 1080 Full HD", 5), d("Connectivity Interface", "Support dual channel wireless", 6), d("Operating System", "Microsoft Windows 11; MacOS 14 Sonoma; Linux LTS", 7),
  ]),
  standard("3.3.3", "Pengaturan Penggunaan PC atau Notebook", "pengaturan-penggunaan-pc-notebook", "cat-end", "sub-pc", [
    d("Pegawai tidak mobile", "PC Standar", 1), d("Pegawai mobile", "Notebook Standar", 2), d("Pekerjaan khusus dan tidak mobile", "PC Khusus", 3), d("Pekerjaan khusus dan mobile", "Notebook Khusus", 4), d("Menteri, Pejabat Eselon 1 dan Eselon 2", "PC Khusus dan Notebook Khusus", 5),
  ], "Mobile berarti melakukan pekerjaan utama di luar kantor."),
  standard("3.3.4", "Software End Device", "software-end-device", "cat-end", "sub-end-software", [
    d("Office Productivity", "Microsoft 365 / Office 2019; Office Open Source", 1), d("Internet Browser", "Chrome 136; Mozilla Firefox 138; Safari 16; Microsoft Edge 140", 2), d("Anti-malware", "Windows Defender; Bitdefender; Kaspersky; TrendMicro; MalwareBytes; SentinelOne; CyberReason; Avira", 3, "Auto update wajib diaktifkan."),
  ], "PC/Notebook termasuk gadget produksi di bawah tahun 2019 agar dilakukan pembaruan segera."),
  standard("3.3.5", "Ketentuan Software pada PC atau Notebook", "ketentuan-software-pc-notebook", "cat-end", "sub-end-software", [
    d("Software Lain", "Diperbolehkan selama legal dan merupakan versi terbaru yang dikeluarkan pengembang/principal.", 1), d("Lisensi", "Jika software membutuhkan lisensi, pengguna wajib melakukan pengadaan lisensi tersebut.", 2), d("Keamanan", "Pengguna tidak dibolehkan menginstal software yang dapat melakukan bypass sistem keamanan.", 3),
  ]),
  standard("3.3.6", "Printer", "printer", "cat-end", "sub-printer", [
    d("Jenis Printer", "Perkantoran umum: multi-function printer; presentasi/laporan: printer laser berwarna; printer khusus ID Card; printer khusus Surat Izin Radio.", 1), d("Konektivitas", "Semua printer terhubung ke LAN dengan kabel; direct connection/wifi hotspot wajib dinonaktifkan; printer server bersifat opsional.", 2),
  ]),
  standard("3.4.1", "Core Layer", "core-layer", "cat-net", "sub-layer", [
    d("Tipe Perangkat", "Switch/Router", 1), d("Jumlah Port Minimum", "16 port (Switch) / 8 port (Router)", 2), d("Tipe Konektor", "Mendukung 10GbE SFP+", 3), d("Performance", "Switch: switching capacity up to 300 Gbps; Router: throughput up to 10 Gbps", 4), d("Routing Protocol", "Static routing; Dynamic Routing (RIP, OSPF, BGP)", 5),
  ]),
  standard("3.4.2", "Distribution Layer", "distribution-layer", "cat-net", "sub-layer", [
    d("Tipe Perangkat", "Switch/Router", 1), d("Jumlah Port Minimum", "16 port (Switch) / 8 port (Router)", 2), d("Tipe Konektor", "Mendukung 10GbE SFP+", 3), d("Performance", "Switch: switching capacity up to 200 Gbps; Router: throughput up to 5 Gbps", 4), d("Routing Protocol", "Static routing; Dynamic Routing minimal RIP dan OSPF", 5),
  ]),
  standard("3.4.3", "Access Layer", "access-layer", "cat-net", "sub-layer", [
    d("Tipe Perangkat", "Switch", 1), d("Jumlah Port Minimum", "24 port", 2), d("Tipe Konektor", "Predominant port: 1GbE RJ-45; uplink port: 10GbE SFP+", 3), d("Switching Capacity", "Up to 120 Gbps", 4), d("Routing Protocol", "Minimal static routing", 5), d("Fitur Layer 2", "IEEE 802.1q; Support Link Aggregation", 6), d("Security", "Port Security; DHCP Snooping; ARP Inspection", 7),
  ]),
  standard("3.4.4", "Access Point", "access-point", "cat-net", "sub-wireless", [
    d("Frequency", "Concurrent dual-band 2.4 GHz/5 GHz; support static channel frekuensi 2,4 GHz/5 GHz", 1), d("Security", "Mendukung autentikasi WPA 3", 2), d("Interface", "Gigabit Ethernet (RJ-45)", 3), d("Management", "Standalone (web-based management); direkomendasikan mendukung controller platform", 4), d("Power", "Support 802.3at PoE+", 5),
  ]),
  standard("3.4.5", "Firewall", "firewall", "cat-net", "sub-wireless", [
    d("Interface", "Minimal 1 GB, support 10 GB", 1), d("Throughput", "Minimal 2 Gbps", 2), d("IPS Throughput", "Minimal 1 Gbps", 3), d("Proteksi", "IPS/IDS (Vulnerability Protection); Anti-Spyware; Anti-Virus; URL Filtering", 4), d("Kondisi saat Firewall Off", "Tidak pass through", 5),
  ]),
  standard("3.4.6", "Backbone", "backbone", "cat-net", "sub-cabling", [d("Media", "Fiber Optic", 1)]),
  standard("3.4.7", "LAN Cable", "lan-cable", "cat-net", "sub-cabling", [
    d("Tipe Kabel", "CAT 6", 1), d("Label", "Setiap kabel memiliki label identifikasi unik pada kedua ujung awal dan akhir.", 2),
  ]),
  standard("3.4.8", "Sistem dan Aplikasi Monitoring", "sistem-aplikasi-monitoring", "cat-net", "sub-monitoring", [
    d("Tools", "Air Checker/Spectrum RF Analysis; Cable tracer", 1), d("Application/Software", "Zabbix 6.0 LTS; Uptime Kuma 1.23.16; Solarwind 2023.3.0", 2),
  ]),
  standard("3.5.1", "Pengamanan DC dan DRC", "pengamanan-dc-drc", "cat-sec", "sub-sec-infra", [
    d("Keamanan Fisik", "Control Access Door (ID dan/atau biometrik); CCTV; rack server wajib terkunci", 1),
  ]),
  standard("3.5.2", "Pengamanan Server", "pengamanan-server", "cat-sec", "sub-sec-infra", [
    d("Endpoint Protection", "Setiap server/virtual server wajib terpasang endpoint protection", 1), d("Log", "Menyimpan log akses minimal selama 90 hari kalender", 2), d("Port", "Default dibuka hanya port 80 dan 443", 3), d("IP Address", "Segmentasi/NAT/Bukan IP Publik", 4),
  ]),
  standard("3.5.3", "Pengamanan Aplikasi", "pengamanan-aplikasi", "cat-sec", "sub-sec-app", [
    d("Vulnerability Assessment / Penetration Testing", "BurpSuite 2025.8.4; Nessus 10.9.3", 1), d("SSL/TLS", "Semua domain dan subdomain di bawah Komdigi.go.id dilengkapi SSL TLS 1.2", 2), d("Kredensial Login", "Kombinasi huruf besar dan kecil, angka, dan simbol minimal 12 karakter; tidak memakai kata sandi yang pernah digunakan", 3), d("Masa Berlaku Kredensial", "Paling cepat 6 bulan dan paling lama 12 bulan; perubahan diminta otomatis oleh sistem", 4), d("Kode Sumber", "Wajib disimpan pada repository Kode Sumber KOMDIGI (rks.komdigi.go.id)", 5),
  ]),
  standard("3.5.4.1", "Pengamanan Network Devices", "pengamanan-network-devices", "cat-sec", "sub-sec-infra", [
    d("Kontrol Akses dan Autentikasi", "Menggunakan Role-Based Access Control (RBAC)", 1), d("Segmentasi", "VLAN", 2), d("Logging", "User Access Logging; Traffic Logging", 3), d("SNMP", "SNMPv2 / SNMPv3", 4),
  ]),
  standard("3.5.5.1", "Pengamanan PC dan Laptop", "pengamanan-pc-laptop", "cat-sec", "sub-sec-infra", [
    d("Port USB (Khusus BMN)", "Port ditutup", 1), d("Sistem Pengaman", "Wajib mengaktifkan endpoint protection", 2),
  ]),
  standard("3.6.1", "Interoperabilitas Data", "interoperabilitas-data", "cat-data", "sub-interop", [
    d("Service Bus", "WSO2 API Manager versi 4.3", 1), d("Standar Protokol", "REST API; SOAP; GRPC; OAuth2.0", 2), d("Standar Data", "Mengacu pada standar Satu Data Indonesia untuk kode referensi, metadata, dan skema pertukaran data", 3),
  ]),
  standard("3.6.2", "GIS (Geographic Information System)", "gis", "cat-data", "sub-gis", [
    d("Platform", "GeoNode", 1), d("Standar Data Spasial", "Sesuai standar yang ditetapkan oleh pembina data geospasial di Indonesia", 2), d("Format File", "Shapefile; GeoJSON", 3),
  ]),
];

type RoleSeed = [string, string, string[], string[]];

const roleSeeds: RoleSeed[] = [
  ["3.7.1", "End User", ["Sistem Operasi", "Aplikasi Perkantoran", "Keamanan"], [
    "Mampu mengoperasikan Sistem Operasi (Microsoft Windows/Mac OS/Linux, atau lainnya)",
    "Mampu mengoperasikan Aplikasi Perkantoran (Microsoft Office, Google Workspace, Libre Office, Apple iWork, WPS Office, dan lainnya)",
    "Mampu mengoperasikan web browser",
    "Mampu membuka, membuat, dan membalas surat elektronik",
    "Mampu bertanggung jawab atas keamanan perangkat dan data pribadi",
    "Mampu mengoperasikan online meeting tools",
    "Mampu memahami prinsip dasar dan cara kerja jaringan komputer",
  ]],
  ["3.7.2", "Network Administrator", ["TCP/IP", "OSI", "Subnetting", "Jaringan"], [
    "Menguasai kompetensi End User (Tabel 3.7.1)",
    "Mampu mengoperasikan, konfigurasi, instalasi, dan pemeliharaan Sistem Operasi (Microsoft Windows, Mac OS, Linux, dan lainnya)",
    "Memahami prinsip dan cara kerja jaringan (protokol jaringan seperti TCP/IP, model OSI, perhitungan subnetting dan pengelolaan alamat IP)",
    "Memahami jenis perangkat dan konfigurasi jaringan", "Memahami topologi jaringan",
  ]],
  ["3.7.3", "Admin System", ["Windows Server", "Linux Server", "VMWare"], [
    "Menguasai kompetensi End User (Tabel 3.7.1)",
    "Mampu mengoperasikan, konfigurasi, instalasi, dan pemeliharaan Sistem Operasi (Microsoft Windows, Mac OS, Linux, dan lainnya)",
    "Memahami sistem operasi berbasis server (Windows server, Linux server, VMWare, dan lainnya)", "Memahami prinsip dan cara kerja jaringan", "Memahami jenis perangkat dan konfigurasi jaringan", "Memahami topologi jaringan",
  ]],
  ["3.7.4", "Security Analyst", ["CIA Triad", "IAM", "Forensik Digital"], [
    "Menguasai kompetensi End User (Tabel 3.7.1)",
    "Mampu mengoperasikan, konfigurasi, instalasi, dan pemeliharaan Sistem Operasi (Microsoft Windows, Mac OS, Linux, dan lainnya)",
    "Memahami prinsip-prinsip keamanan informasi dan konsep dasar (kerahasiaan, integritas, dan ketersediaan data)",
    "Memiliki pengetahuan tentang jaringan dan protokol komunikasi", "Memiliki kemampuan untuk menganalisis data log keamanan dan identifikasi potensi ancaman", "Memahami dan menerapkan kebijakan keamanan siber", "Mengetahui berbagai ancaman keamanan termasuk phishing, malware, denial-of-service (DoS), dan serangan lainnya", "Memiliki pemahaman tentang manajemen identitas dan akses (IAM)", "Mampu menginvestigasi jejak digital setelah insiden untuk menemukan akar penyebab dan mengumpulkan bukti",
  ]],
  ["3.7.5", "Programmer", ["PHP", "Laravel", "GitLab", "Docker", "OpenShift"], [
    "Menguasai kompetensi End User (Tabel 3.7.1)", "Memiliki kemampuan analitis untuk menganalisis masalah dan menemukan solusi secara efektif", "Memiliki pengalaman dan pengetahuan tentang metode Scrum", "Memiliki kemampuan komunikasi yang baik secara lisan maupun tulisan untuk bekerja di dalam tim", "Memiliki kemampuan belajar tentang tools atau pengetahuan baru tentang DevSecOps", "Memiliki pengetahuan tentang jaringan komputer", "Memiliki pengetahuan tentang data center", "Mahir bekerja menggunakan sistem operasi Linux", "Mahir bekerja menggunakan GitLab", "Mahir bekerja menggunakan Docker dan Openshift", "Memahami dan menguasai bahasa pemrograman tertentu, seperti PHP (minimal versi 7.6)", "Memahami dan menguasai framework tertentu, seperti Laravel (minimal versi 9.0)", "Memahami dan menguasai database terstruktur dan tidak terstruktur", "Memahami dan menguasai repositori kode sumber",
  ]],
  ["3.7.6", "DevSecOps", ["Docker", "OpenShift", "Kubernetes", "Jenkins", "OWASP"], [
    "Menguasai kompetensi End User (Tabel 3.7.1)", "Memiliki pengalaman dan pengetahuan tentang metode Scrum", "Memiliki kemampuan komunikasi yang baik secara lisan maupun tulisan untuk bekerja di dalam tim", "Memiliki kemampuan belajar tentang tools atau pengetahuan baru tentang DevSecOps", "Memiliki pengetahuan tentang database pipeline", "Mampu bekerja menggunakan source code management tools", "Mahir bekerja menggunakan Docker dan Openshift", "Mahir bekerja menggunakan Kubernetes", "Mahir bekerja menggunakan Jenkins", "Mahir bekerja menggunakan OWASP",
  ]],
  ["3.7.7", "Agile Coach", ["Scrum", "Jira", "Confluence", "GitLab"], [
    "Menguasai kompetensi End User (Tabel 3.7.1)", "Memiliki pengalaman dan pengetahuan tentang metode Scrum", "Memiliki kemampuan komunikasi yang baik secara lisan maupun tulisan untuk bekerja di dalam tim", "Memiliki kemampuan dokumentasi yang baik", "Mahir bekerja menggunakan Jira", "Mahir bekerja menggunakan Confluence", "Mahir bekerja menggunakan GitLab",
  ]],
  ["3.7.8", "Quality Assurance", ["Jira", "Confluence", "GitLab", "API Testing", "RTM"], [
    "Menguasai kompetensi End User (Tabel 3.7.1)", "Memiliki pengalaman dan pengetahuan tentang metode Scrum", "Memiliki kemampuan komunikasi yang baik secara lisan maupun tulisan untuk bekerja di dalam tim", "Memiliki kemampuan dokumentasi yang baik", "Mahir bekerja menggunakan Jira", "Mahir bekerja menggunakan Confluence", "Mahir bekerja menggunakan GitLab", "Mahir bekerja dengan functional testing dan API testing", "Mahir mendokumentasikan pekerjaan melalui Requirement Traceability Matrix", "Memiliki kemampuan analisis hasil testing untuk memprediksi perilaku pengguna, mengidentifikasi bug, dan merekomendasikan solusi",
  ]],
  ["3.7.9", "UI/UX Designer", ["Wireframe", "Prototype", "Design Tools"], [
    "Menguasai kompetensi End User (Tabel 3.7.1)", "Memiliki pengalaman dan pengetahuan tentang metode Scrum", "Memiliki kemampuan komunikasi yang baik secara lisan maupun tulisan untuk bekerja di dalam tim", "Memiliki selera dan kemampuan desain visual yang baik", "Memahami user interface yaitu proses membuat antarmuka dalam situs atau aplikasi dengan fokus pada tampilan atau gaya", "Mahir bekerja membuat infografis, wireframe dan prototype", "Mahir bekerja menggunakan Design Tools",
  ]],
  ["3.7.10", "Data Analyst", ["SQL", "PostgreSQL", "BI Tools", "Satu Data Indonesia"], [
    "Menguasai kompetensi End User (Tabel 3.7.1)", "Memahami proses dalam Data Analytics Life Cycle (perencanaan, pengumpulan, pengolahan, analisis, visualisasi, dan penyebarluasan data)", "Menguasai SQL dan Database Tools (PostgreSQL, MySQL, dan lainnya)", "Mampu menggunakan BI Tools (Apache Superset, Metabase, Power BI, Tableau, dan/atau tools BI lainnya)", "Memahami konsep statistik dan machine learning dasar untuk analisis", "Mampu membuat analisis dan laporan berbasis data", "Memiliki kemampuan komunikasi yang baik untuk menyajikan insight kepada pemangku kepentingan", "Memahami prinsip Satu Data Indonesia dalam manajemen data",
  ]],
  ["3.7.11", "Data Engineer", ["ETL", "Airflow", "Spark", "NoSQL", "Kubernetes"], [
    "Menguasai kompetensi End User (Tabel 3.7.1)", "Memahami arsitektur data (data warehouse, data lake, data mart)", "Mampu merancang, membangun, dan memelihara pipeline data (ETL/ELT) menggunakan Apache Airflow, Luigi, atau NiFi", "Menguasai Big Data Stack (Hadoop, Spark, Hive) dan mampu mengelola cluster", "Mampu bekerja dengan database relasional (PostgreSQL, MySQL) dan NoSQL (MongoDB, Cassandra)", "Memahami interoperabilitas data (API, Service Bus, format JSON/XML/Parquet/Avro)", "Memahami konsep keamanan data (data masking, enkripsi, akses berbasis role)", "Mampu menggunakan containerization dan orchestration (Docker, Kubernetes) untuk deployment pipeline data", "Mampu berkolaborasi dengan Data Analyst, Data Scientist, dan pemangku kepentingan lain dalam siklus hidup data",
  ]],
  ["3.7.12", "IT Auditor", ["COBIT", "TOGAF", "ITIL", "ISO 27001"], [
    "Menguasai kompetensi End User (Tabel 3.7.1)", "Memahami konsep dan penerapan Tata Kelola TI (IT Governance) dan Kepatuhan TI (IT Compliance)", "Memahami best practices Tata Kelola TI seperti TOGAF, COBIT, ITIL, atau lainnya", "Memahami standar industri terkait mutu dan manajemen layanan TI seperti ISO 9001, ISO 27001, ISO 20000, atau lainnya", "Memiliki pengetahuan dan mampu melakukan Audit, khususnya Audit TI", "Memiliki pengalaman melakukan Audit, khususnya Audit TI", "Mampu menganalisa, merancang, dan menyusun kebijakan Tata Kelola TI dan Kepatuhan TI", "Memiliki pengetahuan mengenai waterfall dan agile project management", "Memiliki kemampuan komunikasi yang baik secara lisan maupun tulisan untuk bekerja dalam tim",
  ]],
  ["3.7.13", "Enterprise Architecture", ["TOGAF", "COBIT", "ITIL", "Enterprise Architecture"], [
    "Menguasai kompetensi End User (Tabel 3.7.1)", "Memiliki pengetahuan di bidang Tata Kelola TI (IT Governance)", "Memahami best practices Tata Kelola TI seperti TOGAF, COBIT, ITIL, atau lainnya", "Memahami konsep serta penerapan Enterprise Architecture", "Memiliki pengalaman dalam mengelola Enterprise Architecture", "Mampu menganalisa, merancang, dan menyusun kebijakan Tata Kelola TI dan Kepatuhan TI", "Memiliki pengetahuan mengenai waterfall dan agile project management", "Memiliki kemampuan komunikasi yang baik secara lisan maupun tulisan untuk bekerja dalam tim",
  ]],
  ["3.7.14", "IT Governance Analyst", ["COBIT", "TOGAF", "ITIL", "ISO 27001", "Jira"], [
    "Menguasai kompetensi End User (Tabel 3.7.1)", "Memiliki pengetahuan di bidang Tata Kelola TI (IT Governance) dan Kepatuhan TI (IT Compliance)", "Memahami best practices Tata Kelola TI seperti TOGAF, COBIT, ITIL, atau lainnya", "Memahami standar industri terkait mutu dan manajemen layanan TI seperti ISO 9001, ISO 27001, ISO 20000, atau lainnya", "Mampu menganalisa dan merancang problem-solving yang baik", "Mampu menganalisa, merancang, dan menyusun kebijakan Tata Kelola TI dan Kepatuhan TI", "Mampu mengelola pendokumentasian pekerjaan dengan baik", "Mampu mengelola working tools koordinasi, kolaborasi dan dokumentasi proyek seperti JIRA, Confluence, atau lainnya", "Memiliki pengetahuan mengenai waterfall dan agile project management", "Memiliki kemampuan komunikasi yang baik secara lisan maupun tulisan untuk bekerja dalam tim",
  ]],
];

export const competencyRoles: CompetencyRole[] = roleSeeds.map(([sourceNumber, name, tags, items], roleIndex) => ({
  id: `role-${sourceNumber.replace(/\./g, "-")}`,
  documentId,
  sourceNumber,
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  description: `Kompetensi ${name} sesuai Tabel ${sourceNumber} dokumen Standardisasi Teknologi Informasi.`,
  level: roleIndex === 0 ? "Dasar" : "Profesional",
  sortOrder: roleIndex + 1,
  isActive: true,
  tags,
  competencies: items.map((description, index) => ({
    id: `comp-${roleIndex + 1}-${index + 1}`,
    number: `${index + 1}`,
    description,
    group: index === 0 ? "Kompetensi Dasar" : "Kompetensi Teknis dan Profesional",
    tags: tags.filter((tag) => description.toLowerCase().includes(tag.toLowerCase())),
  })),
}));

export const obsoleteCriteria: ObsoleteCriterion[] = [
  { id: "obs-eos", sourceNumber: "3.8.1", name: "End of Support", deviceType: "semua", description: "Perangkat/sistem sudah End of Support (EOS).", conditionType: "vendor_support", operator: "eq", conditionValue: "eos", requiresWarrantyExpired: false, sortOrder: 1, isActive: true },
  { id: "obs-server-age", sourceNumber: "3.8.2.a", name: "Usia Server", deviceType: "server", description: "Usia server lebih dari 5 tahun.", conditionType: "age", operator: "gt", conditionValue: "5", conditionUnit: "tahun", requiresWarrantyExpired: false, sortOrder: 2, isActive: true },
  { id: "obs-network-age", sourceNumber: "3.8.2.b", name: "Usia Network Device", deviceType: "network", description: "Usia network device lebih dari 6 tahun.", conditionType: "age", operator: "gt", conditionValue: "6", conditionUnit: "tahun", requiresWarrantyExpired: false, sortOrder: 3, isActive: true },
  { id: "obs-mtbf", sourceNumber: "3.8.3", name: "MTBF dan Garansi", deviceType: "semua", description: "Mean Time Between Failures (MTBF) kurang dari 30 hari dan telah lewat masa garansi.", conditionType: "mtbf_warranty", operator: "lt", conditionValue: "30", conditionUnit: "hari", requiresWarrantyExpired: true, sortOrder: 4, isActive: true },
];

export const auditLogs: AuditLog[] = [
  { id: "audit-1", user: "Sistem", entityType: "document", entityId: documentId, entityName: portalDocument.documentName, action: "seed", newData: { status: "Berlaku" }, createdAt: `${effectiveDate}T08:00:00.000Z` },
];

export const initialPortalState: PortalState = {
  standards,
  categories,
  subcategories,
  roles: competencyRoles,
  obsoleteCriteria,
  document: portalDocument,
  auditLogs,
};
