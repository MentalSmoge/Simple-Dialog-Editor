import { FpsView } from 'react-fps';
import { ReactFlowProvider } from 'reactflow';
import Flow from '../Flow';
import TextEditorView from '../Flow/TextEditorView';

import './App.css';
import SideBar from '../Flow/Components/SideBar';
import ContextMenu from '../Flow/Components/ContextMenu';
import { useState } from 'react';
import DeleteModal from '../Flow/Components/DeleteModal';
import DeleteModalStore from '../store/DeleteModalStore';
import RenameModal from '../Flow/Components/RenameModal';
import DialogsStore from '../store/DialogsStore';
import AddDialogModal from '../Flow/Components/AddDialogModal';
import RightSideBar from '../Flow/Components/RightSideBar';
import EditModalCharacter from '../Flow/Components/EditModalCharacter';
import EditModalVariable from '../Flow/Components/EditModalVariable';
import AddCharacterModal from '../Flow/Components/AddCharacterModal';
import AddVarModal from '../Flow/Components/AddVarModal';
import CharacterStore from '../store/CharacterStore';
import VariablesStore from '../store/VariablesStore';
import { observer } from 'mobx-react-lite';
import PlayerChoiceTextEditorView from '../Flow/PlayerChoiceTextEditorView';


window.electron.onSaveFile(() => {
  const response = {dialogs : [], characters : [], variables : []}
  const dialogs = DialogsStore.getDialogsForSave()
  response.dialogs = dialogs
  response.characters = CharacterStore.getCharactersForSave()
  response.variables = VariablesStore.getVariablesForSave()
  console.log(JSON.stringify(response, null, 2))
  window.electron.saveFile(JSON.stringify(response, null, 2))
})


window.electron.onExportFile(() => {
  const response = {dialogs : [], characters : [], variables : []}
  const dialogs = DialogsStore.getDialogsForExport()
  response.dialogs = dialogs
  response.characters = CharacterStore.getCharactersForExport()
  response.variables = VariablesStore.getVariablesForExport()
  // const responce = reactflow.toObject()
  // DialogsStore.dialogs.forEach(dialog => {
  //   response.dialogs.push(dialog)
  // });
  console.log(JSON.stringify(response, null, 2))
  // const responce = JSON.stringify(reactflow.toObject())
  window.electron.exportFile(JSON.stringify(response, null, 2))
})
window.electron.onProjectOpen((args) => {
  console.log('got FILE_OPEN', args)
  let result
  let result_dialog
  let result_char
  let result_var
  try {
    result = JSON.parse(args)
    result_dialog = result.dialogs
    result_char = result.characters
    result_var = result.variables

  } catch (error) {
    console.log(error)
  }
  try {
    DialogsStore.setDialogs(result_dialog)
    CharacterStore.setCharacters(result_char)
    VariablesStore.setVariables(result_var)
  } catch (error) {
    console.log(error)

  }
})
function App() {
  const [contextMenuIsOpen, setContextMenuIsOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [destiny, setDestiny] = useState("");
  const openContextMenu = (e, newDestiny) => {
    e.preventDefault();
    setDestiny(newDestiny)
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    setContextMenuIsOpen(true);
  }

  return (
    <ReactFlowProvider>
    <div className="App"
      onContextMenu={ (e) => {
            const classlist = e.target.classList;
            if (classlist.contains('react-flow__pane')) {
              openContextMenu(e, "addNode")
            }
            if (classlist.contains('SideBar-button')) {
              openContextMenu(e, "SideBarDialog")
            }
            if (classlist.contains('RightSideBar-button-character')) {
              openContextMenu(e, "SideBarCharacter")
            }
            if (classlist.contains('RightSideBar-button-variable')) {
              openContextMenu(e, "SideBarVariable")
            }
          }}>
      <DeleteModal />
      <RenameModal />
      <AddDialogModal />
      <AddCharacterModal />
      <AddVarModal />
      <EditModalCharacter />
      <EditModalVariable />
      <PlayerChoiceTextEditorView />
      <ContextMenu destiny={destiny} anchorPoint={anchorPoint} isOpen={contextMenuIsOpen} setOpen={setContextMenuIsOpen} />
      <header className="App-header">Отображаемый диалог:<b>{DialogsStore.getDialogName(DialogsStore.currentDialogId)}</b></header>
      {/* <FpsView/> */}
      <div style={{display:"flex", flexDirection:"row", height:"100%", overflow:"hidden"}}>
        <SideBar />
        <Flow />
        <RightSideBar />
      </div>
      <TextEditorView />
      <footer className="App-footer"></footer>
    </div>
    </ReactFlowProvider>
  );
}

export default observer(App);
