import React from 'react';
import Square from './square.js'
import calculateLine from './calculateLine.js'

export default class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  renderSquare(i, line) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      isWin={
        -1 < line.indexOf(i) ?
          true:
          false
      }
      key={"square-" + i}
    />;
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

    /* 勝った時に、その勝った場所のラインが返る
     * まだ勝負がついてない時は空配列を返す
     * ex) [2, 4, 6] */
    const line = calculateLine(this.props.squares) || [];

    return (
      <div>
        {array.map((row, num) => {
          return (
            <div
              className="board-row"
              key={"row-" + num}>
              {row.map((i) => {
                return this.renderSquare(i, line);
              })}
            </div>
          )
        })}
      </div>
    )
  }
}
