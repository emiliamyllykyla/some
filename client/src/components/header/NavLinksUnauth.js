import { Link } from "react-router-dom";

const NavLinksUnauth = () => {
  return (
    <>
      <Link to="/users">Users list</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
  );
};

export default NavLinksUnauth;
