import { makeAutoObservable } from "mobx"
import FlowStore from "./FlowStore"

class TextEditorStore {
  isOpen=false

  currentText=""

  currentId = ""

  currentRowId = -1

  constructor(){
    makeAutoObservable(this)
  }

  openEditor(text : string, nodeId : string, rowId: number) {
    this.isOpen = true
    this.changeText(text)
    this.currentId = nodeId
    this.currentRowId = rowId
  }

  closeEditor() {
    this.isOpen = false
  }

  saveAndClose() {
    FlowStore.updateTextInPlayerChoiceNode(this.currentId, this.currentRowId, this.currentText)
    this.closeEditor()
  }

  changeText(newText : string) {
    this.currentText = newText
  }
}

export default new TextEditorStore()
