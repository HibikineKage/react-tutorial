import React from 'react';
import Square from './square.js'
import calculateWinner from './calculateWinner'

export default class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  renderSquare(i) {
    const isWin = false; // TODO 勝っているかどうかthis.props.lineと比較
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      isWin={isWin}
    />;
  }

  renderRow(row) {

  }

  render() {
    let array = [];

    const rowNum = 3;
    const columnNum = 3;

    for (let i = 0; i < rowNum; ++i) {
      let row = [];
      for (let j = 0; j < columnNum; ++j) {
        row.push(i * columnNum + j);
      }
      array.push(row);
    }

    return (
      <div>
        {array.map((row) => {
          return (
            <div className="board-row">
              {row.map((i) => {
                return this.renderSquare(i);
              })}
            </div>
          )
        })}
      </div>
    )
  }
}
