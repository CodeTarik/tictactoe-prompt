let fields = [
  null, null, null,
  null, null, null,
  null, null, null
];

let currentPlayer = 'circle';

function init() {
  render();
  updateStatus();
}

function render() {
  let tableHtml = `<table>`;
  for (let i = 0; i < 3; i++) {
      tableHtml += `<tr>`;
      for (let j = 0; j < 3; j++) {
          let cellContent = fields[i * 3 + j];
          if (cellContent === "circle") {
              cellContent = generateAnimatedCircleSVG();
          } else if (cellContent === "cross") {
              cellContent = generateAnimatedCrossSVG();
          } else {
              cellContent = "";
          }
          tableHtml += `<td onclick="handleCellClick(${i * 3 + j}, this)">${cellContent}</td>`;
      }
      tableHtml += `</tr>`;
  }
  tableHtml += `</table>`;
  document.getElementById("content").innerHTML = tableHtml;
}

function handleCellClick(index, cell) {
  if (fields[index] === null) {
      fields[index] = currentPlayer;

      if (currentPlayer === 'circle') {
          cell.innerHTML = generateAnimatedCircleSVG();
      } else {
          cell.innerHTML = generateAnimatedCrossSVG();
      }

      cell.onclick = null;

      const winPattern = checkWin();
      if (winPattern) {
          drawWinLine(winPattern);
          setTimeout(() => alert(`${currentPlayer} hat gewonnen!`), 100);
          disableAllClicks();
      } else {
          currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
          updateStatus();
      }
  }
}

function checkWin() {
  const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
          return pattern; // Rückgabe des Gewinnmusters
      }
  }
  return null;
}

function drawWinLine(winPattern) {
  const [a, b, c] = winPattern;
  const table = document.querySelector("table");
  const cells = table.querySelectorAll("td");

  cells[a].classList.add("win");
  cells[b].classList.add("win");
  cells[c].classList.add("win");
}

function disableAllClicks() {
  const cells = document.querySelectorAll("td");
  cells.forEach(cell => cell.onclick = null);
}

function updateStatus() {
  const playerCross = document.getElementById('player-cross');
  const playerCircle = document.getElementById('player-circle');
  
  if (currentPlayer === 'cross') {
      playerCross.classList.add('active-cross');
      playerCircle.classList.remove('active-circle');
  } else {
      playerCircle.classList.add('active-circle');
      playerCross.classList.remove('active-cross');
  }
}

function generateAnimatedCircleSVG() {
  const svgCode = `
      <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="35" r="25" fill="none" stroke="#00B0EF" stroke-width="4" stroke-dasharray="157" stroke-dashoffset="157">
              <animate attributeName="stroke-dashoffset" from="157" to="0" dur="0.500s" fill="freeze" />
          </circle>
      </svg>
  `;
  return svgCode;
}

function generateAnimatedCrossSVG() {
  const width = 70;
  const height = 70;

  const svgCode = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="#fac61b" stroke-width="4" stroke-dasharray="157" stroke-dashoffset="157">
              <animate attributeName="stroke-dashoffset" from="157" to="0" dur="500ms" fill="freeze" />
          </line>
          <line x1="${width}" y1="0" x2="0" y2="${height}" stroke="#fac61b" stroke-width="4" stroke-dasharray="157" stroke-dashoffset="157">
              <animate attributeName="stroke-dashoffset" from="157" to="0" dur="500ms" fill="freeze" />
          </line>
      </svg>
  `;
  return svgCode;
}

function restartGame() {
  fields = [
      null, null, null,
      null, null, null,
      null, null, null
  ];
  currentPlayer = 'circle';
  render();
  updateStatus();
}

// Initialisierung des Spiels
init
