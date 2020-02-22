import React from 'react'

export class StepOne extends React.Component {
  render() {
    return (
      <div className="step-text">
        <p>Knight moves is a game to show the possible positions that the knight can be after 2 turns.</p>
        <p>The knight (<img src="./knight.png" height="30px" alt="logo"></img>) is the piece of the chess game that can move 2 cells in the vertical or horizontal direction and then 1 cell perpendicularly, or 1 cell in the vertical or horizontal direction and 2 perpencidularly. Shape of the movement forming the letter "L"</p>
      </div>
    )
  }
}