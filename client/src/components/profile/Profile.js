import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { getUserApi } from "../../api";
import { fetchPostsByUser } from "../../functions/fetchPostsByUser";
import ProfileInfo from "./ProfileInfo";
import Layout from "../layout/Layout";
import MakePost from "../makepost/MakePost";
import Posts from "../posts/Posts";
import "./Profile.css";

const Profile = () => {
  const { name } = useParams();
  const { auth } = useAuth();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [postsError, setPostsError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchUser = (name) =>
    getUserApi(name)
      .then((res) => {
        res.error && setError(res.error);
        res.user && setUser(res.user);
        setLoading(false);
      })
      .catch((err) => console.log(err));

  const getPosts = (user) => {
    setLoadingPosts(true);
    return fetchPostsByUser(user)
      .then((res) => {
        res.posts && setPosts(res.posts);
        res.error && setPostsError(res.error);
        setLoadingPosts(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => fetchUser(name), [name]);
  useEffect(() => user && getPosts(user), [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <Layout>
      {user && (
        <div
          className={
            auth && auth.name === user.name ? "profile-auth" : "profile"
          }
        >
          <ProfileInfo user={user} onFollowChange={() => fetchUser(name)} />
          {auth && auth.name === user.name && (
            <MakePost onSuccess={() => getPosts(user)} />
          )}
          <div className="profile-posts">
            {loadingPosts ? (
              "Loading..."
            ) : (
              <Posts
                posts={posts}
                error={postsError}
                onDelete={() => getPosts(user)}
                onEditSuccess={() => getPosts(user)}
              />
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
