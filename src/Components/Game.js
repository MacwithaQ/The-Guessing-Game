import React from "react";
import { useState } from "react";

const Game = () => {
  const [angle, setAngle] = useState(0);
  const [ammo, setAmmo] = useState(3);
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 181));

  let ammoLeft = ammo;
  let reloadStatus = true;

  //   let randomNum = Math.floor(Math.random() * 181);

  function startGame() {
    setRandomNum(Math.floor(Math.random() * 181));
    setAmmo(3);
    window.alert("New game has been started, happy shooting!");
  }

  function reload() {
    if (ammo > 0) {
      setAmmo(ammo - 1);
      reloadStatus = true;
    } else {
      startGame();
    }
  }

  function shoot() {
    console.log(randomNum);
    if (angle > 180 || angle < 0) {
      window.alert("Please enter an angle between 0-180");
    } else if (reloadStatus === false) {
      window.alert("Please Reload");
    } else if (
      Math.abs(randomNum - angle) <= 20 &&
      Math.abs(randomNum - angle) > 10 &&
      reloadStatus === true
    ) {
      window.alert("You're close, within a 20 degree range");
      reloadStatus = false;
    } else if (
      Math.abs(randomNum - angle) <= 40 &&
      Math.abs(randomNum - angle) > 20 &&
      reloadStatus === true
    ) {
      window.alert("You're within a 40 degree range, try again");
      reloadStatus = false;
    } else if (
      Math.abs(randomNum - angle) <= 179 &&
      Math.abs(randomNum - angle) > 40 &&
      reloadStatus === true
    ) {
      window.alert("You're waay too far! Try again.");
      reloadStatus = false;
    } else if (Math.abs(randomNum - angle) <= 10 && reloadStatus === true) {
      window.alert(
        "DIRECT HIT! GOOD JOB! Click okay to reset and continue playing!"
      );
      startGame();
    }
  }

  const nameTyping = (event) => setAngle(event.target.value);

  return (
    <div>
      <h4>
        Enter an angle between 0°-180° to shoot your missle at enemy submarine.
      </h4>
      <h4>
        If your number is withing the 10 degree range of the enemy sub it will
        be shot down.
      </h4>

      <input
        className="entryField"
        placeholder="Enter Angle"
        onChange={nameTyping}
      />
      <br />

      <button
        className="Button"
        onClick={startGame}
      >{`Start/Reset Game`}</button>

      <br />

      <button
        className="Button"
        onClick={reload}
      >{`Reload (${ammoLeft})`}</button>
      <button onClick={shoot} className="Button">
        Shoot
      </button>
    </div>
  );
};

export default Game;
