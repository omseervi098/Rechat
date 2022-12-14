function Input() {
  return (
    <div className="send-message ">
      <input type="text" placeholder="Type a message" />
      <div className="send-message-icon">
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <i className="fas fa-paperclip"></i>
        </label>
        <div className="smile">
          <i className="fas fa-smile"></i>
        </div>
        <button>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}
export default Input;
