const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Design Book Schema
const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  date: String,
  image: String,
});

// Design Model
const Book = mongoose.model("MyBook", BookSchema);

// POST /books - Add a new book
app.post("/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook); // Return the created book
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).send("Server Error");
  }
});

// GET /books - Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Server Error");
  }
});

// GET /books/:id - Get a book by ID
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Book Not Found");
    res.json(book);
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    res.status(400).send("Invalid Book ID");
  }
});

// GET /search - Search books by title
app.get("/search", async (req, res) => {
  const { title } = req.query;
  try {
    const books = await Book.find({ title: { $regex: title, $options: "i" } }); // Case-insensitive search
    res.json(books);
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).send("Server Error");
  }
});

// DELETE /books/:id - Delete a book by ID
app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).send("Book Not Found");
    res.send("Book deleted successfully");
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send("Server Error");
  }
});

// PUT /books/:id - Update a book by ID
app.put("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).send("Book Not Found");
    res.json(book);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(400).send("Invalid Book ID");
  }
});

// Start the server
app.listen(9000, () => {
  console.log("Server is running on port 9000");
});