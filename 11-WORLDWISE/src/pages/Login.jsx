import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useFakeAuthContext } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();

  const { login, isAuthenticated, user } = useFakeAuthContext();
  console.log("isAuthenticated ", isAuthenticated);

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(() => {
    console.log("effect runned");
    if (isAuthenticated && user) {
      navigate("/app");
    }
  }, [isAuthenticated, user]);

  // useEffect(() => {
  //   if (isAuthenticated) navigate("/app");
  // }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button>Login</button>
        </div>
      </form>
    </main>
  );
}
