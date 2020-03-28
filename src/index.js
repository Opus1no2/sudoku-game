import './styles/index.scss';
import Generator from './Generator';

//window.onbeforeunload = () => true;

const loading = document.querySelector('.loading');
const gameBoard = document.querySelector('[data-el="game-board"]');
const mobileChoices = document.querySelector('.mobile-choices');
const success = document.querySelector('[data-el="success"]');
const failure = document.querySelector('[data-el="failure"]');

const initBoard = () => {
  const generator = new Generator();
  generator.generate();

  gameBoard.classList.remove('hide');
  mobileChoices.classList.remove('hide');
  loading.classList.add('hide');
  return generator;
};

const restartListener = () => {
  const restart = document.querySelectorAll('[data-el="restart"]');

  restart.forEach((btn) => {
    btn.addEventListener('click', () => {
      window.location.reload();
    });
  });
};

window.addEventListener('load', () => {
  const generator = initBoard();

  const cells = document.querySelectorAll('.cell');
  const choices = document.querySelectorAll('.choice');
  const clear = document.querySelector('[data-el="clearBtn"]');

  clear.addEventListener('click', () => {
    const touched = document.querySelector('.touched');

    if (touched.dataset.editable === "true") {
      touched.innerText = '';
      touched.dataset.val = '';
    }
  });

  choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
      const touched = document.querySelector('.touched');

      if (touched.dataset.editable === "true") {
        touched.classList.add('edited');
        touched.dataset.val = e.target.value;
        touched.innerText = e.target.value;
      }

      const answers = generator.nums.map((num) => {
        const row = document.querySelectorAll("[data-row='" + num + "']");
        return [...row].map((cell) => {
          return Number(cell.innerText);
        });
      });

      const complete = answers.flat().every(n => n !== 0);
      const invalid = answers.flat().some((answer, i) => {
        const solution = generator.solution.flat();
        return solution[i] !== answer;
      });

      if (complete && !invalid) {
        mobileChoices.classList.add('hide');
        gameBoard.classList.add('hide');
        success.classList.remove('hide');
        document.body.classList.add('success-background');
        restartListener();

      }
      if (complete && invalid) {
        mobileChoices.classList.add('hide');
        gameBoard.classList.add('hide');
        failure.classList.remove('hide');

        const fixIt = document.querySelector('[data-el="fix-it"]');
        fixIt.addEventListener('click', () => {
          failure.classList.add('hide');
          gameBoard.classList.remove('hide');
          mobileChoices.classList.remove('hide');
        });

        restartListener();
      }
    });
  });

  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      cells.forEach((cell) => {
        cell.classList.remove('light-touch');
        cell.classList.remove('touched');
      });

      const col = e.target.dataset.col;
      const collCells = document.querySelectorAll("[data-col='" + col + "']");
      collCells.forEach((r) => r.classList.add('light-touch'));

      const row = e.target.dataset.row;
      const rowCells = document.querySelectorAll("[data-row='" + row + "']")
      rowCells.forEach((r) => r.classList.add('light-touch'));

      const section = e.target.dataset.sec;
      const secCells = document.querySelectorAll("[data-sec='" + section + "']");
      secCells.forEach((r) => r.classList.add('light-touch'));

      cell.classList.remove('light-touch');
      cell.classList.add('touched');
    });
  });
});
