import { ReactFlowProvider } from 'reactflow';
import { MouseEvent, SetStateAction, useState, useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import { jwtDecode } from "jwt-decode";
import Flow from '../pages/MainEditor/components/EditorField';

import './App.css';
import { SideBar, SideBar2 } from '../pages/MainEditor/components/SideBar';
import ContextMenu from '../pages/MainEditor/components/ContextMenu';
import DialogsStore from '../store/DialogsStore';
import RightSideBar from '../pages/MainEditor/components/RightSideBar';
import CharacterStore, { Character } from '../store/CharacterStore';
import VariablesStore, { Variable } from '../store/VariablesStore';
import Modals from '../pages/MainEditor/Modals/Modals';
import { Dialog } from '../Flow/types';

import AuthModalStore from '../pages/MainEditor/Modals/Modal_Login/AuthModalStore';
import RegisterModalStore from '../pages/MainEditor/Modals/Modal_Register/RegisterModalStore';

import ProjectsStore from '../pages/MainEditor/Modals/Modal_myProj/ProjectsStore';
import NewProjectModalStore from '../pages/MainEditor/Modals/Modal_AddProj/NewProjectModalStore';
import SaveStore from '../pages/MainEditor/Modals/Modal_saveProj/SaveStore';

declare global {
  interface Window {
      electron: {
          getStoreValue: (key: string) => Promise<any>;
          setStoreValue: (key: string, value: any) => void;
      };
  }
}

// const jwt = require('jsonwebtoken');
window.electron.myprojectsget(() => {
  ProjectsStore.openModal();
})
window.electron.addnewproj(() => {
  NewProjectModalStore.openModal();
  // ProjectsStore.openModal();
})

window.electron.onLogin(() => {
  // window.electron.getStoreValue('token');
  AuthModalStore.openModal();
})

window.electron.onRegister(() => {
  RegisterModalStore.openModal();
})

async function extractToken() {
  const token = await window.electron.getStoreValue('token');
  // window.electron.getStoreValue('token');
  if (!token) {
    return null;
  }

  try {
    const { username } = jwtDecode(token) as { username: string };
    // console.log("Имя пользователя из токена:", username);
    return username;
  } catch (error) {
    // console.error('Ошибка при декодировании токена:', error);
    return null;
  }
}

window.electron.onSaveFile(() => {
  const response = {
    dialogs: [] as Dialog[],
    characters : [] as Character[],
    variables : [] as Variable[]
  }
  const dialogs = DialogsStore.getDialogsForSave()
  response.dialogs = dialogs
  response.characters = CharacterStore.getCharactersForSave()
  response.variables = VariablesStore.getVariablesForSave()
  console.log(JSON.stringify(response, null, 2))
  window.electron.saveFile(JSON.stringify(response, null, 2))
})


window.electron.onExportFile(() => {
  const response = {
    dialogs: [] as Dialog[],
    characters : [] as Character[],
    variables : [] as Variable[]
  }
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

window.electron.onProjectOpen((args : string) => {
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
  const [username, setUsername] = useState("");
  const [contextMenuIsOpen, setContextMenuIsOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [destiny, setDestiny] = useState("");
  const openContextMenu = (e: MouseEvent<HTMLDivElement>, newDestiny: SetStateAction<string>) => {
    e.preventDefault();
    setDestiny(newDestiny)
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    setContextMenuIsOpen(true);
  }

  useEffect(() => {
    async function fetchUsernameAndDialogs() {
      try {
        const extractedUsername = await extractToken();
        if (extractedUsername !== null) {
          setUsername(extractedUsername);
          //await DialogsStore.fetchAndSetDialogs();

      }
      } catch (error) {
        console.error('Ошибка при получении имени пользователя:', error);
      }
    }
    fetchUsernameAndDialogs();
  },[]);



  return (
    <ReactFlowProvider>
    <div className="App"
    // TODO: Сделать адекватное контекстное меню
      onContextMenu={ (e: MouseEvent<HTMLDivElement>) => {
            const classlist = (e.target as HTMLElement).classList;
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
      {username ? (
              <header className="App-header">
              <p>Проект:
                <b>{SaveStore.title}</b>
              </p>
          </header>
      ):(
        <header className="App-header">
        <p>Чтобы увидеть свои проекты, войдите в аккаунт или зарегистрируйтесь!</p>
        </header>
      )}
      <header className="App-header">
          <p>Отображаемый диалог:
            <b>{DialogsStore.getDialogName(DialogsStore.currentDialogId)}</b>
          </p>
      </header>
      <div style={{display:"flex", flexDirection:"row", height:"100%", overflow:"hidden"}}>
        {username ? (
          <>
            <SideBar />
            <Flow />
            <RightSideBar />
          </>
        ):(
          <>
            <SideBar2 />
            <Flow />
            <RightSideBar />
          </>
        )}
      </div>
      <footer className="App-footer" />
    </div>
    </ReactFlowProvider>
  );
}

export default observer(App);
