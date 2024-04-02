import { makeAutoObservable } from "mobx"
import DialogsStore from "../../../../store/DialogsStore"

class AddDialogModalStore {
  isOpen=false

  currentNewName = ""

  constructor(){
    makeAutoObservable(this)
  }

  addDialog(name : string) {
    DialogsStore.addDialog(name)
    this.closeEditor()
  }

  openEditor() {
    this.currentNewName = "New Dialog"
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

export default new AddDialogModalStore()
