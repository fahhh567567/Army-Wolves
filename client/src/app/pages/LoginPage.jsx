import { useState } from "react";

export default function LoginPage({ onNext }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!username || !password) {
      setError("Missing username or password");
      return;
    }

    try {
      // temporary fake login
      console.log("Logging in:", username);

      // later:
      // const data = await login(username, password)

      onNext();
    } catch (err) {
      setError("Login failed");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1></h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(180deg,#1d2614,#0e140a)"
  },
  card: {
    width: 420,
    padding: 40,
    background: "#182012",
    border: "1px solid #2c3724",
    borderRadius: 12
  },
  input: {
    width: "100%",
    height: 56,
    marginBottom: 20,
    padding: "0 12px",
    fontSize: 16
  },
  button: {
    width: "100%",
    height: 60,
    fontWeight: "bold"
  },
  error: {
    color: "red"
  }
};