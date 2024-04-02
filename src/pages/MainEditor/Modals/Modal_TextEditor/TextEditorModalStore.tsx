import { makeAutoObservable } from "mobx"
import FlowStore from "../../components/EditorField/FlowStore"

class TextEditorStore {
  isOpen=false

  currentText=""

  currentId = ""

  constructor(){
    makeAutoObservable(this)
  }

  openEditor(text : string, nodeId : string) {
    this.isOpen = true
    this.changeText(text)
    this.currentId = nodeId
  }

  closeEditor() {
    this.isOpen = false
  }

  saveAndClose() {
    FlowStore.updateTextInNode(this.currentId, this.currentText)
    this.closeEditor()
  }

  changeText(newText : string) {
    this.currentText = newText
  }
}

export default new TextEditorStore()
