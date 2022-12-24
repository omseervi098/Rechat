import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./Auth";
export const ChatContext = createContext();
// Create chat context provider to provide chat state to all components
export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };
  // Create reducer to change chat state which will be used to change chat id and user
  const chatReducer = (state, action) => {
    switch (action.type) {
      // Change chat id and user
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      // Logout user
      case "LOGOUT":
        return {
          chatId: "null",
          user: {},
        };
      default:
        return state;
    }
  };
  // Create chat context state
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
