import React from "react";
import { useState } from "react";
import gunshot from "../Assets/GunShot.mp3";
import explosion from "../Assets/explosion.mp3";
import reloadS from "../Assets/reload.mp3";
import radarsound from "../Assets/Radar-sound.wav";
import sonarsound from "../Assets/Sonar.wav";
import errorsound from "../Assets/Error_alert.wav";


const Game = () => {
  // Loading sound assets and giving them variables to play them in diff functions
  let gunsound = new Audio(gunshot);
  let explosionsound = new Audio(explosion);
  let reloadsound = new Audio(reloadS);
  let radarSound = new Audio(radarsound);
  let sonarSound = new Audio(sonarsound);
  let errorSound = new Audio(errorsound);

  // Initializing states for all parts that are dynamic
  const [angle, setAngle] = useState("");
  const [ammo, setAmmo] = useState(3);
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 181));
  const [reloadStatus, setReloadStatus] = useState(true);
  const [gameText, setGameText] = useState(
    "New game has been started, happy shooting!"
  );
  const [radarStatus, setRadarStatus] = useState(true);
  const [radarText, setRadarText] = useState("");
  const nameTyping = (event) => setAngle(event.target.value);

  // Initializing variable used in function
  let ammoLeft = ammo;

  // Function used for the Start/Reset game button
  function startGame() {
    radarSound.play();
    setRandomNum(Math.floor(Math.random() * 181));
    setAmmo(3);
    setReloadStatus(true);
    setRadarStatus(true);
    setGameText("New game has been started, happy shooting!");
  }

  // Function used for the Reload game button
  function reload() {
    if (ammo > 0 && reloadStatus === false) {
      reloadsound.play();
      setAmmo(ammo - 1);
      setReloadStatus(true);
    } else if (reloadStatus === true) {
      setGameText("Shoot first before reloading!");
    } else if (ammo === 0) {
      setGameText("You are out of ammo, please restart the game");
    }
  }

  // Radar hidden state function
  let radarTextHider = () => {
    setRadarText("");
  };

  // Function used for the Radar Hint game button
  function radarhint() {
    if (radarStatus === true) {
      setRadarStatus(false);
      let upper = randomNum + 40;
      let lower = randomNum - 40;
      if (upper >= 180) {
        upper = 180;
      }
      if (lower <= 0) {
        lower = 0;
      }
      sonarSound.play();
      setRadarText(`The enemy sub is somewhere between ${lower} & ${upper}`);
      setTimeout(function () {
        radarTextHider();
      }, 3000);
    } else {
      errorSound.play();
      setRadarText("You have already used your radar hint");
      setTimeout(function () {
        radarTextHider();
      }, 3000);
    }
  }

  // Function used for the Shoot game button
  function shoot() {
    if (angle > 180 || angle < 0) {
      setGameText("Please enter an angle between 0-180");
    } else if (reloadStatus === false) {
      setGameText("Please Reload");
    } else if (
      Math.abs(randomNum - angle) <= 20 &&
      Math.abs(randomNum - angle) > 10 &&
      reloadStatus === true
    ) {
      setGameText("You're close, within a 20 degree range");
      gunsound.play();
      setReloadStatus(false);
    } else if (
      Math.abs(randomNum - angle) <= 40 &&
      Math.abs(randomNum - angle) > 20 &&
      reloadStatus === true
    ) {
      setGameText("You're within a 40 degree range, try again");
      gunsound.play();
      setReloadStatus(false);
    } else if (
      Math.abs(randomNum - angle) <= 179 &&
      Math.abs(randomNum - angle) > 40 &&
      reloadStatus === true
    ) {
      setGameText("You're waay too far! Try again.");
      gunsound.play();
      setReloadStatus(false);
    } else if (Math.abs(randomNum - angle) <= 10 && reloadStatus === true) {
      explosionsound.play();
      setGameText(
        "DIRECT HIT! GOOD JOB! Click Start/Reset and continue playing!"
      );
    }
  }

  return (
    <div className="gameComps">
      <h4>
        Enter an angle between 0°-180° to shoot your missle at the enemy
        submarine.If your number is within the 10 degree range of the enemy sub
        it will be shot down.
      </h4>
      <div className="gameprompts">
        <h4 className="gameText">{gameText}</h4>
      </div>

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
      <br />
      <button onClick={radarhint} className="Button">
        Radar Hint
      </button>
      <h4 className="radar">{radarText}</h4>
    </div>
  );
};

export default Game;
