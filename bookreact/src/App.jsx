import { useEffect, useState } from "react";
import "./App.css";

const API = "https://digital-book-library-backend.onrender.com/books";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // ✅ Fetch Books
  const fetchBooks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ✅ Add Book
  const addBook = async () => {
    if (!title || !author) {
      alert("Please enter title and author!");
      return;
    }

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });

    setTitle("");
    setAuthor("");
    fetchBooks();
  };

  // ✅ Toggle Read / Unread
  const toggleRead = async (id, currentStatus) => {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !currentStatus }),
    });

    fetchBooks();
  };

  // ✅ Delete Book
  const deleteBook = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    fetchBooks();
  };

  return (
    <div className="App">
      <h1 className="logo">📚 My Reading Shelf</h1>

      {/* Book Form */}
      <div className="book-form">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <button onClick={addBook}>Add Book</button>
      </div>

      {/* Books Display */}
      <div className="books-container">
        {books.map((book) => (
          <div className="book-card" key={book._id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>

            <p
              className={`status ${
                book.read ? "read" : "unread"
              }`}
            >
              {book.read ? "Read ✅" : "Unread 📖"}
            </p>

            <button
              className="toggle-btn"
              onClick={() =>
                toggleRead(book._id, book.read)
              }
            >
              READ / UNREAD
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteBook(book._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;