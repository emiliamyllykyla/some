import { useState, useEffect, createContext, useContext } from "react";
import {
  loginApi,
  logoutApi,
  registerApi,
  authApi,
  deleteUserApi,
  editProfileImageApi,
} from "../api";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const login = async (data) =>
    loginApi(data).then((res) => res && setAuth(res.user));
  const logout = () => {
    setLoadingAuth(true);
    logoutApi().then(() => {
      setAuth(null);
      setLoadingAuth(false);
    });
  };
  const register = (data) => registerApi(data);
  const deleteUser = () => deleteUserApi().then(() => setAuth(null));
  const editProfileImage = (name, data) => editProfileImageApi(name, data);

  useEffect(() => {
    const authorize = async () => {
      setLoadingAuth(true);
      authApi().then((res) => {
        res.success ? setAuth(res.user) : logout();
        setLoadingAuth(false);
      });
    };
    if (!auth && !loadingAuth) authorize();
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        login,
        logout,
        register,
        deleteUser,
        editProfileImage,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
