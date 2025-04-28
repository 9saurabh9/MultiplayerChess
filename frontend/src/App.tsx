import { useNavigate } from "react-router-dom";
import "./App.css";
import MaxWidthWrapper from "./components/MaxWidthWrapper";

function App() {
  const navigate = useNavigate();

  return (
    <MaxWidthWrapper className="grid md:grid-cols-2 h-screen pt-20">
      <div className="aspect-3/2 order-2 md:order-1">
        <img src="/src/assets/chess_board.png" alt="Chessboard" />
      </div>

      <div className="px-15 pt-2 flex flex-col items-center order-1 md:order-2">
        <h1 className="text-4xl/12 tracking-wide text-center font-bold mb-4 text-white">
          Play chess online on the #2 Site!
        </h1>
        <div className="mt-4 w-full h-20">
          <button
            onClick={() => navigate("/game")}
            className="bg-lime-500 h-full w-full text-white font-bold py-2 px-4 rounded-2xl text-xl tracking-wide hover:bg-lime-400 transition"
          >
            Play Online
          </button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default App;
