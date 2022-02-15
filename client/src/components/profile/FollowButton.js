import { useEffect, useState } from "react";
import { follow, unfollow, checkIfFollowing } from "../../api";
import { useAuth } from "../../contexts/AuthContext";
import "./Profile.css";

const FollowButton = ({ user, onFollowChange }) => {
  const { auth } = useAuth();
  const [follows, setFollows] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleFollow = () =>
    follow(user.name).then((res) =>
      !res.success ? alert("Error: ", res.error) : setFollows(true)
    );

  const handleUnfollow = () =>
    unfollow(user.name).then((res) =>
      !res.success ? alert("Error: ", res.error) : setFollows(false)
    );

  useEffect(() => {
    const check = async () =>
      checkIfFollowing(user.name).then((res) => {
        if (!res.success) alert(res.error);
        setFollows(res.isFollowing);
        setLoading(false);
      });
    if (auth.id !== user.id) {
      check();
    }
  }, [auth, user]);

  useEffect(() => onFollowChange(), [follows, onFollowChange]);

  if (loading) return null;
  return auth.id !== user.id ? (
    <button
      onClick={() => (follows ? handleUnfollow() : handleFollow())}
      className={`follow-button${follows ? "-unfollow" : ""}`}
    >
      {follows ? "Unfollow" : "+ Follow"}
    </button>
  ) : null;
};

export default FollowButton;
