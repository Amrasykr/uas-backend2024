module.exports = app => {
    const news = require("../controllers/news.controller");
    const router = require('express').Router();

    // Rute untuk mendapatkan semua berita
    router.get("/", news.findAll);                                  // GET localhost:8000/news

    // Rute untuk mendapatkan detail berita berdasarkan ID
    router.get("/:id", news.show);                                  // GET localhost:8000/news/{{id}}

    // Rute untuk menambahkan berita baru
    router.post("/", news.create);                                  // POST localhost:8000/news

    // Rute untuk memperbarui berita berdasarkan ID
    router.put("/:id", news.update);                                // PUT localhost:8000/news/{{id}}

    // Rute untuk menghapus berita berdasarkan ID
    router.delete("/:id", news.delete);                             // DELETE localhost:8000/news/{{id}}

    // Rute untuk mencari berita berdasarkan judul
    router.get("/search/:title", news.searchByTitle);               // GET localhost:8000/news/search/{{title}}

    // Rute untuk mendapatkan berita berdasarkan kategori
    router.get("/category/:category", news.findByCategory);         // GET localhost:8000/category{{category}}

    // Gunakan prefix "/news" untuk semua rute di router ini
    app.use("/news", router);
}
