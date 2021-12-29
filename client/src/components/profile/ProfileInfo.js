import FollowButton from "./FollowButton";
const placeholderImg =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

const ProfileInfo = ({ user, onFollowChange }) => {
  return (
    <div className="profile-info">
      <img
        className="profile-image"
        src={user.img || placeholderImg}
        alt="profile"
      />
      <h1>{user.name}</h1>
      <table className="profile-table">
        <thead>
          <tr>
            <th>Followers</th>
            <th>Following</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.followers | 0}</td>
            <td>{user.following | 0}</td>
          </tr>
        </tbody>
      </table>
      <FollowButton user={user} onFollowChange={onFollowChange} />
    </div>
  );
};

export default ProfileInfo;
