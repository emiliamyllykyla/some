import "./PostsGrid.css";
import PostCard from "./PostCard";

const PostsGrid = ({ posts, error }) => {
  return (
    <div className="posts-grid">
      {error
        ? "Couldn't access posts!"
        : posts.length === 0 && "No posts to show!"}
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
};

export default PostsGrid;
