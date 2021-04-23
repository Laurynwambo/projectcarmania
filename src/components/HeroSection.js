import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
// nakuja bobo. natenegenesza kahawa
//sawa,,sikuskii
function HeroSection() {
  return (
    <div className="hero-container">
      <image src="../public/images/img-home.jpg" />
      <h1>Vehicles for sale in Kenya</h1>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          VEHICLES FOR SALE IN KENYA
          FROM ONLY 3,990,000/=
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
