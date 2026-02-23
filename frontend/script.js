const API = "https://digital-book-library-backend.onrender.com/books";

async function fetchBooks() {
    const res = await fetch(API);
    const books = await res.json();
    displayBooks(books);
}

function displayBooks(books) {
    const container = document.getElementById("booksContainer");
    container.innerHTML = "";

    books.forEach(book => {
        container.innerHTML += `
            <div class="book-card">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p class="status ${book.read ? 'read' : 'unread'}">
                    ${book.read ? 'Read ✅' : 'Unread 📖'}
                </p>
                <button class="toggle-btn"
                    onclick="toggleRead('${book._id}', ${book.read})">
                    Toggle
                </button>
                <button class="delete-btn"
                    onclick="deleteBook('${book._id}')">
                    Delete
                </button>
            </div>
        `;
    });
}

async function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    if (!title || !author) {
        alert("Please enter title and author!");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author })
    });

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    fetchBooks();
}

async function toggleRead(id, currentStatus) {
    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !currentStatus })
    });

    fetchBooks();
}

async function deleteBook(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    fetchBooks();
}

fetchBooks();