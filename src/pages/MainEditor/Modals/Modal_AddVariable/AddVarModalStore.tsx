import { makeAutoObservable } from "mobx"
import VariablesStore from "../../../../store/VariablesStore"

class AddVarModalStore {
  isOpen=false

  currentNewName = ""

  constructor(){
    makeAutoObservable(this)
  }

  addVar(name : string) {
    VariablesStore.addVar(name)
    this.closeEditor()
  }

  openEditor() {
    this.currentNewName = "New Var"
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

export default new AddVarModalStore()
