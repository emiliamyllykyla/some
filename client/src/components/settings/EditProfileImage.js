import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getUserImage } from "../../functions/getUserImage";

const EditProfileImage = () => {
  const { auth, setAuth, editProfileImage } = useAuth();
  const [form, setForm] = useState({
    img: "",
  });

  useEffect(() => {
    getUserImage(auth.name).then((img) => {
      setForm({ img });
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      img: form.img,
    };
    editProfileImage(auth.name, data).then(async (res) => {
      if ("success" in res) {
        alert("Profile image changed!");
        setAuth({ ...auth, img: form.img });
      }
    });
  };

  if (!auth) return <Navigate to="/login" />;

  return (
    <div className="edit-profile-img">
      <h2>Edit Profile Image</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="img">Image</label>
          <input
            id="img"
            name="img"
            type="url"
            placeholder="Add a profile image Url"
            onChange={handleChange}
            value={form.img}
          />
        </div>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default EditProfileImage;
