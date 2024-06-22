import { makeAutoObservable } from "mobx"
import DialogsStore from "../../../../store/DialogsStore"
import VariablesStore from "../../../../store/VariablesStore"

class EditModalVariableStore {
  isOpen=false

  currentId = -1

  currentNewName = ""

  constructor(){
    makeAutoObservable(this)
  }

  setCurrentId(dialogId : number) {
    this.currentId = dialogId
  }

  openEditor() {
    this.currentNewName = VariablesStore.getVarName(this.currentId)
    this.isOpen = true
  }

  rename() {
    VariablesStore.renameVar(this.currentId, this.currentNewName)
    this.closeEditor()
  }

  closeEditor() {
    this.isOpen = false
    this.currentId = -1
  }

  changeName(newName : string) {
    this.currentNewName = newName
  }
}

export default new EditModalVariableStore()
