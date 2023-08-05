import React, { useState } from "react";
import "./Middlepage.css";

const Middlepage = () => {
  const totalSteps = 3;
  const [currentStep, setCurrentStep] = useState(1);

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(1, prevStep - 1));
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(totalSteps, prevStep + 1));
  };

  return (
    <div className="process-container">
      <div className="process-steps">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`process-step ${index + 1 === currentStep ? "active" : ""}`}
            onClick={() => setCurrentStep(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <div className="process-content">
        <div className={`process-step-content ${currentStep === 1 ? "active" : ""}`}>
          Step 1 Content
        </div>
        <div className={`process-step-content ${currentStep === 2 ? "active" : ""}`}>
          Step 2 Content
        </div>
        <div className={`process-step-content ${currentStep === 3 ? "active" : ""}`}>
          Step 3 Content
        </div>
      </div>

      <div className="process-navigation">
        <button
          className="arrow-button prev-button"
          onClick={handlePrevStep}
          disabled={currentStep === 1}
        >
          {"<"}
        </button>
        <button
          className="arrow-button next-button"
          onClick={handleNextStep}
          disabled={currentStep === totalSteps}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Middlepage;

