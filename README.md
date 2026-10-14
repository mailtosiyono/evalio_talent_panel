# Evalio Talent Panel Documentation — V4.2

Portal dokumentasi HTML multi-page mengikuti design system Evalio.

## Menjalankan secara lokal (disarankan)

Karena ada navigasi antardokumen dan login demo, jalankan melalui web server lokal:

- **Windows:** klik `START-WINDOWS.bat` (butuh Python 3)
- **Mac:** klik `START-MAC.command` (butuh Python 3)
- **Linux / terminal:** `python3 preview_server.py`

Browser akan membuka `login.html`. Setelah selesai, tutup terminal untuk mematikan server.

**Akun demonstrasi**

- Username: `admin`
- Password: `evalio`

Setelah login, halaman pertama `index.html` adalah End-to-End Process. Logout berada di kanan atas header.

## Struktur menu

1. `index.html` — End-to-End Process
2. `penilaian-awal.html` — Import Data Kandidat & Pembuatan Bucket
3. `pra-talent-panel.html` — Pra Talent Panel
4. `talent-panel.html` — Talent Panel
5. `approval.html` — Approval & Revisi
6. `output-integrasi.html` — Integrasi dengan Corpu (detail masih TBD)
7. `user-roles.html` — Lima User Roles
8. `talent-panel-card.html` — Candidate Comparison (maksimal 3 kandidat)

`end-to-end.html` hanya redirect kompatibilitas ke halaman utama.

## Pembaruan V3

- Hapus seluruh section **Cara Membaca Diagram** pada End-to-End Process.
- Hapus callout/kotak catatan tambahan di seluruh halaman, termasuk info sidebar.
- Login username/password demo, redirect ke halaman End-to-End, tombol logout.
- Hapus banner "To Be Discussed" pada halaman Integrasi Corpu.
- Hapus label/kotak TBD dan section **Informasi dan Kebutuhan yang Perlu Dikonfirmasi** berikut tabelnya.
- Candidate Comparison tiga kolom sejajar dengan pilihan kandidat, tambah/hapus/ganti, dan tab Pra Talent Panel / Talent Panel. Semua kandidat dan angka merupakan data ilustrasi.

## Catatan keamanan penting

Login dalam paket **HTML statis ini hanya demonstrasi antarmuka**, bukan kontrol keamanan sungguhan. Kredensial tersimpan di JavaScript, sehingga **jangan gunakan untuk menyimpan atau menerbitkan dokumen rahasia**. Menjalankan `preview_server.py` membuat demo browser lebih stabil tetapi **tidak** mengubahnya menjadi sistem autentikasi aman.

Untuk digunakan oleh client secara online, tempatkan halaman pada server yang melindungi seluruh file dan asset melalui autentikasi server-side (misalnya SSO, session backend, atau kontrol akses hosting), serta HTTPS. Jangan gunakan username/password demo ini untuk produksi.

## Dukungan

Tanpa CDN/library eksternal. Viewer flowchart mempertahankan gambar asli, menyediakan zoom dan fullscreen. Menggunakan layout responsif untuk desktop dan mobile. Isi integrasi Corpu masih berupa rancangan yang perlu disepakati.

## Revisi viewer flowchart

Baris judul dan keenam header swimlane pada diagram utama End-to-End Process sekarang tetap terlihat di bagian atas viewer ketika diagram digulir ke bawah. Lapisan header merupakan potongan dari gambar asli, bergerak serempak dengan scroll horizontal dan diperbesar/diperkecil bersama zoom. Berlaku juga pada viewer fullscreen. Diagram dan data halaman lain tidak diubah.


## Update V4
- Header keenam swimlane kini sticky pada semua cuplikan tahap 01–04, semua halaman Approval yang menyertakan flowchart, serta modal fullscreen. Posisi header mengikuti zoom dan scroll horizontal. Label role berasal dari diagram asli dan tidak mengubah flowchart aslinya.
- Bagian Interaksi Peran dan Sistem dihapus dari User Roles. Lima card role tetap ada.
- Agenda Pembahasan Corpu dirinci menjadi keputusan teknis yang masih harus didiskusikan (bukan spesifikasi final).
- Label menu, judul dan breadcrumb Tahap 01 diperbarui menjadi Import Data Kandidat & Pembuatan Bucket. Nama file tetap penilaian-awal.html agar navigasi dari versi sebelumnya tidak rusak. Teks dalam gambar flowchart asli tetap apa adanya.

## Update V4.1
- Hapus card “Data yang Berpotensi Diintegrasikan” dan “Agenda Pembahasan” pada halaman Integrasi dengan Corpu.
- Alur Konseptual Hasil Akhir (TBD) diperlebar menjadi satu kolom, tanpa ruang kosong bekas card. Flowchart dan konten lainnya tidak diubah.

## Update V4.2
- Password akun login demo berubah menjadi `evalio`; username tetap `admin`.
- Hilangkan teks perkenalan di kiri halaman login (judul, deskripsi, dan label tiga tahapan).
- Form login dipusatkan; navigasi dan halaman dokumentasi lain tidak berubah.
