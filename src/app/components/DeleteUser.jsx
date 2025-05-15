"use client"
import Image from "next/image";
import logo from "../../assets/adaptive-icon.png";
import { useState } from "react";
import axios from "axios";
export default function Deleteuser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

    const validate = () => {
    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Username is required.";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await axios.post(
        "/api/deleteUser",
        {
            username, password
        }
      );
      if (response.data.status == 200) {
        alert("Account deleted successfully.");
        setUsername("")
        setPassword("")
        setErrors({ username: "", password: "" });
      } else {
        alert("Failed to delete account.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-[#0066A1]">
      <div className="max-w-3xl mx-auto p-8 bg-gray-300 shadow-md rounded-lg">
        {/* <Image
          src={logo}
          height={100}
          width={100}
          alt="logo"
          className="mx-auto bg-[#0066A1]"
        /> */}

        <form onSubmit={handleSubmit} className="mb-10 bg-gray-50 p-6 rounded-lg mt-5">
          <h1 className="text-3xl text-center font-bold text-gray-800 border-b pb-3">
            Delete Account
          </h1>
          <p className="my-4 text-gray-700 text-center">
            To request the deletion of your account and associated data, please
            enter your username and password below:
          </p>
          <div className="mb-4 w-[90%] mx-auto">
            <label
              htmlFor="username"
              className="block mb-2 font-medium text-gray-700"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full max-w-md focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
            />
            {errors.username && (
              <p className="text-red-600 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div className="mb-4 w-[90%] mx-auto">
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full max-w-md focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="w-[90%] mx-auto">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete Account
            </button>
          </div>
        </form>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Data Deletion Details
          </h2>

          <p className="mb-4 text-gray-700">
            Upon account deletion, the following data will be permanently
            deleted:
          </p>

          <ul className="list-disc pl-10 mb-6 text-gray-700">
            <li className="mb-2">User profile information</li>
            <li className="mb-2">Transaction history</li>
          </ul>

          <p className="mb-4 text-gray-700">
            Data that may be retained for legal or operational reasons includes:
          </p>

          <ul className="list-disc pl-10 mb-4 text-gray-700">
            <li className="mb-2">
              Transaction records for a period of 30 days.
            </li>
          </ul>

          <p className="text-gray-700">
            We may retain certain information for up to 30 days after account
            deletion for legal or regulatory purposes.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Us</h2>

          <p className="text-gray-700">
            If you have any questions or need assistance, please contact us at{" "}
            <a
              href="mailto:support@yourapp.com"
              className="text-blue-600 hover:underline"
            >
              support@yourapp.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
