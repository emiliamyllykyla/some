import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getUserImage } from "../../functions/getUserImage";
import NavLinks from "./NavLinks";
import NavLinksUnauth from "./NavLinksUnauth";
import NavAvatar from "./NavAvatar";
import "./Header.css";

const Header = () => {
  const { auth } = useAuth();
  const [img, setImg] = useState("");

  useEffect(() => {
    if (auth) getUserImage(auth.name).then((res) => setImg(res));
  }, [auth]);

  return (
    <div className="header">
      <div className="header-content">
        <Link className="header-logo" to="/">
          <h1>
            <span className="so">SO</span>
            <span className="pipe">|</span>
            <span className="me">ME</span>
          </h1>
        </Link>
        <nav className="header-nav">
          {auth ? <NavLinks /> : <NavLinksUnauth />}
          {auth && <NavAvatar img={img} />}
        </nav>
      </div>
    </div>
  );
};

export default Header;
