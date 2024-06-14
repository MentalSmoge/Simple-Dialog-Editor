/* eslint-disable camelcase */
// ProjectsStore.js
import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import DialogsStore from '../../../../store/DialogsStore';
import CharacterStore from '../../../../store/CharacterStore';
import VariablesStore from '../../../../store/VariablesStore';


declare global {
  interface Window {
      electron: {
          getStoreValue: (key: string) => Promise<any>;
          setStoreValue: (key: string, value: any) => void;
      };
  }
}

class ProjectsStore {
  projects = [];
  isOpen = false;
  title = '';
  description = '';
  errorMessage = '';
  currentProject = null;
  newProjectName = '';
  newProjectDescription = '';
  // json_proj = '';
  // mainWindow: BrowserWindow | null = null;

  addProject(project: any) {
    this.projects.push(project);
  }
  setNewProjectName(name: string) {
    this.newProjectName = name;
  }

  setNewProjectDescription(description: string) {
    this.newProjectDescription = description;
  }

  openModal() {
    this.isOpen = true;
    this.fetchProjects();
  }

  rebootModal() {
    this.currentProject = null;
  }


  closeModal() {
    this.isOpen = false;
    this.clearFields();
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  clearFields() {
    this.title = '';
    this.description = '';
    this.currentProject = null;
    this.clearErrorMessage();
  }

  constructor() {
    makeAutoObservable(this);
  }

  deleteProject(id: any) {
    this.projects = this.projects.filter(project => project.id !== id);
  }


  async fetchProjects() {
    try {
      const token = await window.electron.getStoreValue('token');
      if (token) {
        const { id } = jwtDecode(token) as { id: number };
        const response = await axios.get(`http://localhost:3000/api/v1/projects/?createdBy=${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.status === 'success') {
          this.projects = response.data.data;
        } else {
          console.error('Ошибка при получении проектов:', response.data.message);
        }
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  }

  async fetchProjectDetails(projectId: any) {
    try {
      const token = await window.electron.getStoreValue('token');
      if (token) {
        const response = await axios.get(`http://localhost:3000/api/v1/projects/${projectId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.status === 'success') {
          this.currentProject = response.data.data;
          const json_proj = response.data.data.jsonValue
          let result
          let resuldDialogs
          let resultCharacters
          let resultVariables
          try {
            result = json_proj
            console.log("json", result)

            resuldDialogs = result.dialogs
            resultCharacters = result.characters
            resultVariables = result.variables

            console.log(resuldDialogs)
            console.log(resultCharacters)
            console.log(resultVariables)
          } catch (error) {
            console.log(error)
          }
          try {
            // DialogsStore.getDialog(result.dialogs)
            // DialogsStore.saveCurrent()

            DialogsStore.setDialogs(resuldDialogs)
            CharacterStore.setCharacters(resultCharacters)
            VariablesStore.setVariables(resultVariables)
          } catch (error) {
            console.log(error)
          }
        } else {
          console.error('Ошибка при получении деталей проекта:', response.data.message);
        }
        this.closeModal();
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  }

  setCurrentProject(project: null) {
    this.currentProject = project;
  }

  async createNewProject() {
    if (!this.newProjectName) {
      console.error('Project name is required');
      return;
    }

    try {
      const token = await window.electron.getStoreValue('token');
      if (token) {
        const { id } = jwtDecode(token) as { id: number };
        const newProject = {
          title: this.newProjectName,
          description: this.newProjectDescription,
          createdBy: id,
          jsonValue: {DialogsStore}
          // Initialize other fields as necessary
        };

        const response = await axios.post(`http://localhost:3000/api/v1/projects/`, newProject, {
          headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'application/json',
          }
        });

        if (response.data.status === 'success') {
          this.projects.push(response.data.data);
          this.newProjectName = '';
          this.newProjectDescription= '';
          this.closeModal();
        } else {
          console.error('Ошибка при создании проекта:', response.data.message);
        }
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  }
}

export default new ProjectsStore();
