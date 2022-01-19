import React from 'react';



const Game = () => {
    let ammoLeft = 3;
  return <div>
      <h3>Enter an angle between 0°-180° to shoot your missle</h3>
      <input className="entryField" placeholder="Enter Angle"/>
      <br/>
      <button className="Button">{`Reload (${ammoLeft})`}</button>
      <button className="Button">Shoot</button>
  </div>;
};

export default Game;
