import React from 'react'
import { Link } from "react-router-dom";

export class StepTwo extends React.Component {
  constructor() {
    super()

  }

  render() {
    return (
      <div>
        <p>sdsfsdf</p>
        <Link to="/chessboard">
          <button>GO</button>
        </Link>


      </div>
    )
  }
}