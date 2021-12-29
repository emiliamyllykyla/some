import { fetchPostsApi } from "../api";
import { getUserImage } from "./getUserImage";

const addUserImgsToPosts = (posts) =>
  Promise.all(
    posts.map((post) =>
      getUserImage(post.username).then((img) => ({
        ...post,
        userImg: img,
      }))
    )
  );

export const fetchPosts = async () =>
  fetchPostsApi().then(async (res) => {
    if (res.success) {
      const posts = await addUserImgsToPosts(res.posts);
      return { posts };
    }
    if (res.error) return { error: res.error };
  });
