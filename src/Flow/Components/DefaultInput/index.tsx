import React from "react";
import TextareaAutosize from 'react-textarea-autosize';
import "./DefaultInput.css"
import { DefaultInputProps } from "../../types";


// eslint-disable-next-line react/function-component-definition
const DefaultInput = ({textContent, readOnly=false} : DefaultInputProps) => {
  return (<TextareaAutosize cols={30} maxRows={10} minRows={3} value={textContent} readOnly={readOnly} className='DefaultInput nodrag nowheel'/>);
}

export default DefaultInput
