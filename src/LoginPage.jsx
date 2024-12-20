import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/login/",
        loginData,
        { withCredentials: true } // Ensure the cookies are sent with the request
      );
      
      if (response.status === 200) {
        const isSuperuser = response.data.is_superuser;
        if (isSuperuser) {
          navigate("/admin-dashboard"); // Redirect to Admin Dashboard
        } else {
          navigate("/employee-dashboard"); // Redirect to Employee Dashboard
        }
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  const handleInputChange = () => {
    // Clear the error message if the user starts typing again
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleInputChange();
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleInputChange();
            }}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
