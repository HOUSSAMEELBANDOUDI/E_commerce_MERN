import { createContext, useContext } from "react";

type AuthContextType = {
  username: string;
  token: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  username: "",
  token: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
