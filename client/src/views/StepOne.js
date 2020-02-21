import React from 'react'

export class StepOne extends React.Component {
  constructor() {
    super()
 
  }

  render() {
    return (
      <div classNam="step-text">
        <p>Knight moves is a game to show the possible positions that a knight to be after 2 turns.</p>
        <p>The cells are highlighted</p>
      </div>
    )
  }
}