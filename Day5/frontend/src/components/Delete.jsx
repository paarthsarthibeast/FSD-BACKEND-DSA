import React from "react";
import axios from "axios";
import "./comp.css";

const Delete = () => {
  const handleDelete = async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    await axios.delete(`https://fsd-backend-dsa-v0wr.onrender.com/users/${id}`);
    alert("Product deleted successfully");
  };
  return (
    <div>
      <h1>Delete User</h1>
      <form onSubmit={handleDelete}>
        <input type="text" placeholder="Enter Product ID" name="id" />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default Delete;
