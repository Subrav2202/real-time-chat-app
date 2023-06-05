import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatHistory } from "../../store/chat/chatAction";
import ChatHeader from "./ChatHeader";
import Masseges from "./Masseges";

function ChatBox() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);
  useEffect(() => {
    dispatch(getChatHistory(user?._id));
  }, []);
  return (
    <div>
      <ChatHeader />
      <Masseges />
    </div>
  );
}

export default ChatBox;
