import { useEffect, useState } from "react";
import { RiRepeatFill } from "react-icons/ri";

/**
 * The main component of the Simple Tic-Tac-Toe game.
 * @returns A JSX element representing the game board.
 */
function App(): JSX.Element {
    /**
     * Whether the component has been mounted.
     */
    const [mount, setMount] = useState(false);

    /**
     * The initial state of the game board.
     */
    const initialBoard = new Array(3).fill("").map(() => new Array(3).fill(""));

    /**
     * The current state of the game board.
     */
    const [boardState, setBoardState] = useState<Array<Array<string>>>(initialBoard);

    /**
     * The current turn of the game.
     */
    const [turn, setTurn] = useState<"X" | "O">("X");

    /**
     * The winner of the game.
     */
    const [win, setWin] = useState<"X" | "O" | null>(null);

    /**
     * Whether the game is a draw.
     */
    const [draw, setDraw] = useState(false);

    /**
     * Handles a move on the board.
     * @param i - The row index of the move.
     * @param j - The column index of the move.
     */
    const handleMove = (i: number, j: number): void => {
        // Check if the move is valid
        if (boardState[i][j] === "") {
            // Create a new board state with the move
            const newBoardState = [...boardState];
            newBoardState[i][j] = turn;
            // Update the board state and the turn
            setBoardState(newBoardState);
            setTurn(turn === "X" ? "O" : "X");
        } else {
            // Alert the user if the move is invalid
            alert("Invalid move");
        }

        return;
    };

    /**
     * Checks if there is a winner in the game.
     * @param board - The current state of the game board.
     */
    const checkWinner = (board: Array<Array<string>>): void => {
        const winningCombinations: Array<Array<string>> = [
            // Row
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],

            // Column
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],

            // Diagonal
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]],
        ];

        let drawVar = true;
        winningCombinations.forEach((combination) => {
            if (combination.every((cell: string) => cell === "X")) {
                /**
                 * If every cell in the combination is equal to "X", then the game is won by "X".
                 */
                setWin("X");
            }

            if (combination.every((cell: string) => cell === "O")) {
                /**
                 * If every cell in the combination is equal to "O", then the game is won by "O".
                 */
                setWin("O");
            }

            if (drawVar && combination.some((cell: string) => cell === "")) {
                /**
                 * If the combination contains at least one empty cell, then the game is not over.
                 */
                drawVar = false;
            }
        });

        if (drawVar) {
            /**
             * If the game is not won by either "X" or "O", and every combination contains at least one empty cell, then the game is a draw.
             */
            setDraw(true);
        }

        return;
    };

    // Hooks
    useEffect(() => {
        // Mount the component
        setMount(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // console.log(boardState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mount]);

    useEffect(() => {
        // Check for a winner
        checkWinner(boardState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boardState]);

    if (mount)
        return (
            <>
                <h1 className='text-6xl font-extrabold text-center text-violet-400 mt-12 mb-4'>Tic-Tac-Toe</h1>
                <div className='flex items-center justify-center w-[450px] mx-auto my-0 p-0'>
                    <div className='flex flex-wrap w-full h-full items-center justify-center'>
                        {boardState &&
                            boardState.map((row, i) =>
                                row.map((col, j) => (
                                    <button
                                        key={i * 3 + j}
                                        className={`ease-in w-36 h-36 mr-1.5 mb-1.5 text-6xl font-extrabold rounded-md text-slate-700 row-col-${i}-${j} ${col === "X" ? "bg-violet-300" : col === "O" ? "bg-sky-300" : "bg-slate-200"} `}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleMove(i, j);
                                        }}
                                        disabled={win !== null}
                                    >
                                        {col || ""}
                                    </button>
                                ))
                            )}
                    </div>
                </div>
                {(win || draw) && (
                    <div className='flex justify-between items-center w-[450px] mx-auto px-2'>
                        {draw && win === null && <span className={`text-3xl font-extrabold mb-4 text-amber-500`}>DRAW</span>}
                        {win && <span className={`text-3xl font-extrabold mb-4 ${win === "X" ? "text-violet-300" : "text-sky-300"}`}>{win === "X" ? "X Wins!" : "O Wins!"}</span>}
                        <button
                            className='flex justify-center items-center text-3xl font-extrabold mb-4 text-amber-300'
                            onClick={() => {
                                setWin(null);
                                setBoardState(initialBoard);
                                setDraw(false);
                                setTurn("X");
                            }}
                        >
                            <RiRepeatFill />
                        </button>
                    </div>
                )}
            </>
        );

    return <></>;
}

export default App;
