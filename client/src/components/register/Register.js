import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Layout from "../layout/Layout";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { auth, register } = useAuth();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match");
    } else {
      const data = {
        name: form.username,
        password: form.password,
      };
      register(data).then((res) => {
        if (!res.success) return alert(res.error);
        alert("Register successful!");
        navigate(`/login`);
      });
    }
  };

  if (auth) return <Navigate to="/" />;

  return (
    <Layout>
      <div className="register">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              minLength={6}
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
              minLength={8}
              maxLength={72}
              onChange={handleChange}
              value={form.password}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              onChange={handleChange}
              value={form.confirmPassword}
            />
          </div>
          <button className="register-button" type="submit">
            Register
          </button>
          <span>Already an user? </span>
          <Link to="/login">Log in here!</Link>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
