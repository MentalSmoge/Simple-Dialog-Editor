import { makeAutoObservable } from "mobx"
import { CharacterLabel } from "../Flow/types";

type Character = {
  id : string,
  name : string,
  bio : string
}

class CharacterStore {
  characters : Character[] = [
    {id: '1', name:"First One", bio:"The Chosen One"},
    {id: '2', name:"Second One", bio:"Not so special tbh"}
  ];

  get character_options() {
    const returnCharacters = [] as CharacterLabel[]
    this.characters.forEach(char => {
      returnCharacters.push({value: char.id, label: char.name})
    });
    return returnCharacters
}

  // character_options : CharacterLabel[] = [
  //   {value:"First One", label:"The Chosen One"},
  //   {value:"Second One", label:"Not so special tbh"}
  // ];

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

  getCharacter(characterId : string) {
    return this.characters.filter(character => character.id === characterId)[0]
  }

  getCharacterLabel(characterId : string) {
    return this.character_options.filter(character => character.value === characterId)[0]
  }
}

export default new CharacterStore()
