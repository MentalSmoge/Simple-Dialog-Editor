import { makeAutoObservable } from "mobx"
import DialogsStore from "./DialogsStore"

class DeleteModalStore {
  isOpen=false

  currentId = -1

  constructor(){
    makeAutoObservable(this)
  }

  setCurrentId(dialogId : number) {
    this.currentId = dialogId
  }

  openEditor() {
    this.isOpen = true
  }

  delete() {
    DialogsStore.deleteDialog(this.currentId)
    this.closeEditor()
  }

  closeEditor() {
    this.isOpen = false
    this.currentId = -1
  }
}

export default new DeleteModalStore()
