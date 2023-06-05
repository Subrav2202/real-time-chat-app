import { useState } from "react";
import '../styles/Chat/index.scss';
import axios from "axios";
import { useMessages } from "../hooks/useMessages";
import Menu from "../chat/menu/Menu";
import ChatBox from "../chat/chatbox/ChatBox";

function Chat() {
  const [messages] = useMessages();
  const [message, setMessage] = useState("");

  const sendHandler = async () => {
    try {
      await axios.post("http://localhost:5000/messages", {
        sender: "Subrao",
        fromId: "123",
        toId: "456",
        toName: "Mahesh",
        message,
      });
      // setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="chat-wrapper">
      <div className="menu-component">
        <Menu />
      </div>
      <div className="chatbox-component">
        <ChatBox />
      </div>
      {/* <h1>Chat APP</h1>
            {messages?.map((item, index) => {
                return <p key={index}>{item?.message}</p>;
            })}
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            ></input>
            <button onClick={sendHandler}>Send</button> */}
    </div>
  );
}

export default Chat;
