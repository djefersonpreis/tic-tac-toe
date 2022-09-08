
import { useState, useEffect } from "react";

import Square from "../../Components/Square";
import { Patterns } from "../../Utils/Patterns";

import "../../App.css";

// Tic-tac-toe easy Game with a minimax algorithm
export default function HardGame() {
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

    // Minimax algorithm to find the best move
    const iaPlay = () => {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "X";
                let score = minimax(board, 0, false);
                board[i] = "";
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        chooseSquare(move);

    }

    const minimax = (board, depth, isMaximizing) => {
        let result = checkWinner();
        if (result.state === "Won") {
            return result.winner === "X" ? 10 : -10;
        } else if (result.state === "Tie") {
            return 1;
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = "X";
                    let score = minimax(board, depth + 1, false);
                    board[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = "O";
                    let score = minimax(board, depth + 1, true);
                    board[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
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
    }

    const checkWinner = () => {
        let winner = null;
        Patterns.forEach((currPattern) => {
            const player = board[currPattern[0]];
            if (player === "") return; // IF is NOT a player, then return
            let foundWinningPattern = true;
            currPattern.forEach((idx) => {
                if (board[idx] !== player) {
                    foundWinningPattern = false;
                }
            });
            if (foundWinningPattern) {
                winner = player;
            }
        });

        if (winner) {
            return { winner: winner, state: "Won" };
        } else if (!board.includes("")) {
            return { winner: "none", state: "Tie" };
        } else {
            return { winner: "none", state: "none" };
        }
    };

    const checkWin = () => {
        let check = checkWinner();
        if (check.state !== "none") {
            setResult(check);
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