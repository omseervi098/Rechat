import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import { ChatContext } from "../context/Chat";
function Navbar(props) {
  // This is navbar component which will show user profile and logout button
  const { currentUser } = useContext(AuthContext); //currentUser is user state fetched from AuthContext
  const { dispatch } = useContext(ChatContext); //dispatch is dispatch function fetched from ChatContext
  return (
    <div className="navbar">
      <span className="logo">ReChat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button
          onClick={() => {
            //On logout button click signout user and dispatch logout action to chat context
            auth.signOut();
            dispatch({ type: "LOGOUT" });
          }}
        >
          <span>Logout</span>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
  );
}
export default Navbar;
