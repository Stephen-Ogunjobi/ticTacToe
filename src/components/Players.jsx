import React, { useState } from "react";

const Players = ({ symbol, initialPlayerName, isActive, onChange }) => {
  const [playerName, setPlayerName] = useState(initialPlayerName);
  const [edit, setEdit] = useState(false);

  function handleEdit() {
    setEdit((edit) => !edit);

    if (edit) {
      onChange(symbol, playerName);
    }
  }

  function handlePlayerName(e) {
    setPlayerName(e.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (edit) {
    editablePlayerName = (
      <input
        type="text"
        value={playerName}
        onChange={handlePlayerName}
        required
      />
    );
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span id="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol} </span>
      </span>
      <button onClick={handleEdit}>{edit ? "SAVE" : "EDIT"}</button>
    </li>
  );
};

export default Players;
