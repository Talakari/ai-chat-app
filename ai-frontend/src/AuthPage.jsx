import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";
import App from "./App";
import Login from "./Login";

function AuthPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ color: "white", background: "black", minHeight: "100vh" }}>
        Loading...
      </div>
    );
  }

  return user ? <App /> : <Login />;
}

export default AuthPage;