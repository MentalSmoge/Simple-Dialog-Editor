export interface rowProps {
  idOfRow : number,
  data : {
    firstVar : { value: string, label: string },
    secondVar : { value: string, label: string }
  }
}
export interface rowDisplayProps {
  idOfRow : number,
  position : number,
  deleteFunc : Function,
  renderDelete : boolean,
  data : {
    firstVar : { value: string, label: string },
    secondVar : { value: string, label: string }
  }
}

