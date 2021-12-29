import { Link } from "react-router-dom";
import Logout from "../logout/Logout";

const NavLinks = () => {
  return (
    <div>
      <Link to="/users">Users list</Link>
      <Link to="/feed">Feed</Link>
      <Link to="/settings">Settings</Link>
      <Logout />
    </div>
  );
};

export default NavLinks;
