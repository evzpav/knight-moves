import React from 'react';
import axios from 'axios';
import config from '../config/config';


function Square(props) {
    let { onClick, x, y, value, selected } = props;

    const background = getSquareColor(x, y);
    const boxShadow = selected ? 'inset 0px 0px 0px 0.4vmin yellow' : undefined
    const styles = Object.assign({ background, boxShadow });
    return (
        <button className="square" onClick={onClick} key={`square-${x}-${y}`}
            id={`square-${x}${y}`} style={styles}>
            {value}
        </button>
    );
}

function getSquareColor(x, y) {
    const lightSquareColor = '#f0d9b5';
    const darkSquareColor = '#b58863';
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
            xIsNext: true,
            isTarget: false,
            selected: ""
        }
    }

    async handleClick(i, j) {
        this.state.selected = i+j+""
        console.log("CLIKE HERE: ", i + " " + j)
        let position = i+""+j
        const knightMoves = await getKnightMoves(position);

        console.log(knightMoves)

    }

    renderSquare(name, i, j) {
        return (
            <Square
                value={this.state.squares[name]}
                onClick={() => this.handleClick(i, j)}
                x={i}
                y={j}
                key={i + "" + j}
            />
        );
    }

    renderBoard() {
        let matrix = [];
        for (let i = 0; i < 8; i++) {
            let line = [];
            for (let j = 0; j < 8; j++) {
                line.push(this.renderSquare("name", i, j));
            }

            matrix.push(
                <div className="board-row">
                    {line}
                </div>
            )
        }
        return matrix;
    }

    render() {
        return (
            <div>
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