// Import kelas Schema dari library Mongoose
const { Schema } = require("mongoose");

// Eksport fungsi yang menerima objek mongoose sebagai parameter
module.exports = mongoose => {
    
    // Buat skema untuk model News
    const schema = Schema(
        {
            title: String,
            author: String,
            content: String,
            url: String,
            url_image: String,
            published_at: Date,
            category: {
                type: String,
                enum: ['sport', 'finance', 'automotive'],
            },
        },
        {
            timestamps: true, // Otomatis tambahkan createdAt dan updatedAt
        }
    );

    // Tambahkan metode toJSON ke skema untuk mengubah objek menjadi format JSON
    schema.method("toJSON", function () {
        // Ambil semua properti objek, kecuali __v dan _id
        const { __v, _id, ...object } = this.toObject();
        
        // Tambahkan kembali ID dengan nama 'id'
        object.id = _id;
        return object;
    });

    // Kembalikan model News yang dibuat dengan skema yang telah didefinisikan
    return mongoose.model("news", schema);
};
