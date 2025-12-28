import { useState } from "react";
import type { ReactNode} from "react";
import AuthContext from "./AuthContext";

type Props = {
  children: ReactNode;
};

function AuthProvider({ children }: Props) {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const login = (username: string, token: string) => {
    setUsername(username);
    setToken(token);

    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        token,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
