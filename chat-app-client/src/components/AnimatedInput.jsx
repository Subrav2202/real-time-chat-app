// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSpring, animated } from "react-spring";

// eslint-disable-next-line react/prop-types
const AnimatedInput = ({ children }) => {
  const inputAnimation = useSpring({
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateY(-100px)" },
    config: { duration: 2000 },
  });

  return <animated.div style={inputAnimation}>{children}</animated.div>;
};

export default AnimatedInput;
