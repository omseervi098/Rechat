import React, { useState, useContext } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { AuthContext } from "../context/Auth";
import { ChatContext } from "../context/Chat";
function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setError("User Not Found");
        setUser(null);
        return;
      }
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setError(err);
    }
  };
  const handleSelect = async (u) => {
    //Check if user exists in firebase (userChats)
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        //Add user to userChats

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
    //Create user chats
    setUser(null);
    setUsername("");
    dispatch({ type: "CHANGE_USER", payload: u });
    //Add user to userChats
  };
  return (
    <div className="search">
      <div className="search_container d-flex align-items-center justify-content-between">
        <input
          type="text"
          placeholder="Search"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          onChange={(e) => {
            let s = e.target.value.slice(1).toLowerCase();
            setError(null);
            if (e.target.value[0] !== undefined)
              setUsername(e.target.value[0].toUpperCase() + s);
          }}
        />
        <i className="fas fa-search  text-white" onClick={handleSearch}></i>
      </div>
      {error && setTimeout(() => setError(null), 2000) && (
        <div className="p-2 text-white">{error}</div>
      )}
      {user && (
        <div className="userChat" onClick={() => handleSelect(user)}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
export default Search;
