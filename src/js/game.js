class Game {

    #numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    #indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    #squareIndex = [
        [0, 0, 0, 1, 1, 1, 2, 2, 2],
        [0, 0, 0, 1, 1, 1, 2, 2, 2],
        [0, 0, 0, 1, 1, 1, 2, 2, 2],
        [3, 3, 3, 4, 4, 4, 5, 5, 5],
        [3, 3, 3, 4, 4, 4, 5, 5, 5],
        [3, 3, 3, 4, 4, 4, 5, 5, 5],
        [6, 6, 6, 7, 7, 7, 8, 8, 8],
        [6, 6, 6, 7, 7, 7, 8, 8, 8],
        [6, 6, 6, 7, 7, 7, 8, 8, 8],
    ];

    #copyBoard(board) {
        return JSON.parse(JSON.stringify(board));
    }

    #getRow(board, row) {
        return board[row];
    }

    #getColumn(board, col) {
        const column = [];
        for (const r of board) {
            column.push(r[col]);
        }
        return column;
    }

    #getSquare(board, sq) {
        const square = [];
        for (const r of this.#indexes)
            for (const c of this.#indexes) {
                if (sq === this.#squareIndex[r][c]) {
                    square.push(board[r][c]);
                }
            }
        return square;
    }

    #findSquare(row, col) {
        return this.#squareIndex[row][col];
    }

    checkForWin(board) {
        for (const i of this.#indexes) {
            for (const number of this.#numbers) {
                if (!this.#getRow(board, i).includes(number)) { return false; }
                if (!this.#getColumn(board, i).includes(number)) { return false; }
                if (!this.#getSquare(board, i).includes(number)) { return false; }
            }
        }
        return true;
    }

    _print(board, withCandidates = false) {
        if (withCandidates) {
            for (const r of this.#indexes) {
                let row = '';
                for (const c of this.#indexes) {
                    if (c % 3 === 0) { row += '||'; }
                    if (Array.isArray(board[r][c])) {
                        for (let i = 0; i < 9; i++) {
                            row += board[r][c][i] ? board[r][c][i] : '.';
                        }
                    } else {
                        row += '    ' + board[r][c] + '    ';
                    }
                    row += '|';
                    if (c === 8) { row += '||'; }
                }
                if (r % 3 === 0) { console.log('=================================================================='); }
                console.log(row);
            }
            console.log('==================================================================');
        } else {
            for (const r of this.#indexes) {
                let row = '';
                for (const c of this.#indexes) {
                    if (c % 3 === 0) { row += '| '; }
                    board[r][c] === 0 ? row += '. ' : row += board[r][c] + ' ';
                    if (c === 8) { row += '|'; }
                }
                if (r % 3 === 0) { console.log('|-------|-------|-------|'); }
                console.log(row);
            }
            console.log('|-------|-------|-------|');
        }
    }

    solve(board) {
        let solved = false;
        let modified = true;
        if (this.checkForWin(board)) { return; }
        while (modified && !solved) {
            const result = this.#constrain(board);
            modified = result.modified;
            board = this.#copyBoard(result.board);
            solved = this.checkForWin(board);
        }
        // TODO other algorithms could fit in here before backtracking
        if (!solved) {
            board = this.#copyBoard(this.#backtrack(board));
            solved = this.checkForWin(board);
        }
        return board;
    }

    #constrain(board) {
        let modified = false;
        // fill cell with candidates
        for (const r of this.#indexes) {
            for (const c of this.#indexes) {
                if (board[r][c] === 0) {
                    const result = this.#fillWithCandidates(board, r, c);
                    modified = result.modified || modified;
                    board[r][c] = result.candidates;
                }
            }
        }
        // find cells with a single candidate in a unit
        for (const r of this.#indexes) {
            for (const c of this.#indexes) {
                if (Array.isArray(board[r][c])) {
                    const result = this.#fillRightNumbers(board, r, c);
                    modified = result.modified || modified;
                    // if not possible to find candidate, write 0 again in empty cell
                    board[r][c] = result?.candidate ? result?.candidate : 0;
                }
            }
        }
        return {
            modified: modified,
            board: this.#copyBoard(board),
        };
    }

    #backtrack(board) {
        let backupBoard = this.#copyBoard(board);
        for (const r of this.#indexes) {
            for (const c of this.#indexes) {
                if (backupBoard[r][c] === 0) {
                    backupBoard[r][c] = this.#fillWithCandidates(backupBoard, r, c).candidates;
                    if (this.checkForWin(backupBoard)) { return backupBoard; }
                    const candidates = backupBoard[r][c];
                    if (Array.isArray(candidates)) {
                        for (const candidate of candidates) {
                            const backupBoard2 = this.#copyBoard(backupBoard);
                            backupBoard2[r][c] = candidate;
                            const filledBoard = this.#copyBoard(this.#backtrack(backupBoard2));
                            if (filledBoard) { return filledBoard; }
                        }
                        return false; // we shouldn't be here...
                    }
                }
            }
        }
        return false;
    }

    #fillWithCandidates(board, row, col) {
        const candidates = [];
        const friends = [
            ...this.#getRow(board, row),
            ...this.#getColumn(board, col),
            ...this.#getSquare(board, this.#findSquare(row, col))
        ];
        for (const n of this.#numbers) {
            if (!friends.includes(n)) {
                candidates.push(n);
            }
        }
        return candidates.length === 1 ? {
            candidates: candidates[0],
            modified: true
        } : {
            candidates: candidates,
            modified: false
        };
    }

    #fillRightNumbers(board, row, col) {
        const candidates = board[row][col];
        for (const candidate of candidates) {
            let competition = 0;
            [
                this.#getRow(board, row),
                this.#getColumn(board, col),
                this.#getSquare(board, this.#findSquare(row, col))
            ].forEach((fn) => fn.forEach((cell) => {
                if (Array.isArray(cell)) {
                    if (cell.includes(candidate)) {
                        competition++;
                    }
                } else {
                    if (cell === candidate) {
                        competition++; // when another cell in row simply has candidate as a value;
                    }
                }
                if (competition === 1) {
                    return {
                        candidate: candidate,
                        modified: true,
                    };
                }
            }));
        }
        return {
            modified: false,
        };
    }
}

export default new Game();