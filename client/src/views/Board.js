import React from 'react';
import Square from '../components/Square';
import { getKnightMoves } from '../api/api';
import logo from '../knight.svg';
import { Link } from "react-router-dom";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: [],
            loading: false,
            error: ""
        }
        this.handleSquareClick = this.handleSquareClick.bind(this)
    }

    async handleSquareClick(name) {
        this.setState({ loading: true });
        this.setState({ error: "" });

        try {
            const knightMoves = await getKnightMoves(name);

            let secondTurn = knightMoves.possiblePositions.second_turn;
            this.setState({ squares: secondTurn });

        } catch (error) {
            if (error && error.response && error.response.status === 400) {
                console.error("Bad request - error: ", error.response.data);
                this.setState({ error: error.response.data });
            } else {
                console.error(error);
                this.setState({ error: "Could not retrieve positions from server." });

            }

        } finally {
            this.setState({ loading: false });
        }

    }

    renderSquare(name, i, j) {
        return (
            <Square
                value={name}
                onClick={() => this.handleSquareClick(name)}
                x={i}
                y={j}
                key={name}
                highlight={this.state.squares.includes(name)}
            />
        );
    }

    renderBoard() {
        const xAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const board = [];

        for (let i = 8; i > 0; i--) {
            let line = [];
            for (let j = 0; j < xAxis.length; j++) {
                let fieldName = xAxis[j] + i
                line.push(this.renderSquare(fieldName, i, j));

            }
            board.push(
                <div className="board-row">
                    {line}
                </div>
            )
        }

        return board;
    }

    isLoading() {
        return this.state.loading ? "Loading positions..." : this.state.error;
    }

    render() {
        return (
            <div>
                <header className="chessboard-header">
                    <Link to="/">
                        <img src={logo} alt="Back to home"></img>
                    </Link>
                        <h1>Knight Moves</h1>

                </header>
                <div className="chessboard">
                    <div key="board" className="board">
                        {this.renderBoard()}
                    </div>
                    <div id="loading-div">
                        <p>{this.isLoading()}</p>
                    </div>
                </div>
            </div>


        );
    }
}

export default Board;