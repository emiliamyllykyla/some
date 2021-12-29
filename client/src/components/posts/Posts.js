import { useState } from "react";
import { Link } from "react-router-dom";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import EditButton from "./EditButton";
import { formatDate } from "../../functions/formatDate";
import "./Posts.css";

const placeholderImg =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

const Posts = ({ posts, error, onDelete, onEditSuccess }) => {
  const [edit, setEdit] = useState(false); // false | id

  return (
    <div>
      {error
        ? "Couldn't access posts!"
        : posts.length === 0 && "No posts to show!"}
      {posts.map((post) => {
        return (
          <div key={post.id} id={post.id} className="post">
            <div className="post-header">
              {post.img && (
                <img className="post-img" src={post.img} alt="Post" />
              )}
              <img
                className="post-author-avatar"
                src={post.userImg || placeholderImg}
                alt="Avatar"
              />
              <Link className="post-author-name" to={`/users/${post.username}`}>
                {post.username}
              </Link>
              <div className="post-timestamps">
                <span className="post-timestamp">
                  {formatDate(post.createdAt)}
                </span>
                {post.updatedAt && (
                  <span className="post-timestamp-updated">
                    Updated on {formatDate(post.updatedAt)}
                  </span>
                )}
              </div>
            </div>
            {edit.id === post.id ? (
              <EditPost
                id={post.id}
                title={post.title}
                img={post.img || ""}
                description={post.description}
                userId={post.userId}
                onEditSuccess={() => {
                  setEdit(false);
                  onEditSuccess();
                }}
              />
            ) : (
              <div className="post-content">
                <h1 className="post-title">{post.title}</h1>
                <p className="post-description">{post.description}</p>
              </div>
            )}
            <EditButton
              authorId={post.userId}
              onClick={() =>
                setEdit((prev) => (prev === false ? { id: post.id } : false))
              }
              edit={edit && edit.id === post.id ? true : false}
            />
            <DeletePost
              id={post.id}
              authorId={post.userId}
              onDelete={onDelete}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
