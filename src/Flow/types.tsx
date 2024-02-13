export interface rowProps {
  id : number,
  data : {
    firstVar : { value: string, label: string },
    secondVar : { value: string, label: string }
  }
}
export interface rowDisplayProps {
  id : number,
  position : number,
  deleteFunc : Function,
  renderDelete : boolean,
  data : {
    firstVar : { value: string, label: string },
    secondVar : { value: string, label: string }
  }
}

