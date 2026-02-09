# Lumixor Studio - Equipment Loan Management System

Website fullstack untuk mengelola peminjaman peralatan studio (kamera, lensa, dan alat lainnya) secara internal. Sistem ini memiliki 2 role:

- **Admin**: Kelola users, equipment, approve/reject peminjaman
- **User**: Browse equipment, ajukan peminjaman, lihat status peminjaman

## Fitur

### User
- Register & Login 
- Browse equipment  
- Lihat detail equipment  
- Ajukan peminjaman alat  
- Lihat history & status peminjaman  

### Admin
- CRUD Equipment (Kamera, Lensa, Alat Lainnya)  
- CRUD Users  
- Approve/Reject peminjaman  
- Approve pengembalian  
- Lihat semua data peminjaman  

### Status System
- **Item**: `available`, `not available`
- **Loan**: `pending`, `approved`, `rejected`, `returned`

---

## Alur Peminjaman

1. User browse equipment & pilih item yang tersedia
2. User mengisi form peminjaman (tanggal mulai, selesai, deskripsi)
3. Status loan: **pending**
4. Admin approve peminjaman → Status loan: **approved** → Item status: **not available**
5. Setelah dikembalikan, admin approve return → Status loan: **returned** → Item status: **available**


## 🚀 Instalasi & Setup

### 1. Database Setup (HeidiSQL/Laragon)

1. Buka HeidiSQL atau phpMyAdmin
2. Import file `database/schema.sql`
3. Database `db_lumixor_studio` akan otomatis terbuat dengan sample data

**Default Users:**
- Admin: `admin@lumixor.com` / `admin123`
- User: `john@lumixor.com` / `user123`

### 2. Backend Setup

```bash
# Install dependencies
npm install

# Jalankan server (development mode)
npm run dev
```

Server akan berjalan di: **http://localhost:3000**

### 3. Frontend Setup

```bash
# Masuk ke folder client
cd client

# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Frontend akan berjalan di: **http://localhost:5173**