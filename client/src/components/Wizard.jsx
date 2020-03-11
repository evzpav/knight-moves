import React from "react";
import Multistep from "react-multistep";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import "./Wizard.css";

const steps = [
  { name: "Step 1", component: <StepOne /> },
  { name: "Step 2", component: <StepTwo /> },
];

export default function Wizard() {
  return (
    <div className="container">
      <div>
        <Multistep steps={steps} />
      </div>
    </div>
  );
}
