import React from "react";

const Dice = ({ dice, toggle }) => {
  const [color, setColor] = React.useState("white");

  return (
    <button
      className="btn active"
      onClick={() => toggle(dice.id)}
      style={{ backgroundColor: dice.clicked ? "#588157" : "white" }}
    >
      {dice.number}
    </button>
  );
};

export default Dice;
