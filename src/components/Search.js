function Search() {
  return (
    <div className="search">
      <div className="search_container">
        <input type="text" placeholder="Search" />
      </div>
      <div className="userChat">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
          alt=""
        />
        <div className="userChatInfo">
          <span>Cleo</span>
        </div>
      </div>
    </div>
  );
}
export default Search;
