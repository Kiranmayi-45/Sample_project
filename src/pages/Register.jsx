import { useState } from "react";
import api from "../api";

export default function Register() {
  const [hm, setHm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setHm({ ...hm, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/register", hm);
      alert(data.message || "Registered!");
      setHm({ username: "", password: "" });
    } catch (err) {
      alert(err?.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card form-card">
      <h2>Create Account</h2>
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
            autoComplete="new-password"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </section>
  );
}
