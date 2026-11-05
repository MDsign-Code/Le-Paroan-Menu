# Dapur Le'Paroan - Menu Digital & Order WhatsApp

Aplikasi Menu Digital resmi Dapur Le'Paroan dengan fitur pemesanan WhatsApp ke **085964245547** dan pembayaran **QRIS Nasional**.

## Panduan Mengatasi Halaman Kosong di GitHub Pages

Jika halaman web masih blank/kosong saat dibuka di GitHub Pages, hal tersebut umumnya disebabkan oleh 2 hal:
1. **GitHub Pages diarahkan ke branch root biasa (bukan hasil build `dist`)**, sehingga browser gagal membaca file `.tsx` mentah.
2. **Pengaturan Source di GitHub Repository belum diarahkan ke GitHub Actions**.

### Cara Mengaktifkan GitHub Pages (1 Menit):

1. Buka repository Anda di **GitHub**.
2. Klik tab **Settings** (Pengaturan) di bagian atas repository.
3. Di menu sebelah kiri, klik **Pages**.
4. Pada bagian **Build and deployment** -> **Source**:
   - Ganti pilihan dari *Deploy from a branch* menjadi **GitHub Actions**.
5. Selesai! Workflow `.github/workflows/deploy.yml` yang sudah kami sediakan akan otomatis berjalan melakukan build Vite dan menerbitkan website Anda secara langsung di URL GitHub Pages (`https://<username>.github.io/<repo>/`).

---

## Fitur Aplikasi

- **18 Menu Harian Lengkap (Senin - Minggu)**: Sarapan, Makan Siang, dan Makan Malam Nusantara berganti setiap hari.
- **Minuman & Paket Spesial**: Teh Rempah Le'Paroan (Rasa Serai & Pokak) serta Paket Spesial Rame-Rame (5 Orang).
- **Panduan Keseimbangan Gizi & Kemasan Praktis**: Komposisi gizi porsi harian dan kemasan ramah komuter (Paper Bowl & Lunch Box).
- **Metode Pemesanan WhatsApp**: Formulir keranjang belanja dengan opsi porsi, catatan selera, pilihan delivery/takeaway, dan direct chat ke nomor resmi **085964245547**.
- **Pembayaran QRIS Interaktif**: Barcode QRIS resmi merchant DAPUR LE'PAROAN, timer batas bayar, dan salin nominal otomatis.
