// import React, { useState } from "react";
// import axios from "axios";
// import "./search.css";

// const SearchBook = () => {
//   const [query, setQuery] = useState("");
//   const [books, setBooks] = useState([]);

//   const handleSearch = async () => {
//     if (!query) {
//       alert("Please enter a title to search");
//       return;
//     }

//     try {
//       const res = await axios.get(
//         `https://book-app-z6gn.onrender.com/search?title=${query}`
//       );
//       setBooks(res.data);
//     } catch (error) {
//       console.error(error);
//       alert("Error while fetching books");
//     }
//   };

//   return (
//     <div>
//       <h2>Search Books</h2>
//       <input
//         type="text"
//         placeholder="Enter book title"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>

//       <div>
//         {books.length > 0 ? (
//           <ul>
//             {books.map((book) => (
//               <li key={book._id}>
//                 <strong>{book.title}</strong> by {book.author} <br />
//                 <img src={book.image} alt={book.title} width="100" />
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No books found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchBook;

import React, { useState } from "react";
import axios from "axios";

const SearchBook = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      setSearched(true);
      const res = await axios.get(
        `http://localhost:9000/search?title=${encodeURIComponent(query)}`
      );
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      alert("Error while fetching books");
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
      <h1 className="page-title">Search Books</h1>

      <div className="form-container">
        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Enter book title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>

        {isLoading ? (
          <div className="loading">Searching for books...</div>
        ) : searched ? (
          books.length > 0 ? (
            <div className="search-results">
              <h2 className="results-title">Search Results</h2>
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
                      <p className="book-date">
                        Published: {formatDate(book.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-results">No books found matching "{query}"</div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default SearchBook;
