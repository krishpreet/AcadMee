import React from "react";
import "./TrustedSection.css";

const TrustedSection = ({ number, paragraph }) => {
  return (
    <div className="Numbersection">
      <h1 className="trusted-header">Trusted by</h1>
      <div className="midcontainer">
        <div className="trusted-numbers-container">
          <div className="trusted-number-container">
            <div className="trusted-number">{number}150+</div>
            <h2 className="trusted-paragraph">{paragraph}Students</h2>
          </div>
          <div className="trusted-number-container">
            <div className="trusted-number">{number}100+</div>
            <h2 className="trusted-paragraph">{paragraph}Teachers</h2>
          </div>
          <div className="trusted-number-container">
            <div className="trusted-number">{number}150</div>
            <p className="trusted-paragraph">{paragraph}hello</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedSection;
