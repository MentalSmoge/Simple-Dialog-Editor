import { Dispatch, SetStateAction } from "react"

export interface rowProps {
  idOfRow : number,
  data : {
    firstVar? : { value: string, label: string },
    secondVar? : { value: string, label: string },
    thirdVar? : { value: string, label: string }
  }
}
export interface rowDisplayProps {
  id : string,
  idOfRow : number,
  position : number,
  renderDelete : boolean,
  data : {
    firstVar? : { value: string, label: string },
    secondVar? : { value: string, label: string },
    thirdVar? : { value: string, label: string }
  }
}

export interface CharacterLabel {
  value : number,
  label : string
}

export interface DefaultInputProps {
  textContent : string,
  readOnly : boolean
}

export interface ProportionalImageProps {
  src : string,
  alt : string
}

export interface CharacterCardProps {
  folder : string
}

export type DialogFileData = {
  /**
   * Did user cancel dialog?
   */
  cancelled: boolean
  /**
   * Array of file paths that user selected
   */
  filePaths: string[]
}

export interface AddNodeContextMenuProps {
  anchorPoint : {x:number, y:number},
  isOpen : boolean,
  setOpen : Dispatch<SetStateAction<boolean>>,
  addNode : Function
}

export interface ContextMenuProps {
  destiny : string,
  anchorPoint : {x:number, y:number},
  isOpen : boolean,
  setOpen : Dispatch<SetStateAction<boolean>>
}

export interface Dialog {
  id : number, name: string, reactflowInstance : object
}
