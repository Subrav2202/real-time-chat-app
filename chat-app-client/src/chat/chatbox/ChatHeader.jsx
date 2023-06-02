import React from "react";
import demopic from "../../assets/images/demo-pic.jpeg";
import { FaPhone, FaVideo, FaSearch } from "react-icons/fa";

function ChatHeader() {
  return (
    <div className="chat-header">
      <img src={demopic} alt="profile-image" className="avatar" />
      <div className="name-wrapper .thin-text">
        <p className="name">Manoj Jadhav</p>
        <p className="status">Offline</p>
      </div>
      <div className="icons">
        <FaVideo className="icon"/>
        <FaPhone  className="icon"/>
        <FaSearch  className="icon"/>
      </div>
    </div>
  );
}

export default ChatHeader;
