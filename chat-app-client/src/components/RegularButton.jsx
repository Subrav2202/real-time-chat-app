import React from "react";

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "linear-gradient(to right, #3c5ae3 0%, #e7005e 100%)" ,
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
// eslint-disable-next-line react/prop-types
export default function RegularButton({ type, label }) {
  return (
    <button type={type} style={buttonStyle} className='sub-title'>
      {label}
    </button>
  );
}
