import { useState } from "react";
import api from "../api";

export default function Login() {
  const [hm, setHm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const onChange = (e) => setHm({ ...hm, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/login", hm);
      alert(data.message || "Login successful");
      // if you later add JWT, store it here:
    } catch (err) {
      alert(err?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card form-card">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label>
          Username
          <input
            name="username"
            value={hm.username}
            onChange={onChange}
            placeholder="Enter username"
            required
            autoComplete="username"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={hm.password}
            onChange={onChange}
            placeholder="Enter password"
            required
            autoComplete="current-password"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}
