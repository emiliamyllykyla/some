import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Feed from "./components/feed/Feed";
import Users from "./components/users/Users";
import Header from "./components/header/Header";
import Profile from "./components/profile/Profile";
import PrivateRoute from "./components/private/PrivateRoute";
import Settings from "./components/settings/Settings";
import Home from "./components/home/Home";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/feed" element={<Feed />} />
          </Route>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/users/:name" element={<Profile />} />
          </Route>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
