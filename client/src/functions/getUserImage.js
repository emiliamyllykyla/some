import { getUserApi } from "../api";

export const getUserImage = (name) =>
  getUserApi(name)
    .then((res) => res.user.img)
    .catch((err) => console.log(err));
