import React, { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
  // State for form input
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Added successMessage state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      first_name: firstName,
      username,
      email,
      phone_number: phoneNumber,
      password, // You might need to hash this or adjust based on your backend requirements
    };

    try {
      // Sending POST request to the API
      const response = await axios.post('http://127.0.0.1:8000/api/user/', userData);
      if (response.status === 201) {
        // Show success message and clear form fields
        setSuccessMessage('Signup successful! You can now log in.');
        setErrorMessage(''); // Clear any error message
        setFirstName('');
        setUsername('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
      }
    } catch (error) {
      setErrorMessage('Signup failed. Please try again.');
      setSuccessMessage(''); // Clear any success message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 px-6 py-12">
      <div className="bg-white text-gray-800 rounded-xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-purple-600">Signup</h2>
        
        {errorMessage && <p className="text-sm text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-sm text-green-500 mb-4">{successMessage}</p>} {/* Show success message */}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="firstName" className="text-lg font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-5 text-black text-lg placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="username" className="text-lg font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-5 text-black text-lg placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-5 text-black text-lg placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="text-lg font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-5 text-black text-lg placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-5 text-black text-lg placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <button type="submit" className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg text-lg hover:bg-purple-700 transition">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
