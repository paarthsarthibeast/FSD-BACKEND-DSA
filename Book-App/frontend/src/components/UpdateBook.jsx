// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import "./UpdateBook.css";

// const UpdateBook = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedBookId, setSelectedBookId] = useState("");
//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     date: "",
//     image: "",
//   });

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

//   const handleSelect = (id) => {
//     const selected = books.find((book) => book._id === id);
//     if (selected) {
//       setSelectedBookId(id);
//       setFormData({
//         title: selected.title,
//         author: selected.author,
//         date: selected.date,
//         image: selected.image,
//       });
//     }
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `https://book-app-z6gn.onrender.com/books/${selectedBookId}`,
//         formData
//       );
//       alert("Book updated successfully");
//       fetchBooks();
//     } catch (error) {
//       console.error(error);
//       alert("Error updating book");
//     }
//   };

//   return (
//     <div className="update-book-container">
//       <h2>Update Book</h2>
//       <h4>Select a book to update:</h4>
//       <ul className="book-list">
//         {books.map((book) => (
//           <li key={book._id}>
//             <strong>{book.title}</strong> by {book.author}
//             <button onClick={() => handleSelect(book._id)}>Edit</button>
//           </li>
//         ))}
//       </ul>

//       {selectedBookId && (
//         <form onSubmit={handleUpdate} className="update-book-form">
//           <input
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Title"
//             required
//           />
//           <input
//             name="author"
//             value={formData.author}
//             onChange={handleChange}
//             placeholder="Author"
//             required
//           />
//           <input
//             name="date"
//             type="date"
//             value={formData.date}
//             onChange={handleChange}
//             placeholder="Publish Date"
//           />
//           <input
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             placeholder="Image URL"
//           />
//           <button type="submit">Update Book</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default UpdateBook;

import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    date: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setIsFetching(true);
      const res = await axios.get("http://localhost:9000/books");
      setBooks(res.data);
      setMessage({ text: "", type: "" });
    } catch (error) {
      console.error(error);
      setMessage({ text: "Error fetching books", type: "error" });
    } finally {
      setIsFetching(false);
    }
  };

  const handleSelect = (id) => {
    const selected = books.find((book) => book._id === id);
    if (selected) {
      setSelectedBookId(id);
      // Format date to YYYY-MM-DD for input field
      const formattedDate = selected.date ? selected.date.split("T")[0] : "";

      setFormData({
        title: selected.title || "",
        author: selected.author || "",
        date: formattedDate,
        image: selected.image || "",
      });
      setMessage({ text: "", type: "" });
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await axios.put(
        `http://localhost:9000/books/${selectedBookId}`,
        formData
      );
      setMessage({ text: "Book updated successfully", type: "success" });
      fetchBooks();
      // Clear selection after successful update
      setSelectedBookId("");
      setFormData({
        title: "",
        author: "",
        date: "",
        image: "",
      });
    } catch (error) {
      console.error(error);
      setMessage({ text: "Error updating book", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Update Book</h1>

      {message.text && (
        <div
          className={`alert ${
            message.type === "success" ? "alert-success" : "alert-error"
          }`}>
          {message.text}
        </div>
      )}

      <div className="update-container">
        <div className="book-selection">
          <h2 className="section-title">Select a Book to Update</h2>

          {isFetching ? (
            <div className="loading">Loading books...</div>
          ) : books.length === 0 ? (
            <div className="no-results">No books available to update</div>
          ) : (
            <ul className="book-list">
              {books.map((book) => (
                <li
                  key={book._id}
                  className={`book-list-item ${
                    selectedBookId === book._id ? "selected" : ""
                  }`}>
                  <div className="book-list-info">
                    <strong>{book.title}</strong>
                    <p>by {book.author}</p>
                  </div>
                  <div className="book-list-actions">
                    <button
                      onClick={() => handleSelect(book._id)}
                      className="btn btn-secondary">
                      Select
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedBookId && (
          <div className="form-container">
            <h2 className="section-title">Update Book Details</h2>
            <form onSubmit={handleUpdate} className="update-form">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  id="author"
                  name="author"
                  className="form-control"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Publication Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Cover Image URL</label>
                <input
                  id="image"
                  name="image"
                  className="form-control"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Book"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setSelectedBookId("");
                    setFormData({
                      title: "",
                      author: "",
                      date: "",
                      image: "",
                    });
                  }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateBook;
