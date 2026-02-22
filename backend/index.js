const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./models/Book");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/booklibrary")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log(err));

/* CREATE */
app.post("/books", async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.json(book);
});

/* READ */
app.get("/books", async (req, res) => {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
});

/* UPDATE (Toggle Read) */
app.put("/books/:id", async (req, res) => {
    const updated = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
});

/* DELETE */
app.delete("/books/:id", async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));