import { useState } from "react";

import MultiplayerGame from "./Pages/multiplayer";

import './App.css';

function App() {

    const [gameType, setGameType] = useState(0);

    return (
        <div className="App">
            <div className="background">
                <div className="title">
                    <h1>Tic Tac Toe</h1>
                </div>
                <div className="menu">
                    {gameType !== 0 && (
                        <div className="align-start">
                            <button onClick={() => setGameType(0)} className="c-orange">MENU</button>
                        </div>
                    )}
                    {gameType === 0 && (
                        <div className="align-center">
                            <button onClick={() => setGameType(1)} className="c-yellow">MULTIPLAYER</button>
                            <button onClick={() => setGameType(2)} className="c-green">EASY (BOT)</button>
                            <button onClick={() => setGameType(3)} className="c-lightred">HARD (BOT)</button>
                        </div>
                    )}
                </div>
                {gameType === 1 && (
                    <MultiplayerGame />
                )}
            </div>
        </div>
    );
}

export default App;
