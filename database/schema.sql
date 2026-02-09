CREATE DATABASE IF NOT EXISTS db_lumixor_studio;

USE db_lumixor_studio;

-- tabel buat nyimpen data akun (admin dan karyawan)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- hash password ada di bawah
    role ENUM('admin', 'user') DEFAULT 'user'
);

-- daftar alat studio yang tersedia di inventaris
CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category ENUM(
        'Kamera',
        'Lensa',
        'Alat Lainnya'
    ) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    status ENUM('available', 'not available') DEFAULT 'available'
);

-- buat nyatet riwayat peminjaman alat
CREATE TABLE IF NOT EXISTS loans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    description TEXT,
    status ENUM(
        'pending',
        'approved',
        'rejected',
        'returned'
    ) DEFAULT 'pending',
    -- relasi antar tabel (foreign key)
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items (id) ON DELETE CASCADE
);

-- dummy data

-- akun buat login admin
INSERT INTO
    users (name, email, password, role)
VALUES (
        'Admin Lumixor',
        'admin@lumixor.com',
        '$2b$10$K9b.8fA3M2S.KzG1.7O6G.h1G2F3E4D5C6B7A8m9n0o1p2q3r4s5t',
        'admin'
    );

-- daftar kamera buat test
INSERT INTO
    items (
        name,
        category,
        description,
        image,
        status
    )
VALUES (
        'Canon EOS R5',
        'Kamera',
        'Full-frame mirrorless camera dengan 45MP sensor dan 8K video recording',
        'https://via.placeholder.com/400x300?text=Canon+EOS+R5',
        'available'
    ),
    (
        'Sony A7 IV',
        'Kamera',
        'Hybrid full-frame camera dengan 33MP dan advanced autofocus',
        'https://via.placeholder.com/400x300?text=Sony+A7+IV',
        'available'
    ),
    (
        'Nikon Z9',
        'Kamera',
        'Professional flagship mirrorless dengan 45.7MP stacked sensor',
        'https://via.placeholder.com/400x300?text=Nikon+Z9',
        'available'
    ),
    (
        'Fujifilm X-T5',
        'Kamera',
        'APS-C camera dengan 40MP sensor dan film simulation modes',
        'https://via.placeholder.com/400x300?text=Fujifilm+XT5',
        'available'
    );

-- daftar lensa buat testing
INSERT INTO
    items (
        name,
        category,
        description,
        image,
        status
    )
VALUES (
        'Canon RF 24-70mm f/2.8L',
        'Lensa',
        'Professional standard zoom lens untuk Canon RF mount',
        'https://via.placeholder.com/400x300?text=Canon+RF+24-70',
        'available'
    ),
    (
        'Sony FE 70-200mm f/2.8 GM',
        'Lensa',
        'Professional telephoto zoom lens dengan G Master optics',
        'https://via.placeholder.com/400x300?text=Sony+70-200',
        'available'
    ),
    (
        'Nikon Z 50mm f/1.8 S',
        'Lensa',
        'Sharp prime lens untuk portrait dan low-light photography',
        'https://via.placeholder.com/400x300?text=Nikon+50mm',
        'available'
    ),
    (
        'Sigma 35mm f/1.4 ART',
        'Lensa',
        'Wide-angle prime lens dengan bokeh yang indah',
        'https://via.placeholder.com/400x300?text=Sigma+35mm',
        'available'
    );

-- alat2 lainn
INSERT INTO
    items (
        name,
        category,
        description,
        image,
        status
    )
VALUES (
        'Manfrotto MT055CXPRO3',
        'Alat Lainnya',
        'Professional carbon fiber tripod dengan maksimum tinggi 170cm',
        'https://via.placeholder.com/400x300?text=Manfrotto+Tripod',
        'available'
    ),
    (
        'Godox AD200 Pro',
        'Alat Lainnya',
        'Portable flash dengan TTL dan HSS support',
        'https://via.placeholder.com/400x300?text=Godox+Flash',
        'available'
    ),
    (
        'DJI Ronin-S',
        'Alat Lainnya',
        'Single-handed gimbal stabilizer untuk DSLR dan mirrorless',
        'https://via.placeholder.com/400x300?text=DJI+Ronin',
        'available'
    ),
    (
        'Rode VideoMic Pro+',
        'Alat Lainnya',
        'On-camera shotgun microphone dengan rechargeable battery',
        'https://via.placeholder.com/400x300?text=Rode+Mic',
        'available'
    ),
    (
        'Aputure 120D II',
        'Alat Lainnya',
        'Powerful LED light dengan 30,000 lux output',
        'https://via.placeholder.com/400x300?text=Aputure+Light',
        'available'
    ),
    (
        'Sandisk Extreme PRO 128GB',
        'Alat Lainnya',
        'High-speed SD card UHS-II dengan 300MB/s read speed',
        'https://via.placeholder.com/400x300?text=SD+Card',
        'available'
    );

-- sample login user biasa

INSERT INTO
    users (name, email, password, role)
VALUES (
        'John Doe',
        'john@lumixor.com',
        '$2b$10$K9b.8fA3M2S.KzG1.7O6G.h1G2F3E4D5C6B7A8m9n0o1p2q3r4s5t',
        'user'
    );