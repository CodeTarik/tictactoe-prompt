let fields = [
    'circle',   //1
    'circle',   //2
    'circle',   //3
    null,       //4
    'cross',    //5
    null,       //6
    'cross',    //7
    null,       //8
    null,       //9
];

function init() {
    render();
}

function render() {
    // Erstelle ein HTML-Zeichenkette für die Tabelle
    let tableHtml = `<table>`;
    for (let i = 0; i < 3; i++) {
      tableHtml += `<tr>`;
      for (let j = 0; j < 3; j++) {
        let cellContent = fields[i * 3 + j];
        if (cellContent === "circle") {
          cellContent = generateAnimatedCircleSVG() ;
        } else if (cellContent === "cross") {
          cellContent = generateAnimatedCrossSVG() ;
        } else {
          cellContent = "";
        }
        tableHtml += `<td>${cellContent}</td>`;
      }
      tableHtml += `</tr>`;
    }
    tableHtml += `</table>`;
  
    // Füge die Tabelle in den Div-Container mit der ID 'content' ein
    document.getElementById("content").innerHTML = tableHtml;
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

const svgHTML = generateAnimatedCircleSVG();
console.log(svgHTML);


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

console.log(generateAnimatedCrossSVG());




