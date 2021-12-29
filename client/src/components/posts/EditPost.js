import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { editPostApi } from "../../api";
import "./PostForm.css";

const EditPost = ({ id, title, description, img, userId, onEditSuccess }) => {
  const [form, setForm] = useState({
    title,
    description,
    img,
  });
  const { auth } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editData = {
      title: form.title,
      description: form.description,
      img: form.img,
    };
    editPostApi(editData, id).then((res) => {
      if (!res.success) return alert(res.error);
      onEditSuccess();
      alert("Post edited!");
    });
  };

  if (auth.id !== userId) return null;
  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          maxLength={64}
          onChange={handleChange}
          value={form.title}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          rows={10}
          id="description"
          name="description"
          placeholder="Description"
          maxLength={3060}
          onChange={handleChange}
          value={form.description}
        />
      </div>
      <div className="form-group">
        <label htmlFor="img">Image</label>
        <input
          id="img"
          name="img"
          type="url"
          placeholder="Image Url"
          onChange={handleChange}
          value={form.img}
        />
      </div>
      <button className="save-button" type="submit">
        Save changes
      </button>
    </form>
  );
};

export default EditPost;
