class Generator {
  constructor() {
    this.num = 9;
    this.sqrtNum = 3;
    this.solution = [];
    this.nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    this.generateSolution();
    this.fillDiagonals();
    this.fillRemaining();
    this.createBlanks();
  }
  inRow(row, num) {
    let inRow = false;

    row.forEach((cell) => {
      if (Number(cell.dataset.val) === num) {
        inRow = true;
      }
    });

    return inRow;
  }
  notInUse(cell, num) {
    const row = document.querySelectorAll(
      '[data-row="' + cell.dataset.row + '"]');

    const col = document.querySelectorAll(
      '[data-col="' + cell.dataset.col + '"]');

    const box = document.querySelectorAll(
      '[data-sec="' + cell.dataset.sec + '"]');

    const inRow = this.inRow(row, num);
    const inCol = this.inRow(col, num);
    const inBox = this.inRow(box, num);

    return (!inRow && !inCol && !inBox);
  }
  generateSolution() {
    const ray = Array(this.num).fill(0);
    ray.forEach(_ => this.solution.push([...ray]));
  }
  fillDiagonals() {
    const boxes = document.querySelectorAll('.section');

    [0, 4, 8].forEach((idx) => {
      this.fillBox(boxes[idx]);
    });
  }
  fillBox(box) {
    const nums = [...this.nums];
    const cells = box.querySelectorAll('.cell');

    cells.forEach((cell) => {
      const randomIdx = Math.floor(Math.random() * nums.length);
      const randomValue = nums.splice(randomIdx, 1).pop();
      const row = Number(cell.dataset.row - 1);
      const col = Number(cell.dataset.col - 1);

      this.solution[row][col] = randomValue;
      cell.dataset.val = randomValue;
      cell.innerText = randomValue;
    });
  }
  createBlanks() {
    document.querySelectorAll('[data-el="section"]').forEach((section) => {
      const cells = section.querySelectorAll('.row .cell');
      const clone = [...cells];

      // so naive
      Array(5).fill(null).forEach((cell) => {
        const randomIdx = Math.floor(Math.random() * clone.length);
        const cloneCell = clone.splice(randomIdx, 1).pop();

        cloneCell.classList.add('blank');
        cloneCell.dataset.editable = true;
        cloneCell.innerText = "";
        cloneCell.dataset.val = "";
      });
    });
  }
  fillRemaining() {
    const rowEmpties = this.nums.map((n) => {
      return document.querySelectorAll('[data-val=""][data-row="' + n + '"]');
    }).filter(r => r.length > 0);

    if (rowEmpties.length === 0) {
      return true;
    }

    const nextEmpty = rowEmpties[0][0];

    for(let num of this.nums) {
      if (this.notInUse(nextEmpty, num)) {
        nextEmpty.dataset.editable = false;
        nextEmpty.dataset.val = num;
        nextEmpty.innerText = num;
        const row = Number(nextEmpty.dataset.row) - 1;
        const col = Number(nextEmpty.dataset.col) - 1;
        this.solution[row][col] = num;

        if (this.fillRemaining()) {
          return true;
        }

        this.solution[row][col] = ""
        nextEmpty.dataset.val = "";
        nextEmpty.innerText = "";
      }
    }
    return false;
  }
  generate() {
    this.fillRemaining();
    this.createBlanks();
  }
}

export default Generator;
