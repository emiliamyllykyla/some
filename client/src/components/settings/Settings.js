import Layout from "../layout/Layout";
import EditProfileImage from "./EditProfileImage";
import DeleteUser from "./DeleteUser";
import "./Settings.css";

const Settings = () => {

  return (
    <Layout>
      <div className="settings">
        <h1>Settings</h1>
        <EditProfileImage />
        <DeleteUser />
      </div>
    </Layout>
  );
};

export default Settings;
