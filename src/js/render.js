'use strict';

import * as el from './selectors.js';

class Renderer {

    onLoad = 'Sudoku loaded.';
    onSolve = 'Sudoku solved.';
    onReset = 'Sudoku resetted';

    addInitialHandlers(getSudokus) {
        el.loadBtn.addEventListener('click', getSudokus);
        el.loadBtn.classList.add('action');
        return this;
    }

    renderSudoku(sudoku) {
        let html = `<div class="sudoku">`;
        html += `<div class="big-grid">`;
        for (let r = 0; r < 9; r++) {
            html += `<div class="small-grid">`;
            for (let c = 0; c < 9; c++) {
                html += sudoku[r][c] === 0 ? `<div class="empty"></div>` : `<div class="cell">${sudoku[r][c]}</div>`;
            }
            html += `</div>`;
        }
        html += `</div>`;
        html += `</div>`;
        this
            .clearElement(el.main)
            .renderInElement(el.main, html);
        return this;
    }

    solveSudoku(sudoku) { // unique method to save different formatting
        const bigGrid = document.querySelector('.big-grid');
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                bigGrid.children.item(r).children.item(c).textContent = sudoku[r][c];
            }
        }
        return this;
    }
    addResetHandler(listener) {
        el.resetBtn.addEventListener('click', listener);
        el.resetBtn.classList.add('action');
        return this;
    }

    addSolveHandler(listener) {
        el.solveBtn.addEventListener('click', listener);
        el.solveBtn.classList.add('action');
        return this;
    }

    removeResetHandler(listener) {
        el.resetBtn.removeEventListener('click', listener);
        el.resetBtn.classList.remove('action');
        return this;
    }

    removeSolveHandler(listener) {
        el.solveBtn.removeEventListener('click', listener);
        el.solveBtn.classList.remove('action');
        return this;
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

    /*renderSpinner() {
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="src/img/icons.svg#icon-loader"></use>
                </svg>
            </div>`;
        //$el.innerHTML = '';
        //$el.insertAdjacentHTML('afterbegin', markup);
    }*/
}

export default new Renderer();