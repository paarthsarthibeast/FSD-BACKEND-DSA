import React from "react";
import axios from "axios";

const Register = () => {
  const handleRegister = async (e) => {
    e.preventDefault();
    const user = {
      name: e.target.name.value,
      age: e.target.age.value,
    };
    await axios.post(`https://fsd-backend-dsa-v0wr.onrender.com/users/`, user);
    alert("User registered successfully!!");
  };
  return (
    <div>
      <h1>Register User</h1>
      <form onSubmit={handleRegister}>
        <div class="Name_R">
          <label>Name &nbsp; : </label>
          <input type="text" name="name" placeholder="Enter Your Name" />
        </div>
        <div class="Age_R">
          <label>Age &nbsp;&nbsp;&nbsp;&nbsp; : </label>
          <input type="text" name="age" placeholder="Enter Your Age" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
