// Users
export const loginApi = (data) =>
  fetch("/users/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      res.ok && console.log("Login successful");
      return res.json();
    })
    .then((res) =>
      "error" in res ? alert(res.error) : { success: true, user: res.user }
    )
    .catch((err) => console.log(err));

export const logoutApi = () =>
  fetch("/users/logout", {
    method: "delete",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.ok && console.log("Logout successful"))
    .catch((err) => console.log(err));

export const registerApi = (data) =>
  fetch("/users", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) console.log("Register successful");
      else return res.json();
    })
    .then((res) =>
      res && "error" in res
        ? { success: false, error: res.error }
        : { success: true }
    )
    .catch((err) => console.log(err));

export const authApi = () =>
  fetch("/users/token", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) =>
      res.user
        ? { success: true, user: res.user }
        : { success: false, error: res.error }
    )
    .catch((err) => console.log(err));

export const deleteUserApi = () =>
  fetch("/users/", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) console.log("User deleted");
      else return res.json();
    })
    .then((res) => res && "error" in res && alert(res.error))
    .catch((err) => console.log(err));

export const getUserApi = (name) =>
  fetch(`/users/${name}`)
    .then((res) => res.json())
    .then((res) =>
      "error" in res
        ? { success: false, error: res.error }
        : { success: true, user: res.user }
    )
    .catch((err) => console.log(err));

export const editProfileImageApi = (name, data) =>
  fetch(`/users/${name}/edit`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) console.log("Edit successful!");
      else return res.json();
    })
    .then((res) =>
      res && "error" in res ? alert(res.error) : { success: true }
    )
    .catch((err) => console.log(err));

// Follow
export const follow = (name) =>
  fetch(`/users/${name}/follow`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  })
    .then((res) => {
      if (res.ok) console.log("Followed!");
      else return res.json();
    })
    .then((res) =>
      res && "error" in res
        ? { success: false, error: res.error }
        : { success: true }
    )
    .catch((err) => console.log(err));

export const unfollow = (name) =>
  fetch(`/users/${name}/unfollow`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  })
    .then((res) => {
      if (res.ok) console.log("Unfollowed!");
      else return res.json();
    })
    .then((res) =>
      res && "error" in res
        ? { success: false, error: res.error }
        : { success: true }
    )
    .catch((err) => console.log(err));

export const checkIfFollowing = (name) =>
  fetch(`/users/${name}/isfollowing`)
    .then((res) => res.json())
    .then((res) =>
      "error" in res
        ? { success: false, error: res.error }
        : { success: true, isFollowing: res.isFollowing }
    )
    .catch((err) => console.log(err));

// Posts
export const fetchPostsApi = () =>
  fetch("/posts", {
    method: "get",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((res) =>
      res.posts
        ? { success: true, posts: res.posts }
        : { success: false, error: res.error }
    )
    .catch((err) => console.log(err));

export const fetchPostsFollowingApi = () =>
  fetch("/posts/following", {
    method: "get",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((res) =>
      res.posts
        ? { success: true, posts: res.posts }
        : { success: false, error: res.error }
    )
    .catch((err) => console.log(err));

export const fetchPostsByUserApi = (id) =>
  fetch(`/users/${id}/posts`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((res) =>
      res.posts
        ? { success: true, posts: res.posts }
        : { success: false, error: res.error }
    )
    .catch((err) => console.log(err));

export const makePostApi = (data) =>
  fetch("/posts", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) console.log("Posted!");
      else return res.json();
    })
    .then((res) =>
      res && "error" in res
        ? { success: false, error: res.error }
        : { success: true }
    )
    .catch((err) => console.log(err));

export const deletePostApi = (id) =>
  fetch(`/posts/delete/${id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  })
    .then((res) => {
      if (res.ok) console.log("Post deleted");
      else return res.json();
    })
    .then((res) => res && "error" in res && alert(res.error))
    .catch((err) => console.log(err));

export const editPostApi = (data, id) =>
  fetch(`/posts/edit/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) console.log("Post edited");
      else return res.json();
    })
    .then((res) =>
      res && "error" in res
        ? { success: false, error: res.error }
        : { success: true }
    )
    .catch((err) => console.log(err));
