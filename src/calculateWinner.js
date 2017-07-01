import calculateLine from './calculateLine.js'

export default function calculateWinner(squares) {
  const line = calculateLine(squares);
  if (line != null) {
    return squares[line[0]];
  }
  return;
}
