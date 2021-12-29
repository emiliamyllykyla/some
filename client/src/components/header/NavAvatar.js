import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const placeholderImg =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

const NavAvatar = ({ img }) => {
  const { auth } = useAuth();

  return (
    <Link to={`/users/${auth.name}`}>
      <img
        className="header-user-avatar"
        src={img || placeholderImg}
        alt="profile"
      />
    </Link>
  );
};

export default NavAvatar;
