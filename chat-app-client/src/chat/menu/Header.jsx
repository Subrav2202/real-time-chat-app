import React from "react";
import { FaEdit, FaEllipsisH } from "react-icons/fa";

function Header() {
  return (
    <div className="header-wrapper sub-title">
      <h1 className="chat-heading">Chats</h1>
      <div>
        <FaEdit />
        <FaEllipsisH />
      </div>
    </div>
  );
}

export default Header;
