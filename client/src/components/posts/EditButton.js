import { useAuth } from "../../contexts/AuthContext";

const EditButton = ({ authorId, onClick, edit }) => {
  const { auth } = useAuth();

  if (auth.id !== authorId) return null;
  return (
    <button className="edit-post-button" onClick={onClick}>{edit ? "Cancel edit" : "Edit"}</button>
  );
};

export default EditButton;
