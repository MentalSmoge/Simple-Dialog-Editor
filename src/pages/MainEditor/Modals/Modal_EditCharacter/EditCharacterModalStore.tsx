import { makeAutoObservable } from "mobx"
import DialogsStore from "../../../../store/DialogsStore"
import CharacterStore from "../../../../store/CharacterStore"

class EditModalCharacterStore {
  isOpen=false

  currentId = -1

  currentNewName = ""

  currentNewBio = ""

  currentNewDir = ""

  constructor(){
    makeAutoObservable(this)
  }

  setCurrentId(dialogId : number) {
    this.currentId = dialogId
  }

  openEditor() {
    this.isOpen = true
    this.currentNewName = CharacterStore.getCharacterName(this.currentId)
    this.currentNewBio = CharacterStore.getCharacterBio(this.currentId)
    this.currentNewDir = CharacterStore.getCharacterDir(this.currentId)
  }

  rename() {
    CharacterStore.editCharacter(this.currentId, this.currentNewName, this.currentNewBio, this.currentNewDir)
    // DialogsStore.updateCharacterFromDialogs(this.currentId, this.currentNewName, this.currentNewBio, this.currentNewDir)
    this.closeEditor()
  }

  closeEditor() {
    this.isOpen = false
    this.currentId = -1
  }

  changeName(newName : string) {
    this.currentNewName = newName
  }

  changeBio(newBio : string) {
    this.currentNewBio = newBio
  }

  changeDir(newDir : string) {
    this.currentNewDir = newDir
  }
}

export default new EditModalCharacterStore()
