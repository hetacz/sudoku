/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class Game {
    #board;
    constructor(board) {
        this.#board = board.map(arr => arr.slice());
    }
    get board() {
        return this.#board;
    }
    set board(board) {
        this.#board = board.map(arr => arr.slice());
    }
}

const initial = [
    [0, 0, 0, 7, 9, 0, 0, 5, 0],
    [3, 5, 2, 0, 0, 8, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 8, 0],
    [0, 1, 0, 0, 7, 0, 0, 0, 4],
    [6, 0, 0, 3, 0, 1, 0, 0, 8],
    [9, 0, 0, 0, 8, 0, 0, 1, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 0, 5, 0, 0, 8, 9, 1],
    [0, 8, 0, 0, 3, 7, 0, 0, 0]
];

export default game = new Game(initial);