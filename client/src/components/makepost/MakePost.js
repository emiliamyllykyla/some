import { useState } from "react";
import { makePostApi } from "../../api";
import "../posts/PostForm.css";
import "./MakePost.css";

const initialForm = {
  title: "",
  description: "",
  img: "",
};
const MakePost = ({ onSuccess }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: form.title,
      description: form.description,
      img: form.img,
    };
    makePostApi(data).then((res) => {
      if (!res.success) return alert(res.error);
      onSuccess();
      setForm(initialForm);
      alert("Successfully posted!");
    });
  };

  return (
    <div className="make-post">
      <h1 className="make-post-header">Add a post</h1>
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
          Post
        </button>
      </form>
    </div>
  );
};

export default MakePost;
