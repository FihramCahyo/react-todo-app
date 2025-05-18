# Aplikasi Todo React

Aplikasi Todo ini adalah aplikasi manajemen tugas yang dibangun menggunakan React, TypeScript, dan Vite. Aplikasi ini memungkinkan pengguna untuk mengelola daftar tugas mereka dengan fitur autentikasi, tema gelap/terang, dan antarmuka yang responsif.

## Fitur Utama

- **Autentikasi Pengguna**: Sistem login yang aman dengan penyimpanan token
- **Manajemen Todo**: Tambah, edit, hapus, dan tandai todo sebagai selesai
- **Mode Tema**: Dukungan tema gelap dan terang dengan deteksi preferensi sistem
- **Responsif**: Antarmuka yang responsif untuk berbagai ukuran layar
- **Notifikasi**: Sistem notifikasi toast untuk memberikan umpan balik kepada pengguna
- **Proteksi Rute**: Rute terproteksi yang hanya dapat diakses oleh pengguna yang sudah login

## Teknologi yang Digunakan

- **React 19**: Library JavaScript untuk membangun antarmuka pengguna
- **TypeScript**: Superset JavaScript dengan tipe statis
- **Vite**: Build tool yang cepat untuk pengembangan modern
- **React Router**: Untuk navigasi antar halaman
- **Tailwind CSS**: Framework CSS untuk styling yang cepat
- **React Hook Form**: Untuk manajemen form dan validasi
- **React Toastify**: Untuk notifikasi toast
- **Axios**: Untuk melakukan HTTP request ke API
- **Heroicons**: Untuk ikon-ikon UI

## Struktur Aplikasi

### Komponen Utama

- **TodoItem**: Menampilkan item todo individual dengan opsi edit, hapus, dan tandai selesai
- **TodoForm**: Form untuk menambahkan todo baru
- **DeleteConfirmModal**: Modal konfirmasi untuk menghapus todo
- **TodoSkeleton**: Komponen loading skeleton untuk todo

### Halaman

- **TodosPage**: Halaman utama yang menampilkan daftar todo dan form untuk menambahkan todo baru
- **LoginPage**: Halaman login untuk autentikasi pengguna

### Konteks

- **AuthContext**: Menyediakan state autentikasi dan fungsi login/logout ke seluruh aplikasi
- **ThemeContext**: Mengelola tema aplikasi (gelap/terang)

### Layanan

- **auth.ts**: Layanan untuk autentikasi (login, logout)
- **todos.ts**: Layanan untuk operasi CRUD pada todo

## Cara Menjalankan Aplikasi

### Prasyarat

- Node.js versi 16 atau lebih tinggi
- npm atau yarn

### Langkah-langkah

1. Clone repositori ini
2. Install dependensi:
   ```bash
   npm install
   ```
3. Jalankan aplikasi dalam mode pengembangan:
   ```bash
   npm run dev
   ```
4. Buka `http://localhost:5173` di browser Anda

## Build untuk Produksi

Untuk membuat versi produksi:

```bash
npm run build
```

Untuk melihat preview build:

```bash
npm run preview
```

## Fitur Lanjutan

### Manajemen State

Aplikasi ini menggunakan kombinasi dari React Context API dan useReducer untuk manajemen state yang efisien. Pola ini memungkinkan:

- Pemisahan logika bisnis dari komponen UI
- Pengelolaan state yang lebih terstruktur dengan actions dan reducers
- Performa yang lebih baik dengan update yang terfokus

### Tema Dinamis

Aplikasi mendukung tema gelap dan terang dengan:

- Deteksi otomatis preferensi sistem
- Penyimpanan preferensi pengguna di localStorage
- Toggle tema yang mudah diakses

### Validasi Form

Form dalam aplikasi menggunakan React Hook Form untuk:

- Validasi input yang efisien
- Penanganan error yang user-friendly
- Pengalaman form yang responsif

### Keamanan

Aplikasi mengimplementasikan beberapa fitur keamanan dasar:

- Penyimpanan token JWT di localStorage
- Proteksi rute untuk pengguna yang belum login
- Penanganan error yang aman


## Lisensi

[MIT License](LICENSE)