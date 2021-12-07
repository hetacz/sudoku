/* eslint-disable no-unused-vars */
class Loader {

    async #loadSudokuDatabase(filename) {
        try {
            const response = await fetch(`/data/${filename}.json`);
            if (!response.ok) { throw new Error(`Error loading data, ${response.status}`); }
            return await response.json();
        } catch (err) {
            console.error('err :>> ', err.message);
            throw err;
        }
    }

    #timeout(sec) {
        return new Promise(function (_, reject) {
            setTimeout(function () {
                reject(new Error('Request took too long 💣💣💣'));
            }, sec * 1000);
        });
    }

    async getSudokus(filename) {
        try {
            return await Promise.race([
                this.#loadSudokuDatabase(filename),
                this.#timeout(5)
            ]);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default new Loader();
// const sudokus = await loader.getSudokus('raw');
// console.log(sudokus);
// console.log(sudokus.raw[0]);

// console.log(sudokus.then((sudo) => console.log(sudo.raw[0])));
