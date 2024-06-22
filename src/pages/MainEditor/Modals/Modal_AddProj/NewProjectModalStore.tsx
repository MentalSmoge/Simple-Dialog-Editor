import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import DialogsStore from '../../../../store/DialogsStore';
import FlowStore from '../../components/EditorField/FlowStore';
import CharacterStore from '../../../../store/CharacterStore';
import VariablesStore from '../../../../store/VariablesStore';
// import DialogsStore from '../../../../store/DialogsStore';
// import ProjectsStore from '../Modal_myProj/ProjectsStore';

declare global {
  interface Window {
      electron: {
          getStoreValue: (key: string) => Promise<any>;
          setStoreValue: (key: string, value: any) => void;
      };
  }
}

class NewProjectModalStore {
  isOpen = false;
  newProjectName = '';
  newProjectDescription = '';
  errorMessage = '';

  constructor() {
    makeAutoObservable(this);
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.clearFields();
  }

  setNewProjectName(name: string) {
    this.newProjectName = name;
  }

  setNewProjectDescription(description: string) {
    this.newProjectDescription = description;
  }

  async createNewProject() {
    try {
      const token = await window.electron.getStoreValue('token');
      if (token) {
        const { id } = jwtDecode(token) as { id: number };

        // DialogsStore.dialogs.push(flow)
        const responser = {
          dialogs: [] as Dialog[],
          characters : [] as Character[],
          variables : [] as Variable[]
        }
        const dialogs = DialogsStore.getDefaultDialog()
        responser.dialogs = dialogs
        responser.characters = CharacterStore.getDefaultCharacters()
        responser.variables = VariablesStore.getDefaultCharacter()

        const newProject = {
          title: this.newProjectName,
          description: this.newProjectDescription,
          createdBy: id,
          jsonValue: responser
        };

        const response = await axios.post(`http://localhost:3000/api/v1/projects/`, newProject, {
          headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'application/json',
          },
        });

        if (response.data.status === 'success') {
          // ProjectsStore.addProject(response.data.data);
          // Optionally handle success action (e.g., close modal, update state)
          this.closeModal();
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage = 'Add fail!'}
      }
    }

  clearFields() {
    this.newProjectName = '';
    this.newProjectDescription = '';
    this.errorMessage ='';
  }
}

export default new NewProjectModalStore();
