function Navbar() {
  return (
    <div className="navbar">
      <span className="logo">ReChat</span>
      <div className="user">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
          alt=""
        />
        <span>Cleo</span>
        <button>Logout</button>
      </div>
    </div>
  );
}
export default Navbar;
