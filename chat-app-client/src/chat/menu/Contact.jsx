import React from "react";
import { useSelector } from "react-redux";
function Contact() {
  const { chatHistory } = useSelector((state) => state.chat);
  console.log(chatHistory, "chatHistory");
  return (
    <div className="contact-wrapper">
      {chatHistory?.map((user, index) => {
        return (
          <div className="contact-info" key={index}>
            <img src={user?.imageUrl} alt="profile-image" className="avatar" />
            <div className="name-wrapper .thin-text">
              <p className="name">{`${user?.firstName} ${user?.lastName}`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Contact;
