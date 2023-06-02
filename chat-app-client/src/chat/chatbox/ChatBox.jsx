import React, { useEffect, useState } from "react";
import Chatheader from "../../styles/ChatHeader.scss";
import Massege from "../../styles/Massege.scss";
import ChatHeader from "./ChatHeader";
import Masseges from "./Masseges";
import axios from "axios";
import { useSelector } from "react-redux";
import { getChatHistory } from "../../store/chat/chatAction";
import { useDispatch } from "react-redux";

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
