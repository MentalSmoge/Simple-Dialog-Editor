import { makeAutoObservable } from "mobx"

type Character = {
  name : string,
  bio : string
}
type ReturnLabel = {
  value : string,
  label : string
}

class CharacterStore {
  characters : Character[] = [
    {name:"First One", bio:"The Chosen One"},
    {name:"Second One", bio:"Not so special tbh"}
  ];

  character_options : ReturnLabel[] = [
    {value:"First One", label:"The Chosen One"},
    {value:"Second One", label:"Not so special tbh"}
  ];

  constructor(){
    makeAutoObservable(this)
  }

  addCharacter(variable : Variable) {
    this.variables.push(variable)
  }

  deleteCharacter(variable : Variable) {
    const index = this.variables.indexOf(variable, 0);
    if (index > -1) {
      this.variables.splice(index, 1);
    }
  }
}

export default new CharacterStore()
