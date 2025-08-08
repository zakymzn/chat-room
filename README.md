# 💬 Chat Room App

Aplikasi **chat room modern** yang dibuat dengan **Vite + ReactJS** dan menggunakan **TailwindCSS** untuk tampilan yang menarik. Aplikasi ini mendukung **single chat** dan **group chat** dengan pembaruan UI secara real-time, desain yang **responsif**, serta kemampuan untuk **mengunggah dan berbagi file** seperti gambar, video, dan dokumen PDF.

Live Demo:

- Branch `main` (tanpa fitur upload file): [https://chat-room-app-main.netlify.app](https://chat-room-app-main.netlify.app)
- Branch `extended` (dengan fitur upload file): [https://chat-room-app-extended.netlify.app](https://chat-room-app-extended.netlify.app)

---

## 🚀 Fitur

### 🖥️ Fitur Utama Chat
- **Single Chat & Group Chat**
- Tampilan pesan **real-time** (UI langsung diperbarui setelah mengirim pesan)
- Jenis pesan yang didukung:
  - Pesan teks
  - Pesan file (gambar, video, PDF)

### 📂 Unggah File
- **Preview gambar** sebelum dikirim
- **Preview video** sebelum dikirim
- **Preview dokumen PDF** sebelum dikirim
- File yang sudah terkirim langsung tampil di chat

### 📱 Desain Responsif
- Optimal untuk **mobile**, **tablet**, dan **desktop**
- Layout adaptif menggunakan **TailwindCSS**
- Scroll halus & UI yang rapi untuk pengalaman pengguna yang lebih baik

### 🎨 UI/UX
- Tampilan chat minimalis & modern
- Styling cepat dengan utility class TailwindCSS
- Siap untuk dark/light theme (mudah dikonfigurasi)

---

## 📝 Catatan Pengembangan
> ⚠️ **Aplikasi masih dalam tahap pengembangan (development stage)**  
> - **Belum terhubung dengan real API** — semua data masih menggunakan **dummy data** yang disimpan di local repository.  
> - Fitur yang tersedia saat ini hanya:
>   - Mengirim pesan teks
>   - Mengunggah file (gambar, video, PDF)  
> - Fitur berikut **belum tersedia**:
>   - Menambah grup
>   - Menambah kontak
>   - Berpindah akun/login multi-user  
> - Struktur kode sudah dipersiapkan untuk integrasi dengan backend/API di tahap berikutnya.
> - Terdapat dua branch:
>   - Branch `main`, yang berisi kode aplikasi tanpa fitur upload file
>   - Branch `extended`, yang berisi kode aplikasi dengan fitur upload file

---

## 🛠️ Teknologi yang Digunakan

| Teknologi         | Deskripsi |
|-------------------|-----------|
| [Vite](https://vitejs.dev/) | Bundler pengembangan super cepat |
| [ReactJS](https://react.dev/) | Library UI untuk membangun komponen interaktif |
| [TailwindCSS](https://tailwindcss.com/) | Framework CSS berbasis utility-first |
| [React Hooks](https://react.dev/reference/react) | Untuk mengelola state dan efek samping |

---

## 📦 Instalasi & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/username/chat-room-app.git
cd chat-room-app
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Jalankan Development Server
```bash
npm run dev
```

Vite akan memulai server lokal dan menampilkan URL (biasanya http://localhost:5173).
