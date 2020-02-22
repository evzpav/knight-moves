import React from 'react';

export default function Square(props) {
    let { onClick, x, y, highlight } = props;

    const background = getSquareColor(x, y);
    const boxShadow = highlight ? 'inset 0px 0px 0px 0.5vmin yellow' : undefined
    const styles = Object.assign({ background, boxShadow });
    return (
        <button className="square" onClick={onClick} key={`square-${x}-${y}`}
            id={`square-${x}${y}`} style={styles}>
        </button>
    );
}


function getSquareColor(x, y) {
    const lightSquareColor = '#0E6BA8';
    const darkSquareColor = '#0A2472';

    const odd = x % 2;
    if (y % 2) {
        return odd ? lightSquareColor : darkSquareColor;
    }
    return odd ? darkSquareColor : lightSquareColor;
}
