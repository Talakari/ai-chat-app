import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import { auth } from "./firebase";
import "./login.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account Created Successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="logo">
          <FaUserCircle />
        </div>

        <h1 className="title">
          AI Chat App
        </h1>

        <p className="subtitle">
          Create Your Account 🚀
        </p>

        <input
          className="input-box"
          type="email"
          placeholder="📧 Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input-box"
          type="password"
          placeholder="🔒 Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="auth-btn"
          onClick={handleSignup}
        >
          Create Account
        </button>

        <div className="link-text">
          <Link to="/">
            Already have an account? Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Signup;