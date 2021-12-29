import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import PostsGrid from "./PostsGrid";
import { fetchPosts } from "../../functions/fetchPosts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(
    () =>
      fetchPosts().then((res) => {
        res.posts && setPosts(res.posts);
        res.error && setError(true);
        setLoading(false);
      }),
    []
  );

  if (loading) return <div>Loading posts...</div>;
  return (
    <Layout>
      <PostsGrid posts={posts} error={error} />
    </Layout>
  );
};

export default Home;
