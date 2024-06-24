import React from "react";

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick} 
      style={{ background: props.background, }}>
        {props.name}
      </button>
    </>
  );
};

export default Button;
