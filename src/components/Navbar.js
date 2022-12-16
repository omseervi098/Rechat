import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import { ChatContext } from "../context/Chat";
function Navbar(props) {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  return (
    <div className="navbar">
      <span className="logo">ReChat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button
          onClick={() => {
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
