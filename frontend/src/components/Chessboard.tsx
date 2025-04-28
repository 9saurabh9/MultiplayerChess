import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

interface BoardPropsType {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}

const Chessboard = ({ board, socket }: BoardPropsType) => {
  const [from, setFrom] = useState<Square | undefined>(undefined);

  const handleClick = (square: Square) => {
    if (from === undefined) {
      setFrom(square);
    } else {
      socket.send(
        JSON.stringify({
          type: MOVE,
          move: { from: from, to: square },
        })
      );
      setFrom(undefined);
    }
    console.log({ from, square });
  };

  return (
    <div className="text-white-200 w-full mx-20 overflow-hidden flex flex-col">
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="flex h-16">
            {row.map((cell, cellIndex) => {
              var squareRepresentation = cell?.square;
              if (cell === null) {
                squareRepresentation = (String.fromCharCode(97 + cellIndex) +
                  (8 - rowIndex)) as Square;
              }
              return (
                <div
                  onClick={() => handleClick(squareRepresentation!)}
                  className={`flex items-center justify-center w-full h-full ${
                    (rowIndex + cellIndex) % 2 === 0
                      ? "bg-white"
                      : "bg-green-500"
                  }`}
                  key={cellIndex}
                >
                  {cell && <img className="w-17 h-17" src={`/${cell.color}${cell.type}.png`} alt={cell.type} />}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Chessboard;
