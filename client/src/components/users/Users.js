import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Layout from "../layout/Layout";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { auth } = useAuth();

  const fetchUsers = async () => {
    fetch("/users")
      .then((res) => res.json())
      .then((res) => setUsers(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [auth]);

  return (
    <Layout>
      Users in database:{" "}
      {users.map((user, i) => (
        <p key={i}>{user.name}</p>
      ))}
    </Layout>
  );
};

export default Users;
