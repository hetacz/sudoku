'use strict';

import game from './game.js';
import load from './load.js';
import render from './render.js';

class Controler {

    #currentSudoku = Array.from({ length: 9 }, () => {
        return Array.from({ length: 9 }, () => 0);
    });
    #solved = false;

    constructor() {
        render
            .addInitialHandlers(
                this.#loadSmallSudoku.bind(this),
                this.#solveSudoku.bind(this),
            )
            .renderSudoku(this.#currentSudoku);
    }

    async #loadSmallSudoku() {
        try {
            const json = await load.getSudokus('raw.json');
            const sudoku = game.copyBoard(json.raw[Math.floor(Math.random() * json.raw.length)]);
            this.#currentSudoku = game.copyBoard(sudoku);
            game.board = game.copyBoard(sudoku);
            render
                .renderSudoku(sudoku)
                .setStatusText(render.onLoad)
                .addSolveHandler(this.#solveSudoku.bind(this));
            this.#solved = false;
        } catch (error) {
            console.error(error);
        }
        return this;
    }

    #solveSudoku() {
        if (this.#solved) { return; }
        render
            .solveSudoku(game.solve(game.board))
            .setStatusText(render.onSolve);
        this.#solved = true;
        return this;
    }
}

new Controler();