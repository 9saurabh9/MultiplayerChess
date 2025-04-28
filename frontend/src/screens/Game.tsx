import { useEffect, useState } from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import Chessboard from "../components/Chessboard";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
export const ERROR = "error";

const Game = () => {
  const socket = useSocket();
  const chess: Chess = new Chess();
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = function (event) {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          console.log("Game initialized");
          setStarted(true);
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move made:", message.payload);
          break;
        case GAME_OVER:
          console.log("Game over:", message.payload);
          break;
        case ERROR:
          console.error("Error:", message.message);
          break;
        default:
          console.warn("Unknown message type:", message.type);
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <MaxWidthWrapper className="h-screen max-w-screen-2xl">
      <div className="grid md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-2 h-screen flex items-center justify-center py-20">
          <Chessboard socket={socket} board={board} />
        </div>

        <div className="h-screen flex flex-col items-center py-30">
          {!started && (
            <button
              onClick={() => {
                socket.send(
                  JSON.stringify({
                    type: INIT_GAME,
                  })
                );
              }}
              className="bg-lime-500 text-white w-full h-16 font-bold py-2 px-4 rounded-2xl text-xl tracking-wide hover:bg-lime-400 transition"
            >
              Start Game
            </button>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Game;
