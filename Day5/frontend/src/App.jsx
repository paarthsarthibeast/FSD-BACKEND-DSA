import React from "react";
import Register from "./components/Register";
import Update from "./components/Update";
import Delete from "./components/Delete";
import View from "./components/View";
import "./App.css";

const App = () => {
  return (
    <div className="main-container">
      <header className="header">
        <h1>User Management System</h1>
        <p>
          Manage user registrations, updates, deletions, and records with ease.
        </p>
      </header>
      <div className="content-grid">
        <section className="card">
          <h2>Register</h2>
          <Register />
        </section>
        <section className="card">
          <h2>Update</h2>
          <Update />
        </section>
        <section className="card">
          <h2>Delete</h2>
          <Delete />
        </section>
        <section className="card full-width">
          <h2>View Users</h2>
          <View />
        </section>
      </div>
    </div>
  );
};

export default App;
