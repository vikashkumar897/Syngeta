const express = require("express");
const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/BookLibrary");
};

// SCHEMA FOR BOOK LIBRARY
const booksSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    inStore: { type: Boolean, required: false, default: true },
    trackings: [{ type: Object, required: false }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// MODEL FOR BOOK LIBRARY
const Books = mongoose.model("book", booksSchema);

const app = express();
app.use(express.json());

app.get("/books", async (req, res) => {
  try {
    const books = await Books.find().lean().exec();
    return res.send(books);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/books/categories", async (req, res) => {
  try {
    const books = await Books.find().sort("category").lean().exec();
    return res.send(books);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/books/categories/:name", async (req, res) => {
  try {
    let books = await Books.find().lean().exec();
    books = books.filter((el) => el.category === req.params.name);
    return res.send(books);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/books/search/:name", async (req, res) => {
  try {
    const books = await Books.find().lean().exec();
    let titles = books.filter((el) => el.title === req.params.name);
    let authors = books.filter((el) => el.author === req.params.name);
    return res.send([...titles, ...authors]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/books/status/:id", async (req, res) => {
  try {
    const books = await Books.findById(req.params.id).lean().exec();
    return res.send(books.inStore ? "This book is in the Store" : "The book is out right now");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/books/track/:id", async (req, res) => {
  try {
    const books = await Books.findById(req.params.id).lean().exec();
    return res.send(books.trackings);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post("/books", async (req, res) => {
  try {
    const books = await Books.create(req.body);

    return res.status(201).send(books);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.listen(2345, async () => {
  try {
    await connect();
    console.log("listening on port 2345");
  } catch (e) {
    console.log(e.message);
  }
});
