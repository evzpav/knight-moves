/* eslint-disable  jsx-a11y/control-has-associated-label */

import React from "react";
import PropTypes from "prop-types";

function getSquareColor(x, y) {
  const lightSquareColor = "#0E6BA8";
  const darkSquareColor = "#0A2472";

  const odd = x % 2;
  if (y % 2) {
    return odd ? lightSquareColor : darkSquareColor;
  }
  return odd ? darkSquareColor : lightSquareColor;
}

export default function Square(props) {
  const { onClick, x, y, highlight } = props;
  const background = getSquareColor(x, y);
  const boxShadow = highlight ? "inset 0px 0px 0px 0.5vmin yellow" : undefined;
  const styles = { background, boxShadow };
  return (
    <button
      type="button"
      className="square"
      onClick={onClick}
      key={`square-${x}-${y}`}
      id={`square-${x}${y}`}
      style={styles}
    />
  );
}

Square.propTypes = {
  onClick: PropTypes.element.isRequired,
  x: PropTypes.element.isRequired,
  y: PropTypes.element.isRequired,
  highlight: PropTypes.element.isRequired,
};
