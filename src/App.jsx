import React from "react";
import Dice from "./components/Dice";
import "bootstrap/dist/css/bootstrap.css";
import Confetti from "react-confetti";

const App = () => {
  const [dices, setDices] = React.useState([]);
  const [win, setWin] = React.useState(false);

  const getDices = () => {
    const newDices = [];
    for (let i = 0; i < 10; i++) {
      const number = Math.ceil(Math.random() * 6);
      const info = {
        id: i,
        number: number,
        clicked: false,
      };
      newDices.push(info);
    }
    setDices(newDices);
  };

  React.useEffect(getDices, []);

  const toggle = (id) => {
    setDices((prev) => {
      return prev.map((item) => {
        return item.id === id ? { ...item, clicked: !item.clicked } : item;
      });
    });
  };

  const info = dices.map((dice, index) => {
    return <Dice key={index} dice={dice} toggle={toggle} />;
  });

  const newRoll = () => {
    if (hasWon()) getDices();
    else {
      setDices((prev) => {
        return prev.map((item) => {
          return item.clicked === true
            ? item
            : { ...item, number: Math.ceil(Math.random() * 6) };
        });
      });
    }
  };

  const hasWon = () => {
    return dices.every(
      (item) => item.clicked === true && item.number === dices[0].number
    );
  };

  React.useEffect(() => {
    const result = hasWon();
    result ? setWin(true) : setWin(false);
  }, [dices]);

  const height = window.innerHeight;
  const width = window.innerWidth;

  return (
    <>
      {win && <Confetti width={width} height={height} />}
      <div className="card bg-light position-absolute top-50 start-50 translate-middle p-3 rounded-4">
        <h5 className="text-center">Tenzies</h5>
        <p className="text-center">
          press "Roll" to roll the dices. your goal is to collect 10 dices with
          same number on it. To lock your choice on each dice just press it once
          to unlock it press the dice again
        </p>

        <div className="d-flex flex-wrap justify-content-between gap-2 my-2">
          {info}
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-success" onClick={newRoll}>
            {win ? "New Game" : "Roll"}
          </button>
        </div>
      </div>
    </>
  );
};
export default App;
