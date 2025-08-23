import pieceMap from "./pieceMap";

export default function parseFEN(fen) {
  const rows = fen.split(" ")[0].split("/");
  let pieces = [];

  rows.forEach((row, r) => {
    let col = 0;
    for (let char of row) {
      if (/[1-8]/.test(char)) {
        col += parseInt(char);
      } else {
        pieces.push({
          type: pieceMap[char],
          color: char === char.toUpperCase() ? "white" : "black",
          x: col - 3.5,
          z: r - 3.5,
        });
        col++;
      }
    }
  });

  return pieces;
}
