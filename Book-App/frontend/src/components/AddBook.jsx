// import React from "react";
// import axios from "axios";
// const AddBook = () => {
//   const handlebook = async (e) => {
//     e.preventDefault();
//     const title = e.target.title.value;
//     const author = e.target.author.value;
//     const date = e.target.date.value;
//     const image = e.target.image.value;
//     const books = { title, author, date, image };
//     await axios.post("https://book-app-z6gn.onrender.com/books", books);
//     alert("Book Added Successfully");
//   };
//   return (
//     <div>
//       <h1>Add Book</h1>
//       <form onSubmit={handlebook}>
//         Title: <input type="text" name="title" required />
//         Author: <input type="text" name="author" required />
//         Date: <input type="date" name="date" required />
//         Image: <input type="text" name="image" required />
//         <button type="submit">Add Book</button>
//       </form>
//     </div>
//   );
// };

// export default AddBook;

import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleBook = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    const title = e.target.title.value;
    const author = e.target.author.value;
    const date = e.target.date.value;
    const image = e.target.image.value;
    const books = { title, author, date, image };

    try {
      await axios.post("https://book-app-z6gn.onrender.com/books", books);
      setMessage({ text: "Book added successfully!", type: "success" });
      e.target.reset(); // Reset form fields
    } catch (error) {
      console.error(error);
      setMessage({
        text: "Error adding book. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Add New Book</h1>

      <div className="form-container">
        {message.text && (
          <div
            className={`alert ${
              message.type === "success" ? "alert-success" : "alert-error"
            }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleBook}>
          <div className="form-group">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Enter the book title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              className="form-control"
              placeholder="Enter the author's name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Publication Date</label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Cover Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              className="form-control"
              placeholder="Enter the image URL"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
