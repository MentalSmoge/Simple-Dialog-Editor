import { ReactFlowProvider } from 'reactflow';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Flow from '../pages/MainEditor/components/EditorField';

import './App.css';
import SideBar from '../pages/MainEditor/components/SideBar';
import ContextMenu from '../pages/MainEditor/components/ContextMenu';
import DialogsStore from '../store/DialogsStore';
import RightSideBar from '../pages/MainEditor/components/RightSideBar';
import CharacterStore from '../store/CharacterStore';
import VariablesStore from '../store/VariablesStore';
import Modals from '../pages/MainEditor/Modals/Modals';


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
  let resuldDialogs
  let resultCharacters
  let resultVariables
  try {
    result = JSON.parse(args)
    resuldDialogs = result.dialogs
    resultCharacters = result.characters
    resultVariables = result.variables

  } catch (error) {
    console.log(error)
  }
  try {
    DialogsStore.setDialogs(resuldDialogs)
    CharacterStore.setCharacters(resultCharacters)
    VariablesStore.setVariables(resultVariables)
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
    // TODO: Сделать адекватное контекстное меню
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
      <Modals />
      <ContextMenu destiny={destiny} anchorPoint={anchorPoint} isOpen={contextMenuIsOpen} setOpen={setContextMenuIsOpen} />
      <header className="App-header">Отображаемый диалог:<b>{DialogsStore.getDialogName(DialogsStore.currentDialogId)}</b></header>
      <div style={{display:"flex", flexDirection:"row", height:"100%", overflow:"hidden"}}>
        <SideBar />
        <Flow />
        <RightSideBar />
      </div>
      <footer className="App-footer" />
    </div>
    </ReactFlowProvider>
  );
}

export default observer(App);
