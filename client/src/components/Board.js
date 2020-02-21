import React from 'react';
import Square from './Square';
import { getKnightMoves } from '../api/api';
// import '../css/board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: [],
            loading: false
        }
    }

    async handleSquareClick(name) {
        this.setState({ loading: true });
    
        try {
            const knightMoves = await getKnightMoves(name);

            let secondTurn = knightMoves.possiblePositions.second_turn;
            this.setState({ squares: secondTurn });

        } catch (error) {
            if (error && error.response && error.response.status === 400) {
                console.error("Bad request - error: ", error.response.data);
            } else {
                console.error(error);
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

    render() {
          return (
            <div key="board" className="board">
                {this.renderBoard()}
            </div>

        );
    }
}

export default Board;