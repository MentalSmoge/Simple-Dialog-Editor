import React, { useEffect, useState } from "react";
import "./ProportionalImage.css"
import { ProportionalImageProps } from "../../../../../../Flow/types";
import { observer } from "mobx-react-lite";

// eslint-disable-next-line react/function-component-definition
const ProportionalImage = ({image, defaultImage=""} : ProportionalImageProps) => {
  const [source, setSource] = useState(image)
  useEffect(() => {
    console.log("Image changed")
    setSource(image)
  },[image])
  const lol = () => {
    setSource(defaultImage)
    console.log("Fallback")
  }
  return (
    <img onError={lol} className="ProportionalImage-image" src={source ? source : defaultImage} alt=""/>
    );
}

export default observer(ProportionalImage)
