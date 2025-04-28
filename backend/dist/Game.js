"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.startTime = new Date();
        this.board = new chess_js_1.Chess();
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white",
            },
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black",
            },
        }));
    }
    makeMove(socket, move) {
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
        }
        catch (e) {
            console.error("Invalid move");
            socket.send(JSON.stringify({ type: messages_1.ERROR, message: "Invalid move" }));
            return;
        }
        // Check if the game is over
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white",
                },
            }));
            this.player2.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white",
                },
            }));
            return;
        }
        // Update board for both players
        // if (this.moveCount % 2 === 0) {
        //   this.player1.send(
        //     JSON.stringify({
        //       type: MOVE,
        //       payload: move,
        //     })
        //   );
        // } else {
        //   this.player2.send(
        //     JSON.stringify({
        //       type: MOVE,
        //       payload: move,
        //     })
        //   );
        // }
        this.player1.send(JSON.stringify({
            type: messages_1.MOVE,
            payload: move,
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.MOVE,
            payload: move,
        }));
    }
}
exports.Game = Game;
