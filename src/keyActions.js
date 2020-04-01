import { editCell } from './templates';

export const setupKeyActions = (generator) => {
  ((d, w) => {
    let editMode = false;

    const failure = d.querySelector('[data-el="failure"]');
    const success = d.querySelector('[data-el="success"]');
    const choices = d.querySelectorAll('[data-el="choice"]');
    const clear = d.querySelector('[data-el="clearBtn"]');
    const edit = d.querySelector('[data-el="editBtn"]');
    const restart = d.querySelectorAll('[data-el="restart"]');
    const mobileChoices = document.querySelector('.mobile-choices');
    const gameBoard = document.querySelector('[data-el="game-board"]');

    const restartListener = () => {
      restart.forEach((btn) => {
        btn.addEventListener('click', () => {
          w.location.reload();
        });
      });
    };

    edit.addEventListener('click', () => {
      editMode = !editMode;

      const touched = d.querySelector('.touched');

      const sames = document.querySelectorAll('.yellow');
      sames.forEach(s => s.classList.remove('yellow'));

      if (touched &&
          touched.dataset.val !== "" &&
          touched.dataset.editable === "true") {

        touched.dataset.val = "";
        touched.innerText = "";
      }

      choices.forEach((choice) => {
        choice.classList.toggle('hint');
      });

      if (touched &&
          touched.dataset.editable === "true" &&
          touched.classList.contains('.hints')) {

        touched.classList.remove('edited');
        touched.classList.remove('blank');
        touched.classList.add('hints');

        setTimeout(() => {
          touched.innerHTML = editCell;
        }, 0);
      }
    });

    clear.addEventListener('click', () => {
      const touched = d.querySelector('.touched');

      if (touched.dataset.editable === "true") {
        touched.innerText = '';
        touched.dataset.val = '';
      }
    });

    choices.forEach((choice) => {
      choice.addEventListener('click', (e) => {
        const touched = d.querySelector('.touched');
        const editable = touched.dataset.editable === "true";
        const existingSames = d.querySelectorAll('.yellow');

        existingSames.forEach((cell) => {
          cell.classList.remove('yellow');
        });

        if (editMode && editable) {
          if (touched.childElementCount === 0) {
            touched.classList.add('hints');
            touched.classList.remove('edited');
            touched.innerHTML = editCell;
          }

          const hintCells = touched.querySelectorAll('.col');

          for (let cell of hintCells) {
            if (cell.innerText === "") {
              cell.innerText = e.target.value;
              return;
            }
          }
          return;
        }

        if (touched.classList.contains('hints')) {
          touched.classList.remove('hints');
        }

        if (touched.dataset.editable === "true") {
          touched.dataset.val = e.target.value;
          touched.innerText = e.target.value;

          const sames = d.querySelectorAll(
            '[data-val="' + e.target.value + '"]');

          sames.forEach(s => s.classList.add('yellow'));

          touched.classList.add('edited');
        }

        const answers = generator.nums.map((num) => {
          const row = d.querySelectorAll("[data-row='" + num + "']");
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
          restartListener();

        }

        if (complete && invalid) {
          mobileChoices.classList.add('hide');
          gameBoard.classList.add('hide');
          failure.classList.remove('hide');

          const fixIt = d.querySelector('[data-el="fix-it"]');
          fixIt.addEventListener('click', () => {
            failure.classList.add('hide');
            gameBoard.classList.remove('hide');
            mobileChoices.classList.remove('hide');
          });

          restartListener();
        }
      });
    });
  })(document, window);
};

