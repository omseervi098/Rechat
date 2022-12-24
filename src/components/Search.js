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
  //This is search component which will search user and show user and start conversation
  const [username, setUsername] = useState(""); //username state to store username to search
  const [user, setUser] = useState(null); //user state to store user data which will be searched
  const [error, setError] = useState(null); //error state to store error
  const { currentUser } = useContext(AuthContext); //currentUser is user state fetched from AuthContext
  const { dispatch } = useContext(ChatContext); //dispatch is dispatch function fetched from ChatContext

  const handleSearch = async () => {
    //search user by username
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setError("User Not Found");
        //if user not found set user state to null
        setUser(null);
        return;
      }
      querySnapshot.forEach((doc) => {
        //if user found set user state
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
      //Create chat if not exists with user
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
        // Add currentuser to userChats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        //Add searched user to userChats
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
    // after creating chat set user state to null
    setUser(null);
    setUsername("");
    // dispatch  change user action to change user in ChatContext
    dispatch({ type: "CHANGE_USER", payload: u });
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
              // Set username state
              setUsername(e.target.value[0].toUpperCase() + s);
          }}
        />
        <i className="fas fa-search  text-white" onClick={handleSearch}></i>
      </div>
      {error && setTimeout(() => setError(null), 2000) && (
        // Show error if error state is not null
        <div className="p-2 text-white">{error}</div>
      )}
      {user && (
        // click on user to start conversation
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
