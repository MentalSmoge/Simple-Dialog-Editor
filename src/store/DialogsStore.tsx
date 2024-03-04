import { makeAutoObservable } from "mobx"

type Dialog = {
  id : number, name: string, reactflowInstance : object
}

const initialDialogs = [
  {
    id : 1,
    name: "Dialog 1"
  },
  {
    id : 2,
    name: "Dialog 2"
  }
] as Dialog[]

class DialogsStore {
  dialogs = initialDialogs

  constructor(){
    makeAutoObservable(this)
  }

  addDialog(dialog : Dialog) {
    this.dialogs.push(dialog)
  }

  deleteDialog(dialogId : number) {
    const result = this.dialogs.filter(dialog => dialog.id !== dialogId);
    this.dialogs = result
  }

  getDialogName(dialogId : number) {
    return this.dialogs.filter(dialog => dialog.id === dialogId)[0]?.name
  }
}

export default new DialogsStore()
