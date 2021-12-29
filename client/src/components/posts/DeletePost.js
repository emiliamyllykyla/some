import { useAuth } from "../../contexts/AuthContext";
import { deletePostApi } from "../../api";

const DeletePost = ({ id, authorId, onDelete }) => {
  const { auth } = useAuth();

  const handleClick = () => deletePostApi(id).then(() => onDelete());

  if (auth.id !== authorId) return null;

  return (
    <button className="delete-post-button" onClick={handleClick}>
      Delete
    </button>
  );
};

export default DeletePost;
