import React from "react";
import "./ProportionalImage.css"
import { ProportionalImageProps } from "../../types";

// eslint-disable-next-line react/function-component-definition
const ProportionalImage = ({src} : ProportionalImageProps) => {
  return (
    <img className="ProportionalImage-image" src={src} alt=""/>
    );
}

export default ProportionalImage
