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
window.electron.onSaveFile(() => {
  const response = {dialogs : []}
  // const responce = reactflow.toObject()
  DialogsStore.dialogs.forEach(dialog => {
    response.dialogs.push(dialog)
  });
  console.log(JSON.stringify(response))
  // const responce = JSON.stringify(reactflow.toObject())
  window.electron.saveFile(JSON.stringify(response))
})
window.electron.onProjectOpen((args) => {
  console.log('got FILE_OPEN', args)
  let result
  try {
    result = JSON.parse(args).dialogs

  } catch (error) {
    console.log(error)
  }
  DialogsStore.setDialogs(result)
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
          }}>
      <DeleteModal />
      <RenameModal />
      <AddDialogModal />
      <ContextMenu destiny={destiny} anchorPoint={anchorPoint} isOpen={contextMenuIsOpen} setOpen={setContextMenuIsOpen} />
      <header className="App-header">React Flow - CRA Example</header>
      {/* <FpsView/> */}
      <div style={{display:"flex", flexDirection:"row", height:"100%"}}>
        <SideBar />
        <Flow />

      </div>
      <TextEditorView />
      <footer className="App-footer">React Flow - CRA Example</footer>
    </div>
    </ReactFlowProvider>
  );
}

export default App;
