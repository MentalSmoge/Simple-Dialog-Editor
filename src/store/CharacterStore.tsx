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
    {
      "id": 1,
      "name": "Адам",
      "bio": "",
      "defaultPortrait": ""
    },
    {
      "id": 2,
      "name": "Ева",
      "bio": "",
      "defaultPortrait": ""
    }
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
    // DialogsStore.deleteCharacterFromDialogs(characterId)
  }

  getCharacter(characterId : number) {
    return this.characters.filter(character => character.id === characterId)[0]
  }

  getCharacterName(characterId : number) {
    return this.characters.filter(character => character.id === characterId)[0]?.name
  }

  getCharacterBio(characterId : number) {
    return this.characters.filter(character => character.id === characterId)[0]?.bio
  }

  getCharacterDir(characterId : number) {
    return this.characters.filter(character => character.id === characterId)[0]?.defaultPortrait
  }

  getCharacterLabel(characterId : number) {

    if(this.character_options.filter(character => character.value === characterId)[0] === undefined) {
      return null
    }
    return this.character_options.filter(character => character.value === characterId)[0]
  }

  editCharacter(characterId : number, name : string, bio : string, defaultPortrait : string) {
    this.characters.filter(character => character.id === characterId)[0].name = name
    this.characters.filter(character => character.id === characterId)[0].bio = bio
    this.characters.filter(character => character.id === characterId)[0].defaultPortrait = defaultPortrait
  }

  getCharactersForSave() {
    return this.characters
  }

  getCharactersForExport() {
    const returnCharacters = []
    this.characters.forEach(character => {
      returnCharacters.push({
        id:character.id,
        name:character.name,
        bio:character.bio
      })
    });
    return returnCharacters
  }

  setCharacters(characters: Character[]) {
    if (characters === undefined) {
      console.log("Error")
      return
    }
    this.characters = characters
  }
}

export default new CharacterStore()
