'use strict';

import * as el from './selectors.js';

class Renderer {

    constructor() {
        this.#renderInitialView();
    }

    addInitialHandlers(getSudokus) {
        el.loadBtn.addEventListener('click', getSudokus);
        return this;
    }

    #renderInitialView() {
        let html = `<div class="sudoku">`;
        html += `<div class="big-grid">`;
        for (let r = 0; r < 9; r++) {
            html += `<div class="small-grid">`;
            for (let c = 0; c < 9; c++) {
                html += `<div class="empty"></div>`;
            }
            html += `</div>`;
        }
        html += `</div>`;
        html += `</div>`;

        el.main.innerHTML = '';
        el.main.insertAdjacentHTML('afterbegin', html);
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
        this.clearElement(el.main);
        this.renderInElement(el.main, html);
        this.setStatusText('Sudoku loaded successfully :)');
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