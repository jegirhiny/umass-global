/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Player {
  constructor(color) {
    this.color = color;
  }
}

class Game {
  constructor(HEIGHT, WIDTH) {
    this.HEIGHT = HEIGHT;
    this.WIDTH = WIDTH;
    this.currPlayer = null;
    this.gameOver = false;
    this.players = [];
    this.board = [];

    const startBut = document.getElementById('start-button');
    const playerForm = document.getElementById('player-form');

    startBut.addEventListener('click', () => {
      const board = document.getElementById('board');

      for(let child of playerForm.children) {
        this.players.push(new Player(child.value));
      }

      if(board.children.length > 0) {
        board.innerHTML = '';
      }

      this.board = [];
      this.gameOver = false;
      this.currPlayer = this.players[0];
      this.makeBoard();
      this.makeHtmlBoard();
      playerForm.reset();
    })

    this.handleClick = this.handleClick.bind(this);
  }

  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
        this.board.push(Array.from({length: this.WIDTH}));
    }
  }

  makeHtmlBoard() {
    const board = document.getElementById('board');
    const top = document.createElement('tr');
    
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', (evt) => {
      if(!this.gameOver) {
        this.handleClick(evt)
      }
    });

    for (let x = 0; x < this.WIDTH; x++) {
        const headCell = document.createElement('td');
        headCell.setAttribute('id', x);
        top.append(headCell);
    }

    board.append(top);

    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.WIDTH; x++) {
          const cell = document.createElement('td');
          cell.setAttribute('id', `${y}-${x}`);
          row.append(cell);
      }

      board.append(row);
    }
  }

  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
          return y;
      }
    }

    return null;
  }

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = -50 * (y + 2);
  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    this.gameOver = true;
    alert(msg);
  }

  handleClick(evt) {
    const x = + evt.target.id;
    const y = this.findSpotForCol(x);

    if (y === null) {
      return;
    }

    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer.color} won!`);
    }

    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }

    this.currPlayer = this.currPlayer === this.players[1] ? this.players[0] : this.players[1];
  }

  checkForWin() {
    const _win = (cells) => {
      return cells.every(
        ([y, x]) =>
        y >= 0 &&
        y < this.HEIGHT &&
        x >= 0 &&
        x < this.WIDTH &&
        this.board[y][x] === this.currPlayer
      );
    }
  
    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }

    return false;
  }
}

new Game(6, 7); 