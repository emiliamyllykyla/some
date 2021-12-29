import { fetchPostsByUserApi } from "../api";

const addUserImgsToPosts = (posts, user) =>
  posts.map((post) => ({
    ...post,
    userImg: user.img,
  }));

export const fetchPostsByUser = async (user) =>
  fetchPostsByUserApi(user.id).then((res) => {
    if (res.error) return { error: res.error };
    return {
      posts: addUserImgsToPosts(res.posts, user),
    };
  });
