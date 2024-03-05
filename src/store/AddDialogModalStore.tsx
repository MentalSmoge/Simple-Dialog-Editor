import { makeAutoObservable } from "mobx"
import DialogsStore from "./DialogsStore"

class AddDialogModalStore {
  isOpen=false

  constructor(){
    makeAutoObservable(this)
  }

  addDialog(name : string) {
    DialogsStore.addDialog()
  }

  openEditor() {
    this.isOpen = true
  }

  closeEditor() {
    this.isOpen = false
  }
}

export default new AddDialogModalStore()
