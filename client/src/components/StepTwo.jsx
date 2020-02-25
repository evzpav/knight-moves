import React from "react";
import { Link } from "react-router-dom";

export default function StepTwo() {
  return (
    <div className="step-text">
      <p>
        After clicking or tapping in one of the 64 squares of the chessboard, many squares will be
        highlighted showing where the knight can rest, after you move it two times consecutively.
      </p>
      <p>Alright, let&apos;s play it!</p>
      <Link to="/chessboard">
        <button id="play-button" type="button">
          PLAY
        </button>
      </Link>
    </div>
  );
}
