var board;
var score = 0;
var rows = 4;
var cols = 4;

window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  // board = [
  //   [2, 2, 2, 2],
  //   [2, 2, 2, 2],
  //   [4, 4, 8, 8],
  //   [4, 4, 8, 8],
  // ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }

  setTwo();
  setTwo();
}

function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
  return false;
}

function setTwo() {
  if (!hasEmptyTile()) {
    return;
  }

  let found = false;
  while (!found) {
    //random r,c value
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * cols);

    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
      found = true;
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num.toString();
    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

document.addEventListener("keyup", (e) => {
  if (document.getElementById("game-over").classList.contains("hidden")) {
    if (e.code == "ArrowLeft") {
      slideLeft();
      setTwo();
    } else if (e.code == "ArrowRight") {
      slideRight();
      setTwo();
    } else if (e.code == "ArrowUp") {
      slideUp();
      setTwo();
    } else if (e.code == "ArrowDown") {
      slideDown();
      setTwo();
    }

    document.getElementById("score").innerText = score;

    if (isGameOver()) {
      showGameOver();
    }
  }
});

function filterZero(row) {
  return row.filter((num) => num != 0); //create a new array without zeroes
}

function slide(row) {
  row = filterZero(row); //get rid of zeros

  for (let i = 0; i < row.length - 1; i++) {
    //check every 2
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    }
  }

  row = filterZero(row);

  //add zero
  while (row.length < cols) {
    row.push(0);
  }
  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    for (let c = 0; c < cols; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    for (let c = 0; c < cols; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < cols; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    // board[0][c] = row[0];
    // board[1][c] = row[1];
    // board[2][c] = row[2];
    // board[3][c] = row[3];

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < cols; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    // board[0][c] = row[0];
    // board[1][c] = row[1];
    // board[2][c] = row[2];
    // board[3][c] = row[3];

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function isGameOver() {
  // if empty tile exists → not over
  if (hasEmptyTile()) return false;

  // check horizontal
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 1; c++) {
      if (board[r][c] == board[r][c + 1]) {
        return false;
      }
    }
  }

  // check vertical
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows - 1; r++) {
      if (board[r][c] == board[r + 1][c]) {
        return false;
      }
    }
  }

  return true;
}

function showGameOver() {
  document.getElementById("game-over").classList.remove("hidden");
}

function restartGame() {
  document.getElementById("board").innerHTML = "";
  document.getElementById("game-over").classList.add("hidden");
  score = 0;
  document.getElementById("score").innerText = score;
  setGame();
}
