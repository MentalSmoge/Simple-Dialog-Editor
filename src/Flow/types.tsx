export interface rowProps {
  idOfRow : number,
  data : {
    firstVar? : { value: string, label: string },
    secondVar? : { value: string, label: string },
    thirdVar? : { value: string, label: string }
  }
}
export interface rowDisplayProps {
  idOfRow : number,
  position : number,
  deleteFunc : Function,
  renderDelete : boolean,
  changeVar : Function,
  data : {
    firstVar? : { value: string, label: string },
    secondVar? : { value: string, label: string },
    thirdVar? : { value: string, label: string }
  }
}

export interface CharacterLabel {
  value : string,
  label : string
}

export interface DefaultInputProps {
  textContent : string,
  readOnly : boolean
}

export interface ProportionalImageProps {
  src : string
}
