
import { useState, useEffect } from "react";

import Square from "../../Components/Square";
import { Patterns } from "../../Utils/Patterns";

import "../../App.css";

// Tic-tac-toe easy Game with a randomic selection "ia"
export default function EasyGame() {
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
    const [player, setPlayer] = useState("O");
    const [result, setResult] = useState({ winner: "none", state: "none" });

    useEffect(() => {
        checkWin()
        if (player === "X") {
            setPlayer("O");
        } else {
            setPlayer("X")
        }
    }, [board]);

    useEffect(() => {
        if (result.state === "Won") {
            alert(`Game Finished! Winning Player: ${result.winner}`);
            restartGame();
        }
        if (result.state === "Tie") {
            alert(`Game Finished! Tie`);
            restartGame();
        }
    }, [result]);

    useEffect(() => {
        if (player === "X") {
            iaPlay();
        }
    }, [player]);

    const iaPlay = () => {
        let clearSquares = [];
        board.forEach((square, index) => {
            if (square === "") {
                clearSquares.push(index);
            }
        });

        let random = Math.floor(Math.random() * clearSquares.length);
        chooseSquare(clearSquares.at(random));
    }

    const chooseSquare = (square) => {
        if (board[square] === "") {
            setBoard(
                board.map((val, idx) => {
                    if (idx === square && val === "") {
                        return player;
                    }

                    return val;
                })
            );
        }
    };

    const checkWin = () => {
        Patterns.forEach((currPattern) => {
            const firstPlayer = board[currPattern[0]];
            if (firstPlayer === "") return;

            let foundWinningPattern = true;
            currPattern.forEach((idx) => {
                if (board[idx] !== firstPlayer) {
                    foundWinningPattern = false;
                }
            });

            if (foundWinningPattern) {
                setResult({ winner: player, state: "Won" });
                return;
            }
        });

        let filled = true;
        board.forEach((square) => {
            if (square === "") {
                filled = false;
            }
        });

        if (filled) {
            if (result.state !== "Won") {
                setResult({ winner: "No One", state: "Tie" });
            }
        }
    };

    const restartGame = () => {
        setResult({ winner: "none", state: "none" });
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setPlayer("O");
    };

    return (
        <div className="App">
            <div className="board">
                <div className="row">
                    <Square
                        val={board[0]}
                        chooseSquare={() => {
                            chooseSquare(0);
                        }}
                    />
                    <Square
                        val={board[1]}
                        chooseSquare={() => {
                            chooseSquare(1);
                        }}
                    />
                    <Square
                        val={board[2]}
                        chooseSquare={() => {
                            chooseSquare(2);
                        }}
                    />
                </div>
                <div className="row">
                    <Square
                        val={board[3]}
                        chooseSquare={() => {
                            chooseSquare(3);
                        }}
                    />
                    <Square
                        val={board[4]}
                        chooseSquare={() => {
                            chooseSquare(4);
                        }}
                    />
                    <Square
                        val={board[5]}
                        chooseSquare={() => {
                            chooseSquare(5);
                        }}
                    />
                </div>
                <div className="row">
                    <Square
                        val={board[6]}
                        chooseSquare={() => {
                            chooseSquare(6);
                        }}
                    />
                    <Square
                        val={board[7]}
                        chooseSquare={() => {
                            chooseSquare(7);
                        }}
                    />
                    <Square
                        val={board[8]}
                        chooseSquare={() => {
                            chooseSquare(8);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}