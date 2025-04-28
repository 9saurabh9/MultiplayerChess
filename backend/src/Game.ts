import WebSocket from "ws";
import { Chess, Square } from "chess.js";
import { ERROR, GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private startTime: Date;
  private moveCount: number = 0;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.startTime = new Date();
    this.board = new Chess();
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
        },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );
  }

  makeMove(socket: WebSocket, move: { from: Square; to: Square }) {
    // Validate if the player's move
    if (this.moveCount % 2 === 0 && socket !== this.player1) {
      return;
    }
    if (this.moveCount % 2 === 1 && socket !== this.player2) {
      return;
    }

    // Validate the move
    // Push the move
    try {
      this.board.move(move);
      this.moveCount++;
    } catch (e) {
      console.error("Invalid move");
      socket.send(JSON.stringify({ type: ERROR, message: "Invalid move" }));
      return;
    }

    // Check if the game is over
    if (this.board.isGameOver()) {
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
      this.player2.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
      return;
    }

    // Update board for both players
    this.player1.send(
      JSON.stringify({
        type: MOVE,
        payload: move,
      })
    );
    this.player2.send(
      JSON.stringify({
        type: MOVE,
        payload: move,
      })
    );
  }
}
