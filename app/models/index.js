// Import konfigurasi basis data dan Mongoose
const dbConfig = require("../config/database.js");
const mongoose = require("mongoose");

// Ekspor objek yang berisi informasi konfigurasi basis data dan model-model
module.exports = {
    mongoose,               // Ekspor kelas Mongoose
    url: dbConfig.URL,      // Ekspor URL basis data dari konfigurasi
    news: require('./news.model.js')(mongoose)  // Ekspor model 'news' dengan meneruskan kelas Mongoose
};
