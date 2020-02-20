import React from 'react';
import axios from 'axios';
import config from '../config/config';



function Square(props) {
    let { onClick, x, y, value, highlight } = props;

    const background = getSquareColor(x, y);
    const boxShadow = highlight ? 'inset 0px 0px 0px 0.5vmin #A6E1FA' : undefined
    const styles = Object.assign({ background, boxShadow });
    return (
        <button className="square" onClick={onClick} key={`square-${x}-${y}`}
            id={`square-${x}${y}`} style={styles}>
            {/* {value} */}
        </button>
    );
}

function getSquareColor(x, y) {
    const lightSquareColor = '#0E6BA8';
    const darkSquareColor = '#0A2472';
    
    // const lightSquareColor = '#f0d9b5';
    // const darkSquareColor = '#b58863';
    const odd = x % 2;
    if (y % 2) {
        return odd ? lightSquareColor : darkSquareColor;
    }
    return odd ? darkSquareColor : lightSquareColor;
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: [],
            loading: false
        }

    }

    async handleSquareClick(name) {
        this.setState({ loading: true })
    
        try {
           
            setTimeout(()=>{
            }, 1000)

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
            this.setState({ loading: false })
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
            <div key="board">

                {this.renderBoard()}
            </div>

        );
    }
}

function getKnightMoves(position) {
    return new Promise(async (resolve, reject) => {
        try {
            const resp = await axios({
                method: 'get',
                url: `${config.apiUrl}/api/knightmoves/${position}`
            });

            resolve(resp.data);

        } catch (error) {
            reject(error);
        }

    })

}

export default Board;