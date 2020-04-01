export default ((d) => {
  const cells = document.querySelectorAll('.cell');

  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      let target = e.target;

      cells.forEach((cell) => {
        cell.classList.remove('light-touch');
        cell.classList.remove('touched');
      });

      const existingSames = d.querySelectorAll('.yellow');
      existingSames.forEach((cell) => {
        cell.classList.remove('yellow');
      });

      // Don't highlight empty cells
      if (Number(cell.dataset.val) > 0) {
        const sames = d.querySelectorAll('[data-val="' + cell.dataset.val + '"]');
        sames.forEach((s) => {
          s.classList.add('yellow');
        });
      }

      // Clicked on an edit cell
      if (target.dataset.el === "editCell") {
        target = target.parentNode.parentNode;
      }

      const col = target.dataset.col;
      const row = target.dataset.row;
      const section = target.dataset.sec;

      const collCells = d.querySelectorAll("[data-col='" + col + "']");
      const rowCells = d.querySelectorAll("[data-row='" + row + "']")
      const secCells = d.querySelectorAll("[data-sec='" + section + "']");

      collCells.forEach(r => r.classList.add('light-touch'));
      rowCells.forEach(r => r.classList.add('light-touch'));
      secCells.forEach(r => r.classList.add('light-touch'));

      cell.classList.remove('light-touch');
      cell.classList.add('touched');
    });
  });
})(document);
