// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const DeleteBook = () => {
//   const [books, setBooks] = useState([]);

//   // Fetch all books on component mount
//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       const res = await axios.get("https://book-app-z6gn.onrender.com/books");
//       setBooks(res.data);
//     } catch (error) {
//       console.error(error);
//       alert("Error fetching books");
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = confirm("Are you sure you want to delete this book?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`https://book-app-z6gn.onrender.com/books/${id}`);
//       alert("Book deleted successfully");
//       fetchBooks(); // Refresh book list after deletion
//     } catch (error) {
//       console.error(error);
//       alert("Error deleting book");
//     }
//   };

//   return (
//     <div>
//       <h2>Delete Books</h2>
//       {books.length === 0 ? (
//         <p>No books available</p>
//       ) : (
//         <ul>
//           {books.map((book) => (
//             <li key={book._id}>
//               <strong>{book.title}</strong> by {book.author}{" "}
//               <button onClick={() => handleDelete(book._id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default DeleteBook;

import React, { useEffect, useState } from "react";
import axios from "axios";

const DeleteBook = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Fetch all books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:9000/books");
      setBooks(res.data);
      setMessage({ text: "", type: "" });
    } catch (error) {
      console.error(error);
      setMessage({ text: "Error fetching books", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );
    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      await axios.delete(`http://localhost:9000/books/${id}`);
      setMessage({
        text: `"${title}" was deleted successfully`,
        type: "success",
      });
      fetchBooks(); // Refresh book list after deletion
    } catch (error) {
      console.error(error);
      setMessage({ text: "Error deleting book", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="page">
      <h1 className="page-title">Delete Books</h1>

      {message.text && (
        <div
          className={`alert ${
            message.type === "success" ? "alert-success" : "alert-error"
          }`}>
          {message.text}
        </div>
      )}

      {isLoading ? (
        <div className="loading">Loading books...</div>
      ) : books.length === 0 ? (
        <div className="no-results">No books available to delete</div>
      ) : (
        <div className="delete-book-list">
          <ul className="book-list">
            {books.map((book) => (
              <li key={book._id} className="book-list-item">
                <div className="book-list-content">
                  <div className="book-thumbnail">
                    <img
                      src={book.image}
                      alt={book.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/60x80?text=No+Image";
                      }}
                      className="book-list-image"
                    />
                  </div>
                  <div className="book-list-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author}</p>
                    <p className="book-date">
                      Published: {formatDate(book.date)}
                    </p>
                  </div>
                </div>
                <div className="book-list-actions">
                  <button
                    onClick={() => handleDelete(book._id, book.title)}
                    className="btn btn-danger"
                    disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
