import './styles/index.scss';
import './gameTime';
import './cellActions';
import Generator from './Generator';
import { setupKeyActions } from './keyActions';

//window.onbeforeunload = () => true;

const loading = document.querySelector('.loading');
const gameBoard = document.querySelector('[data-el="game-board"]');
const mobileChoices = document.querySelector('.mobile-choices');

const initBoard = () => {
  const generator = new Generator();
  generator.generate();

  gameBoard.classList.remove('hide');
  mobileChoices.classList.remove('hide');
  loading.classList.add('hide');
  return generator;
};

window.addEventListener('load', () => {
  const generator = initBoard();
  setupKeyActions(generator);
});
