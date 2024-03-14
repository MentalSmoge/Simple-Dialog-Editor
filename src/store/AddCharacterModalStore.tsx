import { makeAutoObservable } from "mobx"
import CharacterStore from "./CharacterStore"

class AddCharacterModalStore {
  isOpen=false

  currentNewName = ""

  constructor(){
    makeAutoObservable(this)
  }

  addCharacter(name : string) {
    CharacterStore.addCharacter(name)
    this.closeEditor()
  }

  openEditor() {
    this.currentNewName = "New character"
    this.isOpen = true
  }

  closeEditor() {
    this.isOpen = false
    this.currentNewName = ""
  }

  changeName(newName : string) {
    this.currentNewName = newName
  }
}

export default new AddCharacterModalStore()
