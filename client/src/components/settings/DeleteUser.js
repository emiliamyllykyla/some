import { useAuth } from "../../contexts/AuthContext";

const DeleteUser = () => {
  const { deleteUser } = useAuth();

  return (
    <button className="delete-user-button" onClick={deleteUser}>
      Delete account
    </button>
  );
};

export default DeleteUser;
