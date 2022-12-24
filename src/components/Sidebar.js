import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
function Sidebar(props) {
  return (
    <div className="sidebar">
      {/* Sidebar consist of navbar and search tab and chats (current conversation) */}
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
}
export default Sidebar;
