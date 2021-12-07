'use strict';

import game from './game.js';
import load from './load.js';
import render from './render.js';

class Controler {

    #currentSudoku = Array.from({ length: 9 }, () => {
        return Array.from({ length: 9 }, () => 0);
    });

    constructor() {
        render
            .addInitialHandlers(this.#loadSmallSudoku.bind(this))
            .renderSudoku(this.#currentSudoku);
    }

    async #loadSmallSudoku() {
        try {
            const json = await load.getSudokus('raw');
            const sudoku = json.raw[Math.floor(Math.random() * json.raw.length)];
            this.#currentSudoku = game.copyBoard(sudoku);
            game.board = game.copyBoard(sudoku);
            render
                .renderSudoku(sudoku)
                .addSolveHandler(this.#solveSudoku.bind(this))
                .setStatusText(render.onLoad);
        } catch (error) {
            console.error(error);
        }
        return this;
    }

    #solveSudoku() {
        render
            .solveSudoku(game.solve(game.board))
            .addResetHandler(this.#resetSudoku.bind(this))
            .removeSolveHandler(this.#solveSudoku)
            .setStatusText(render.onSolve);
        return this;
    }

    #resetSudoku() {
        game.board = game.copyBoard(this.#currentSudoku);
        render
            .renderSudoku(this.#currentSudoku)
            .removeResetHandler(this.#resetSudoku)
            .addSolveHandler(this.#solveSudoku.bind(this))
            .setStatusText(render.onReset);
        return this;
    }
}

new Controler();