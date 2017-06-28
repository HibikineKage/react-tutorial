import React from 'react';
import Board from './board.js'
import calculateWinner from './calculateWinner.js'

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner =  calculateWinner(current.squares);

    const moves = history.map((step, move, hist) => {
      const diffPos = move ?
        checkPosDiff(hist[move-1].squares, step.squares) :
        void 0;
      const x = 1 + diffPos % 3;
      const y = 1 + Math.floor(diffPos / 3);

      const desc = move ?
        'Move (' + x + ', ' + y + ')' :
        'Game start';
      return (
        <li key={move}>
          <a onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


function checkPosDiff(before, after) {
  if(before == null || after == null) {
    return;
  }
  for (let i = 0; i < before.length; ++i) {
    if (before[i] !== after[i]) {
      return i;
    }
  }
  return;
}
