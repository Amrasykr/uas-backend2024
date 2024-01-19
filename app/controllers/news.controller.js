const db = require('../models');
const news = db.news;
const Joi = require('joi');

// Schema validasi untuk data berita
const newsSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    content: Joi.string().required(),
    url: Joi.string(),
    url_image: Joi.string(),
    published_at: Joi.date(),
    category: Joi.string().valid('sport', 'finance', 'automotive'),
});

// Fungsi untuk membuat data berita baru
exports.create = (req, res) => {
    // Validasi data masukan menggunakan Joi
    const { error } = newsSchema.validate(req.body);

    // Jika validasi gagal, kirim respons dengan status 422 dan pesan error
    if (error) {
        return res.status(422).send({ message: error.details[0].message });
    }

    // Ubah tipe data tanggal terbit menjadi objek Date
    req.body.published_at = new Date(req.body.published_at);

    // Tambahkan data ke koleksi news dan kirim respons dengan status 201 dan data yang berhasil ditambahkan
    news.create(req.body)
        .then(data => res.status(201).send({ message: 'Resource is added successfully', data }))
        .catch(err => res.status(500).send({ message: err }));
};

// Fungsi untuk mencari semua data berita
exports.findAll = (req, res) => {
    // Temukan semua data dalam koleksi news
    news.find()
        .then(data => {
            // Jika tidak ada data, kirim respons dengan status 404 dan pesan "Data Berita Kosong"
            if (data.length === 0) {
                res.status(404).send({ message: 'Data Berita Kosong' });
            } else {
                // Jika ada data, kirim respons dengan status 200 dan data
                res.status(200).send({ message: 'Get All Resource', data });
            }
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

// Fungsi untuk menampilkan detail data berita berdasarkan ID
exports.show = (req, res) => {
    const id = req.params.id;

    // Temukan data berita berdasarkan ID yang diberikan
    news.findById(id)
        .then(data => {
            // Jika tidak ada data, kirim respons dengan status 404 dan pesan "Resource not found"
            if (!data) {
                res.status(404).send({ message: 'Resource not found' });
            } else {
                // Jika ada data, kirim respons dengan status 200 dan data
                res.status(200).send({ message: 'Get Detail Resource', data });
            }
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

// Fungsi untuk mencari data berita berdasarkan judul
exports.searchByTitle = (req, res) => {
    const title = req.params.title;

    // Temukan data berita berdasarkan judul yang diberikan
    news.findOne({ title: title })
        .then(data => {
            // Jika tidak ada data, kirim respons dengan status 404 dan pesan "Resource not found"
            if (!data) {
                res.status(404).send({ message: 'Resource not found' });
            } else {
                // Jika ada data, kirim respons dengan status 200 dan data
                res.status(200).send({ message: 'Get Detail Resource By Title', data });
            }
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

// Fungsi untuk memperbarui data berita berdasarkan ID
exports.update = (req, res) => {
    // Validasi data masukan menggunakan Joi
    const { error } = newsSchema.validate(req.body);

    // Jika validasi gagal, kirim respons dengan status 400 dan pesan error
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    const id = req.params.id;
    req.body.published_at = new Date(req.body.published_at);

    // Perbarui data berita berdasarkan ID yang diberikan
    news.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            // Jika data tidak ditemukan, kirim respons dengan status 404 dan pesan "Resource not found, unable to update"
            if (!data) {
                res.status(404).send({ message: "Resource not found, unable to update" });
            } else {
                // Jika data berhasil diperbarui, kirim respons dengan status 200 dan data yang diperbarui
                res.status(200).send({ message: "Resource updated successfully", data });
            }
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

// Fungsi untuk menghapus data berita berdasarkan ID
exports.delete = (req, res) => {
    const id = req.params.id;

    // Hapus data berita berdasarkan ID yang diberikan
    news.findOneAndDelete({ _id: id })
        .then(data => {
            // Jika data tidak ditemukan, kirim respons dengan status 404 dan pesan "Resource not found, unable to delete"
            if (!data) {
                res.status(404).send({ message: "Resource not found, unable to delete" });
            } else {
                // Jika data berhasil dihapus, kirim respons dengan status 200 dan pesan sukses
                res.status(200).send({ message: "Resource deleted successfully" });
            }
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

// Fungsi untuk mencari data berita berdasarkan kategori
exports.findByCategory = (req, res) => {
    const category = req.params.category;

    // Temukan data berita berdasarkan kategori yang diberikan
    news.find({ category: category })
        .then(data => {
            // Dapatkan total data
            const totalData = data.length;

            // Jika tidak ada data, kirim respons dengan status 404 dan pesan "No news found for category: {category}"
            if (totalData === 0) {
                res.status(404).send({ message: `No news found for category: ${category}` });
            } else {
                // Jika ada data, kirim respons dengan status 200, total data, pesan, dan data
                res.status(200).send({ message: `Get All Resources in Category: ${category}`, totalData, data });
            }
        })
        .catch(err => res.status(500).send({ message: err.message }));
};


