import { createContext, useContext } from "react";

type AuthContextType = {
  username: string ;
  token: string | null;
  login: (username: string, token: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  username: "",
  token: "",
  login: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
