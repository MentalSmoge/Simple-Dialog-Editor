import { makeAutoObservable } from "mobx"
import { CharacterLabel } from "../Flow/types";

type Character = {
  id : number,
  name : string,
  bio : string,
  defaultPortrait : string
}

class CharacterStore {
  characters : Character[] = [
    {id: 1, name:"First One", bio:"The Chosen One", defaultPortrait: "D:\\Фото С IPHONE 6S\\IMG_0053.jpg"},
    {id: 2, name:"Second One", bio:"Not so special tbh", defaultPortrait: "D:\\Фото С IPHONE 6S\\IMG_0157.jpg"}
  ];

  newIdCounter = 3

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

  addCharacter(name : string) {
    this.newIdCounter += 1
    const character = {
      id : this.newIdCounter,
      name,
      bio: "",
      defaultPortrait: "",
    }
    this.characters.push(character)
  }

  deleteCharacter(characterId : number) {
    const result = this.characters.filter(character => character.id !== characterId);
    this.characters = result
  }

  getCharacter(characterId : number) {
    return this.characters.filter(character => character.id === characterId)[0]
  }

  getCharacterName(characterId : number) {
    return this.characters.filter(character => character.id === characterId)[0]?.name
  }

  getCharacterLabel(characterId : string) {
    return this.character_options.filter(character => character.value === characterId)[0]
  }
}

export default new CharacterStore()
