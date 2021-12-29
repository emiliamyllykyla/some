import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { formatDate } from "../../functions/formatDate";
import TextTruncate from "react-text-truncate";

const placeholderImg =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

const PostCard = ({ post }) => {
  const { id, username, userImg, title, description, createdAt, img } = post;

  return (
    <div key={id} className="post-card">
      <div className="post-card-header">
        {img && <img className="post-img" src={img} alt="Post" />}{" "}
        <img
          className="post-author-avatar"
          src={userImg || placeholderImg}
          alt="Avatar"
        />
        <Link className="post-author-name" to={`/users/${username}`}>
          {username}
        </Link>
        <div className="post-timestamps">
          <span className="post-timestamp">{formatDate(createdAt)}</span>
        </div>
      </div>
      <h1 className="post-title">{title}</h1>
      <p className="post-description">
        <TextTruncate
          line={3}
          element="span"
          truncateText="…"
          text={description}
        />
      </p>
      <HashLink className="post-card-button" to={`/users/${username}#${id}`}>
        Read more
      </HashLink>
    </div>
  );
};

export default PostCard;
