import React from 'react'
import Multistep from 'react-multistep';
import { StepOne } from '../components/StepOne'
import { StepTwo } from '../components/StepTwo'


const steps = [
    { name: 'Step 1', component: <StepOne /> },
    { name: 'Step 2', component: <StepTwo /> }
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