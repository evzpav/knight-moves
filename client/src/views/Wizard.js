import React from 'react'
import Multistep from 'react-multistep';
import { StepOne } from './StepOne'
import { StepTwo } from './StepTwo'


const steps = [
    { name: 'Step One', component: <StepOne /> },
    { name: 'Step Two', component: <StepTwo /> }
];

export default class Wizard extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className='container'>
                <div>
                    <Multistep steps={steps} />
                </div>

            </div>
        )

    }





}