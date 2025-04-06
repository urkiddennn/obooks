import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    isbn: { type: String, required: true },
    title: { type: String, required: true },
    authors: [{ name: String }],
    publish_date: String,
    cover: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    favorite: { type: Boolean, default: false } // Changed from 'favorate' to 'favorite'
});

bookSchema.index({ isbn: 1, user: 1 }, { unique: true });

export default mongoose.model('Book', bookSchema);
