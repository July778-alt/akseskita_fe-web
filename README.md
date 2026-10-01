# AksesKita Frontend Web (Next.js Application)

Aplikasi web modern berbasis **Next.js (App Router)** dan **React 19** untuk platform pelaporan aksesibilitas kota **AksesKita**. Aplikasi ini berfungsi sebagai antarmuka utama bagi masyarakat untuk melaporkan sarana publik yang rusak atau tidak ramah disabilitas, sekaligus sebagai pusat kendali (*staff dashboard*) bagi petugas/admin untuk memverifikasi dan memperbarui status laporan secara transparan.

---

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Teknologi dan Dependensi](#teknologi-dan-dependensi)
- [Arsitektur dan Struktur Direktori](#arsitektur-dan-struktur-direktori)
- [Peta Rute dan Halaman Aplikasi](#peta-rute-dan-halaman-aplikasi)
- [Peran dan Antarmuka Pengguna](#peran-dan-antarmuka-pengguna)
- [Panduan Instalasi dan Menjalankan](#panduan-instalasi-dan-menjalankan)
- [Variabel Lingkungan (.env)](#variabel-lingkungan-env)
- [Integrasi API Backend](#integrasi-api-backend)
- [Build dan Mode Produksi](#build-dan-mode-produksi)
- [Lisensi](#lisensi)

---

## Fitur Utama

- **Landing Page & Feed Publik**:
  - Halaman beranda modern dengan animasi visual menggunakan Framer Motion.
  - Ringkasan statistik kota dan katalog laporan publik yang dapat dijelajahi tanpa login.
- **Peta Interaktif Geospasial (Leaflet)**:
  - Penandaan lokasi kerusakan fasilitas secara presisi dengan pin interaktif (`MapPicker`).
  - Penampil peta detail koordinat laporan (`MapView`) berbasis OpenStreetMap.
- **Formulir Pelaporan Ramah Pengguna**:
  - Formulir komprehensif: judul, deskripsi, pemilihan kategori, pemilihan titik peta, alamat fisik, dan unggah foto bukti.
  - Pratinjau gambar instan (*image preview*) sebelum pengiriman data.
  - Dialog konfirmasi sebelum submit untuk mencegah kekeliruan data.
  - Validasi formulir type-safe menggunakan React Hook Form dan Zod.
- **Pelacakan Status & Timeline Histori**:
  - Visualisasi alur tiket laporan (`pending` -> `verified` -> `in_progress` -> `resolved` / `rejected`).
  - Komponen garis waktu kronologis (`StatusTimeline`) yang memuat rekam jejak petugas yang memverifikasi atau memperbarui tiket.
- **Ruang Diskusi & Komentar Real-Time**:
  - Kolom komunikasi langsung antara pelapor dan pihak verifikator pada setiap detail laporan.
  - Hak penghapusan komentar bagi pemilik komentar.
- **Pusat Notifikasi Interaktif (In-App Notifications)**:
  - Dropdown notifikasi di navbar dengan indikator belum dibaca (*unread badge*).
  - Aksi instan: tandai satu notifikasi telah dibaca, tandai semua dibaca, dan hapus riwayat notifikasi.
- **Staff & Administrator Dashboard**:
  - Ringkasan analitik utama: Total Laporan, Butuh Verifikasi, Kasus Selesai, dan Jumlah Warga Terdaftar.
  - Diagram visual pertumbuhan bulanan (*Monthly Growth*) dan kategori masalah terpopuler (*Hot Topics*).
  - Tabel manajemen laporan untuk meninjau bukti, menolak laporan tidak valid, atau memperbarui progres perbaikan.
  - Manajemen master data kategori fasilitas publik (tambah, edit, hapus).
  - Manajemen akun pengguna dan alih peran (*role assignment*) khusus Super Admin.
- **Pengelolaan Profil**:
  - Pembaruan nama lengkap dan unggah foto profil (avatar) pengguna.
- **Arsitektur State Management & Keamanan**:
  - Pemisahan server state menggunakan TanStack Query v5 (caching otomatis, revalidasi, dan mutasi optimistik).
  - Client authentication session state dikelola dengan Zustand dan disimpan secara aman di HTTP cookies (`js-cookie`).
  - Proteksi rute (`AuthGuard`) dan penanganan sesi kedaluwarsa secara otomatis melalui Axios interceptor (HTTP 401 redirect).

---

## Teknologi dan Dependensi

| Kategori                      | Teknologi                                                                           | Deskripsi                                                       |
| ----------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Framework**           | [Next.js 16](https://nextjs.org/)                                                    | Framework React generasi terbaru dengan App Router              |
| **Core Library**        | [React 19](https://react.dev/)                                                       | Library UI modern dengan performa rendering optimal             |
| **Bahasa**              | [TypeScript 5](https://www.typescriptlang.org/)                                      | Penulisan kode type-safe secara end-to-end                      |
| **Styling**             | [Tailwind CSS v4](https://tailwindcss.com/)                                          | Engine utility-first CSS generasi terbaru                       |
| **Server State**        | [TanStack React Query v5](https://tanstack.com/query)                                | Manajemen cache, data fetching, dan mutasi API                  |
| **Client State**        | [Zustand v5](https://github.com/pmndrs/zustand)                                      | Global state lightweight untuk sesi autentikasi                 |
| **Peta Digital**        | [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)    | Peta interaktif OpenStreetMap untuk geolokasi fasilitas         |
| **Formulir & Validasi** | [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)             | Penanganan input form performa tinggi dan validasi skema        |
| **HTTP Client**         | [Axios](https://axios-http.com/)                                                     | Permintaan HTTP terpusat dengan interceptor token dan error 401 |
| **Animasi & Ikon**      | [Framer Motion](https://www.framer.com/motion/) & [Lucide React](https://lucide.dev/) | Transisi halaman halus dan kumpulan ikon modern                 |
| **Notifikasi Toast**    | [Sonner](https://sonner.emilkowal.ski/)                                              | Komponen alert/toast modern                                     |

---

## Arsitektur dan Struktur Direktori

Proyek ini dibangun menggunakan **arsitektur modular berbasis fitur** (*Feature-driven Architecture*), mengelompokkan logika bisnis, komponen UI, query cache, dan skema validasi berdasarkan domain modul:

```text
akseskita_fe-web/
├── src/
│   ├── app/                      # Rute App Router Next.js
│   │   ├── (auth)/               # Grup rute autentikasi
│   │   │   ├── login/            # Halaman masuk (/login)
│   │   │   └── register/         # Halaman pendaftaran (/register)
│   │   ├── (dashboard)/          # Antarmuka pengguna publik/warga
│   │   │   ├── profile/          # Pengaturan profil akun (/profile)
│   │   │   └── reports/          # Laporan pengguna (/reports, /reports/create, /reports/[id])
│   │   ├── (public)/             # Halaman eksplorasi publik (/reports publik)
│   │   ├── staff-dashboard/      # Portal panel kendali petugas & admin
│   │   │   ├── categories/       # Kelola master data kategori (/staff-dashboard/categories)
│   │   │   ├── dashboard/        # Metrik dan analitik sistem (/staff-dashboard/dashboard)
│   │   │   ├── reports/          # Tinjauan tiket laporan (/staff-dashboard/reports)
│   │   │   └── users/            # Manajemen pengguna (/staff-dashboard/users)
│   │   ├── globals.css           # Konfigurasi Tailwind CSS v4
│   │   ├── layout.tsx            # Root layout aplikasi & provider wrapper
│   │   └── page.tsx              # Landing page utama
│   ├── components/               # Komponen UI bersama
│   │   ├── shared/               # Komponen lintas modul (AuthGuard, DataTable, FileUploader, Layout)
│   │   └── ui/                   # Komponen atomik (Button, Input, Card, Modal, Table, Badge, dll)
│   ├── constants/                # Nilai konstanta aplikasi
│   ├── features/                 # Logika bisnis modular per domain
│   │   ├── auth/                 # Service, Zustand store, dan tipe autentikasi
│   │   ├── categories/           # Query dan service kategori fasilitas
│   │   ├── comments/             # Komponen diskusi dan mutasi komentar
│   │   ├── dashboard/            # Kartu analitik dan query metrik statistik
│   │   ├── maps/                 # Komponen MapPicker dan MapView Leaflet
│   │   ├── notifications/        # Komponen dropdown notifikasi dan query
│   │   ├── reports/              # Komponen form laporan, card, timeline, dan query/mutasi
│   │   └── users/                # Layanan pengelolaan profil dan hak akses pengguna
│   ├── hooks/                    # Custom React hooks bersama
│   ├── lib/                      # Konfigurasi library (Axios instance, env, logger, utils)
│   ├── providers/                # React context providers (TanStack Query Client Provider, Toaster)
│   └── types/                    # Definisi antarmuka TypeScript global (API Response, Report, User)
├── public/                       # Berkas aset statis
├── next.config.ts                # Konfigurasi Next.js
├── package.json                  # Dependensi dan skrip proyek
├── tsconfig.json                 # Konfigurasi TypeScript
└── .env.example                  # Template variabel lingkungan
```

---

## Peta Rute dan Halaman Aplikasi

| Jalur URL                       | Akses                | Deskripsi                                                                     |
| ------------------------------- | -------------------- | ----------------------------------------------------------------------------- |
| `/`                           | Publik               | Beranda utama / landing page aplikasi                                         |
| `/login`                      | Publik               | Halaman masuk akun                                                            |
| `/register`                   | Publik               | Halaman registrasi warga baru                                                 |
| `/reports`                    | Publik / User        | Katalog laporan masyarakat dengan pencarian dan filter                        |
| `/reports/create`             | Terotentikasi (User) | Halaman pembuatan tiket laporan fasilitas baru                                |
| `/reports/:id`                | Publik / User        | Detail laporan lengkap, peta koordinat, timeline status, dan kolom diskusi    |
| `/profile`                    | Terotentikasi        | Pengaturan akun dan pembaruan foto profil                                     |
| `/staff-dashboard/dashboard`  | Admin, Super Admin   | Ikhtisar statistik, grafik pertumbuhan bulanan, dan kategori laporan teratas  |
| `/staff-dashboard/reports`    | Admin, Super Admin   | Manajemen status tiket laporan (verifikasi, proses pengerjaan, penyelesaian)  |
| `/staff-dashboard/categories` | Admin, Super Admin   | Kelola data kategori fasilitas publik (CRUD)                                  |
| `/staff-dashboard/users`      | Super Admin          | Manajemen akun pengguna dan alih peran (*user*, *admin*, *super_admin*) |

---

## Peran dan Antarmuka Pengguna

Aplikasi menerapkan sistem pembagian hak akses (*Role-Based Access Control*) pada tampilan antarmuka:

| Halaman / Fitur               | Tamu (Publik) | User (Warga) | Admin (Petugas) | Super Admin |
| ----------------------------- | :-----------: | :----------: | :-------------: | :---------: |
| Melihat Landing Page          |      Ya      |      Ya      |       Ya       |     Ya     |
| Menjelajahi Laporan Publik    |      Ya      |      Ya      |       Ya       |     Ya     |
| Membuat Tiket Laporan Baru    |     Tidak     |      Ya      |       Ya       |     Ya     |
| Menulis Komentar Diskusi      |     Tidak     |      Ya      |       Ya       |     Ya     |
| Mengakses Dropdown Notifikasi |     Tidak     |      Ya      |       Ya       |     Ya     |
| Mengubah Profil Sendiri       |     Tidak     |      Ya      |       Ya       |     Ya     |
| Mengakses Staff Dashboard     |     Tidak     |    Tidak    |       Ya       |     Ya     |
| Memperbarui Status Tiket      |     Tidak     |    Tidak    |       Ya       |     Ya     |
| Mengelola Kategori Fasilitas  |     Tidak     |    Tidak    |       Ya       |     Ya     |
| Mengelola Role Pengguna       |     Tidak     |    Tidak    |      Tidak      |     Ya     |

---

## Panduan Instalasi dan Menjalankan

### 1. Prasyarat Sistem

- **Node.js**: Versi `18.x` atau lebih baru
- **NPM** atau package manager kompatibel (`pnpm` / `yarn`)
- **Backend AksesKita**: Pastikan layanan API backend sudah berjalan (biasanya di `http://localhost:5000`)

### 2. Kloning Repositori

```bash
git clone https://github.com/July778-alt/akseskita_fe-web.git
cd akseskita_fe-web
```

### 3. Pasang Dependensi

```bash
npm install
```

### 4. Konfigurasi Variabel Lingkungan

Salin berkas template `.env.example` menjadi `.env.local`:

```bash
cp .env.example .env.local
```

Pastikan `NEXT_PUBLIC_API_URL` mengarah ke alamat backend API Anda.

### 5. Jalankan Server Development

```bash
npm run dev
```

Aplikasi web dapat diakses melalui peramban di: **`http://localhost:3000`**.

---

## Variabel Lingkungan (.env)

| Variabel                | Wajib | Nilai Contoh                  | Keterangan                                        |
| ----------------------- | :---: | ----------------------------- | ------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` |  Ya  | `http://localhost:5000/api` | Alamat endpoint dasar REST API backend Express.js |

---

## Integrasi API Backend

Komunikasi data antara frontend dan backend dikelola secara terpusat pada file `src/lib/api.ts`:

- **Penyuntikan Token Otomatis**: Setiap permintaan HTTP yang keluar akan secara otomatis membaca token dari cookie `token` dan menyematkannya ke header `Authorization: Bearer <TOKEN>`.
- **Dukungan Multipart Otomatis**: Apabila data yang dikirim bertipe `FormData`, header `Content-Type` otomatis diatur menjadi `multipart/form-data` untuk pengunggahan foto.
- **Penanganan Kedaluwarsa Sesi (HTTP 401)**: Jika backend mengembalikan status 401 Unauthorized, token pada cookie dan localStorage akan langsung dibersihkan, lalu pengguna diarahkan kembali ke halaman login.
- **Ekstraksi Respon (*Unwrapping*)**: Menggunakan helper fungsi `unwrap()` untuk mengekstraksi data muatan dari standar format respon `{ success: true, data: ... }`.

---

## Build dan Mode Produksi

Untuk membangun aplikasi web ke dalam mode produksi:

### 1. Kompilasi Proyek

```bash
npm run build
```

### 2. Menjalankan Server Produksi

```bash
npm start
```

### 3. Pemeriksaan Kualitas Kode (Linting)

```bash
npm run lint
```

---

## Lisensi

Proyek ini dikembangkan sebagai bagian dari inisiatif portofolio rekayasa perangkat lunak (RPL) dan platform peningkatan aksesibilitas publik AksesKita.
Didistribusikan di bawah lisensi [ISC](LICENSE).
