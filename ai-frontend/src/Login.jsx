import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import { auth } from "./firebase";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      alert(
        "Login Successful: " +
          userCredential.user.email
      );
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
          Welcome Back 👋
        </p>

        <input
          className="input-box"
          type="email"
          placeholder="📧 Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          className="input-box"
          type="password"
          placeholder="🔒 Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="auth-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <div className="link-text">
          <Link to="/signup">
            New User? Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;