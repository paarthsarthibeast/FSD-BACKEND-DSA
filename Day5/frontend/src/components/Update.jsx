import React from "react";
import axios from "axios";

const Update = () => {
  const handleupdate = async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const name = e.target.name.value;
    const age = e.target.age.value;
    const data = { name, age };
    await axios.put(
      `https://fsd-backend-dsa-v0wr.onrender.com/users/${id}`,
      data
    );
    alert("SUCCESS");
  };
  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleupdate} class="labelupdate">
        <label>
          ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;
          <input type="text" name="id" placeholder="Enter Product ID" />
        </label>
        <label>
          Name &nbsp; : &nbsp;
          <input type="text" name="name" placeholder="Enter Name" />
        </label>
        <label>
          Age &nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;
          <input type="text" name="age" placeholder="Enter Age" />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Update;
