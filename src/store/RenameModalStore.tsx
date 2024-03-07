import { makeAutoObservable } from "mobx"
import DialogsStore from "./DialogsStore"

class RenameModalStore {
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
    this.currentNewName = DialogsStore.getDialogName(this.currentId)
    this.isOpen = true
  }

  rename() {
    DialogsStore.renameDialog(this.currentId, this.currentNewName)
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

export default new RenameModalStore()
