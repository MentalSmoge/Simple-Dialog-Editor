import { makeAutoObservable } from "mobx"
import DialogsStore from "../../../../store/DialogsStore"
import CharacterStore from "../../../../store/CharacterStore"
import VariablesStore from "../../../../store/VariablesStore"

class DeleteModalStore {
  isOpen=false

  currentId = -1

  currentType = ""

  constructor(){
    makeAutoObservable(this)
  }

  setCurrentId(dialogId : number) {
    this.currentId = dialogId
  }

  openEditor(type : string) {
    this.currentType = type
    this.isOpen = true
  }

  delete() {
    switch (this.currentType) {
      case "Dialog":
        DialogsStore.deleteDialog(this.currentId)
        break;
      case "Character":
        CharacterStore.deleteCharacter(this.currentId)
        DialogsStore.deleteCharacterFromDialogs(this.currentId)
        break;
      case "Variable":
        VariablesStore.deleteVar(this.currentId)
        DialogsStore.deleteVarFromDialogs(this.currentId)
        break;

      default:
        break;
    }
    this.closeEditor()
  }

  getName() {
    switch (this.currentType) {
      case "Dialog":
        return DialogsStore.getDialogName(this.currentId)
        break;
      case "Character":
        return CharacterStore.getCharacterName(this.currentId)
        break;
      case "Variable":
        return VariablesStore.getVarName(this.currentId)
        break;
      default:
        break;
    }
    return ""
  }

  closeEditor() {
    this.isOpen = false
    this.currentId = -1
  }
}

export default new DeleteModalStore()
