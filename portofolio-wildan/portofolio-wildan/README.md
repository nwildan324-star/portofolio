# Portofolio Wildan — Enchanted Forest Digital Marketer

## Struktur Folder
```
portofolio-wildan/
├── index.html        -> Halaman utama (HTML + Tailwind CDN)
├── css/
│   └── style.css     -> Semua CSS custom (pintu, parallax, tilt, peti harta)
├── js/
│   └── script.js     -> Semua JavaScript (animasi scroll, smooth scroll, tilt, peti)
├── assets/
│   └── images/       -> Tempat semua gambar/foto
│       ├── profile.jpg    -> Foto profil (section About)
│       ├── project-1.jpg  -> Gambar studi kasus 1 (section Portfolio)
│       ├── project-2.jpg  -> Gambar studi kasus 2
│       └── project-3.jpg  -> Gambar studi kasus 3
└── README.md
```

## Cara Mengganti Gambar
1. Siapkan foto/gambar Anda, sebaiknya dalam format `.webp` untuk loading
   yang lebih cepat (bisa cari aset hutan gratis di Unsplash/Pexels).
2. Beri nama file sesuai nama yang sudah ada (misalnya `profile.jpg`,
   `project-1.jpg`, dst), atau jika ingin nama lain:
   - simpan file baru ke folder `assets/images/`
   - lalu ubah atribut `src="assets/images/NAMA-FILE-ANDA"` pada tag
     `<img>` di `index.html`.
3. Jika menggunakan `.webp`, ubah juga ekstensi pada `src` (contoh:
   `assets/images/profile.webp`).

## Cara Menjalankan
Cukup buka file `index.html` langsung di browser, atau jalankan
server lokal sederhana (disarankan agar semua path relatif
ter-load dengan benar):

```bash
# Python
python3 -m http.server 8000

# lalu buka di browser:
# http://localhost:8000
```

## Kustomisasi Cepat
- **Warna tema**: ubah palet `forest`, `wood`, `gold` di blok
  `tailwind.config` pada bagian `<head>` di `index.html`.
- **Kecepatan pintu terbuka**: ubah konstanta `DOOR_OPEN_DISTANCE`
  di `js/script.js`.
- **Kecepatan parallax tiap layer**: ubah atribut `data-speed`
  pada elemen `.parallax-layer` di `index.html`.
- **Kemiringan tilt portfolio**: ubah `maxTilt` di `js/script.js`.
- **Form kontak**: hubungkan ke backend/email service (Formspree,
  EmailJS, dll.) pada bagian submit di `js/script.js`.
