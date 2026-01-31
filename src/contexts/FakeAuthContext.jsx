import { createContext, useContext, useReducer } from "react";

const FakeAuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logout":
      return { ...state, isAuthenticated: false, user: null };
    default:
      throw new Error("Unknown action type" + action.type);
  }
}
const FAKE_USER = {
  name: "Mayank",
  email: "mayank@example.com",
  password: "hellohello",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function FakeAuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <FakeAuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </FakeAuthContext.Provider>
  );
}
function useFakeAuth() {
  const context = useContext(FakeAuthContext);
  if (context === undefined)
    throw new Error("FakeAuthContext was used outside of FakeAuthProvider");
  return context;
}
export { useFakeAuth, FakeAuthProvider };
