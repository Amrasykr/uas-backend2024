const express = require('express');
const cors = require('cors');
const db = require("./app/models/index.js");
const app = express();

// Konfigurasi CORS untuk mengizinkan akses dari semua origin
const corsOptions = {
    origin: '*',
};

// Mendaftarkan middleware cors
app.use(cors(corsOptions));

// Menggunakan middleware untuk membaca data JSON dari permintaan
app.use(express.json());

// Menghubungkan ke database MongoDB
db.mongoose.connect(db.url)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });

// Rute sederhana untuk menunjukkan bahwa server berjalan
app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

// Memanggil rute terkait berita
require("./app/routes/news.route.js")(app);

// Menentukan port server, default 8000
const PORT = process.env.PORT || 8000;

// Mendengarkan port dan menampilkan pesan ketika server dimulai
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
