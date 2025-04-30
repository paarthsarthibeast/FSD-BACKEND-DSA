// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// import "./App.css";
// import AddBook from "./components/AddBook";
// import ViewBook from "./components/ViewBook";
// import SearchBook from "./components/SearchBook";
// import UpdateBook from "./components/UpdateBook";
// import DeleteBook from "./components/DeleteBook";

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100">
//         <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-center space-x-8">
//           <Link
//             className="hover:text-blue-400 transition duration-200 font-medium"
//             to="/add">
//             Add Book
//           </Link>
//           <Link
//             className="hover:text-blue-400 transition duration-200 font-medium"
//             to="/view">
//             View Book
//           </Link>
//           <Link
//             className="hover:text-blue-400 transition duration-200 font-medium"
//             to="/search">
//             Search Book
//           </Link>
//           <Link
//             className="hover:text-blue-400 transition duration-200 font-medium"
//             to="/update">
//             Update Book
//           </Link>
//           <Link
//             className="hover:text-blue-400 transition duration-200 font-medium"
//             to="/delete">
//             Delete Book
//           </Link>
//         </nav>

//         <main className="p-6">
//           <Routes>
//             <Route path="/add" element={<AddBook />} />
//             <Route path="/view" element={<ViewBook />} />
//             <Route path="/search" element={<SearchBook />} />
//             <Route path="/update" element={<UpdateBook />} />
//             <Route path="/delete" element={<DeleteBook />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import "./BookApp.css"; // Updated CSS import
import AddBook from "./components/AddBook";
import ViewBook from "./components/ViewBook";
import SearchBook from "./components/SearchBook";
import UpdateBook from "./components/UpdateBook";
import DeleteBook from "./components/DeleteBook";

// Custom NavLink component to handle active state
const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link className={`nav-link ${isActive ? "active-link" : ""}`} to={to}>
      {children}
    </Link>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1 className="site-title">Book Management System</h1>
          <nav>
            <NavLink to="/add">Add Book</NavLink>
            <NavLink to="/view">View Books</NavLink>
            <NavLink to="/search">Search Books</NavLink>
            <NavLink to="/update">Update Book</NavLink>
            <NavLink to="/delete">Delete Book</NavLink>
          </nav>
        </header>

        <main className="container">
          <Routes>
            <Route path="/" element={<ViewBook />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/view" element={<ViewBook />} />
            <Route path="/search" element={<SearchBook />} />
            <Route path="/update" element={<UpdateBook />} />
            <Route path="/delete" element={<DeleteBook />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2025 Book Management System</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
