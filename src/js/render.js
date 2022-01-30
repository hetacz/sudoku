import * as el from './selectors.js';

class Renderer {

    onLoad = 'Sudoku loaded.';
    onSolve = 'Sudoku solved.';

    addInitialHandlers(load) {
        el.loadBtn.addEventListener('click', load);
        el.loadBtn.classList.add('action');
        return this;
    }

    renderSudoku(sudoku) {
        // XXX this code write SQUARE by SQUARE (3x3 row by row) not 9x9 row by row
        let html = `<div class="sudoku">`;
        html += `<div class="big-grid">`;
        for (let sq = 0; sq < 9; sq++) {
            html += `<div class="small-grid">`;
            for (let i = 0; i < 9; i++) {
                const row = Math.floor(i / 3) + 3 * Math.floor(sq / 3);
                const col = (i % 3) + 3 * (sq % 3);
                html += sudoku[row][col] === 0
                    ? `<div class="empty"></div>`
                    : `<div class="cell">${sudoku[row][col]}</div>`;
            }
            html += `</div>`;
        }
        html += `</div>`;
        html += `</div>`;
        this
            .clearElement(el.main)
            .renderInElement(el.main, html);
        el.solveBtn.classList.add('action');
        return this;
    }

    solveSudoku(sudoku) { // unique method to save different formatting
        const bigGrid = document.querySelector('.big-grid');
        for (let sq = 0; sq < 9; sq++) {
            for (let i = 0; i < 9; i++) {
                const row = Math.floor(i / 3) + 3 * Math.floor(sq / 3);
                const col = (i % 3) + 3 * (sq % 3);
                bigGrid.children.item(sq).children.item(i).textContent = sudoku[row][col];
            }
        }
        el.solveBtn.classList.remove('action');
        return this;
    }

    addSolveHandler(handler) {
        el.solveBtn.addEventListener('click', handler);
        el.solveBtn.classList.add('action');
    }

    setStatusText(text) {
        el.status.textContent = text;
        return this;
    }

    clearElement(element) {
        element.innerHTML = '';
        return this;
    }

    renderInElement(element, html) {
        element.insertAdjacentHTML('afterbegin', html);
        return this;
    }
}

export default new Renderer();
