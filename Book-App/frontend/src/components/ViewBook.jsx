// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const ViewBook = () => {
//   const [books, setBooks] = useState([]);
//   useEffect(() => {
//     handleview();
//   }, []);
//   const handleview = async () => {
//     try {
//       const res = await axios.get("http://localhost:9000/books");
//       setBooks(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       <h1>View Book Details</h1>

//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {books.map((book) => (
//           <div key={book._id}>
//             <img
//               src={book.image}
//               style={{
//                 border: "1px solid green",
//                 borderRadius: "15px",
//                 width: "250px",
//                 height: "300px",
//               }}
//             />
//             <h3>{book.title}</h3>
//             <h2>{book.author}</h2>
//             <h2>{book.date}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewBook;

import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewBook = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    handleView();
  }, []);

  const handleView = async () => {
    try {
      setIsLoading(true);
      // Note: Your backend URL was inconsistent - using the render.com URL like in other components
      const res = await axios.get("https://book-app-z6gn.onrender.com/books");
      setBooks(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load books. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="page">
      <h1 className="page-title">Library Collection</h1>

      {isLoading ? (
        <div className="loading">Loading books...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : books.length === 0 ? (
        <div className="no-results">No books available in the library</div>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <div key={book._id} className="book-card">
              <img
                src={book.image}
                alt={book.title}
                className="book-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/250x300?text=No+Image";
                }}
              />
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <p className="book-date">Published: {formatDate(book.date)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewBook;
