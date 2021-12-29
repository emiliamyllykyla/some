import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Posts from "../posts/Posts";
import { fetchPostsFollowing } from "../../functions/fetchPostsFollowing";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getPosts = () => {
    setLoading(true);
    return fetchPostsFollowing()
      .then((res) => {
        res.posts && setPosts(res.posts);
        res.error && setError(true);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => getPosts(), []);

  if (loading) return <div>Loading posts...</div>;
  return (
    <Layout>
      <Posts
        posts={posts}
        error={error}
        onDelete={() => getPosts()}
        onEditSuccess={() => getPosts()}
      />
    </Layout>
  );
};

export default Feed;
