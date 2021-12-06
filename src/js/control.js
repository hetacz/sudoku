'use strict';

import game from './game.js';
import load from './load.js';
import render from './render.js';

class Controler {
    constructor() {
        render.addInitialHandlers(this.#loadSmallSudoku.bind(this));
    }

    async #loadSmallSudoku() {
        try {
            const json = await load.getSudokus('raw');
            json.raw[0];
            console.log(json.raw[0]);
            render.renderSudoku(json.raw[0]);
            game.board = json.raw[0];
        } catch (error) {
            console.error(error);
        }
        return this;
    }
}

new Controler();