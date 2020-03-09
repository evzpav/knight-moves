import React from "react";
import { Link } from "react-router-dom";
import Square from "../components/Square";
import getKnightMoves from "../api/api";
import logo from "../assets/images/knight.svg";
import "./Board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [],
      loading: false,
      error: "",
    };

    this.xAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];
    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  async handleSquareClick(name) {
    this.setState({ loading: true, error: "" });

    try {
      const knightMoves = await getKnightMoves(name);
      if (!knightMoves) {
        this.setState({ error: "could not get data" });
        return;
      }

      const secondTurn = knightMoves.possiblePositions.second_turn;
      this.setState({ squares: secondTurn });
    } catch (error) {
      if (error && error.response && error.response.status === 400) {
        this.setState({ error: error.response.data });
      } else {
        this.setState({
          error: "Could not retrieve positions from server.",
        });
      }
    } finally {
      this.setState({ loading: false });
    }
  }

  isLoading() {
    const { loading, error } = this.state;
    return loading ? "Loading positions..." : error;
  }

  boardFooter() {
    const footer = [];
    const xAxis = JSON.parse(JSON.stringify(this.xAxis));
    xAxis.push("");
    xAxis.forEach(val => {
      // eslint-disable-next-line react/jsx-filename-extension
      footer.push(
        <button type="button" className="info-square">
          {val}
        </button>,
      );
    });

    return footer;
  }

  renderBoard() {
    const board = [];
    for (let i = 8; i > 0; i -= 1) {
      const line = [];
      for (let j = 0; j < this.xAxis.length; j += 1) {
        const fieldName = this.xAxis[j] + i;
        line.push(this.renderSquare(fieldName, i, j));
      }

      board.push(
        <div className="board-row">
          {line}
          <button type="button" className="info-square">
            {i}
          </button>
        </div>,
      );
    }

    return board;
  }

  renderSquare(name, i, j) {
    const { squares } = this.state;
    return (
      <Square
        value={name}
        onClick={() => this.handleSquareClick(name)}
        x={i}
        y={j}
        key={name}
        highlight={squares.includes(name)}
      />
    );
  }

  render() {
    return (
      <div>
        <header className="chessboard-header">
          <Link to="/">
            <img src={logo} alt="Back to home" />
          </Link>
          <h1>Knight Moves</h1>
        </header>
        <div className="chessboard">
          <div key="board" className="board">
            {this.renderBoard()}
          </div>
          <div className="board-footer">{this.boardFooter()}</div>
          <div id="loading-div">
            <p>{this.isLoading()}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
