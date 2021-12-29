import { useState } from "react";
import {Link} from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import "./Login.css";

const Login = () => {
  const { login, auth } = useAuth();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: form.username,
      password: form.password,
    };
    login(data);
  };

  if (auth) return <Navigate to="/" />;

  return (
    <Layout>
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              maxLength={30}
              onChange={handleChange}
              value={form.username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          <span>Not an user yet? </span><Link to="/register">Register here!</Link>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
