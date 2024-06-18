/* eslint-disable camelcase */
// ProjectsStore.js
import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import DialogsStore from '../../../../store/DialogsStore';
import CharacterStore, { Character } from '../../../../store/CharacterStore';
import VariablesStore, { Variable } from '../../../../store/VariablesStore';
import { Dialog } from '../../../../Flow/types';
// eslint-disable-next-line import/no-cycle
import SaveStore from '../Modal_saveProj/SaveStore';


declare global {
  interface Window {
      electron: {
          getStoreValue: (key: string) => Promise<any>;
          setStoreValue: (key: string, value: any) => void;
      };
  }
}

export function updateSaveStore(title, description) {
  SaveStore.setTitle(title);
  SaveStore.setDescription(description);
}

class ProjectsStore {
  projects = [];
  isOpen = false;
  title = '';
  description = '';
  errorMessage = '';
  currentProject: any;
  newProjectName = 'default';
  newProjectDescription = '';
  selectedProjectId = 0;
  hasUnsavedChanges = false; // флаг для проверки сохранения изменений

  setUnsavedChanges(status) {
    this.hasUnsavedChanges = status;
  }

  setSelectedProjectId(projectId: number) {
    this.selectedProjectId = projectId;
  }

  getSelectedProjectId() {
    return this.selectedProjectId;
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

  getTitle() {
    return this.title;
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

  async deleteProject() {
    const projectId = this.selectedProjectId; // get id project
    try {
      const token = await window.electron.getStoreValue('token');
      if (token) {
        const response = await axios.delete(`http://localhost:3000/api/v1/projects/${projectId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.status === 'success') {
          DialogsStore.getDefaultDialog()
          CharacterStore.getDefaultCharacters()
          VariablesStore.getDefaultCharacter()
          SaveStore.title = "Default project"
          SaveStore.title = ""
          // this.openModal();
          // window.location.reload();
          // console.log('Проект успешно удален');
        } else {
          console.error('Ошибка при удалении проекта:', response.data.message);
        }
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
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
          this.title = this.currentProject.title;
          console.log(this.title)
          // Save
          this.description = this.currentProject.description;
          console.log(this.description)

          updateSaveStore(this.title, this.description);

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


  async saveProjectExample(title_new: string, description_new: string) {
    const token = await window.electron.getStoreValue('token');
      if (token) {
        const { id } = jwtDecode(token) as { id: number };
        const newProject = {
          title: title_new,
          description: description_new,
          createdBy: id,
          jsonValue: {DialogsStore}
        }

        const response = await axios.post(`http://localhost:3000/api/v1/projects/`, newProject, {
          headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'application/json',
          }
        });
        if (response.data.status === 'success') {
          this.projects.push(response.data.data);
          const projectId =  response.data.data.id;
          return projectId;
          // console.log("Проект успешно сохранен!")
        }
      }
      return null;
    }

  async saveProjectChanges(title_new: string, description_new: string) {
    try {
      let projectId = 0;
      if (this.selectedProjectId === 0)
        {
          projectId = await this.saveProjectExample(title_new, description_new)
        }
      else {
        projectId = await this.selectedProjectId;
      }
      const token = await window.electron.getStoreValue('token');
      const { id } = jwtDecode(token) as { id: number };
      const response2 = {
        dialogs: [] as Dialog[],
        characters : [] as Character[],
        variables : [] as Variable[]
      }
        DialogsStore.setDialogs(DialogsStore.dialogs)
        CharacterStore.setCharacters(CharacterStore.characters)
        VariablesStore.setVariables(VariablesStore.variables)

        const dialogs = DialogsStore.getDialogsForSave()
        response2.dialogs = dialogs
        response2.characters = CharacterStore.getCharactersForSave()
        response2.variables = VariablesStore.getVariablesForSave()
      // console.log("json:", JSON.stringify(response2, null, 2))

      if (token) {
        this.title = title_new;
        this.description = description_new;


        const Proj = {
          // id: projectId,
          title: this.title,
          description: this.description,
          createdBy: id,
          jsonValue: response2
        };
        console.log(this.title)
        console.log(this.description)
        console.log(id)
        const response = await axios.patch(`http://localhost:3000/api/v1/projects/${projectId}`, Proj, {
          headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'application/json'
          }
        });
        if (response.data.status === 'success') {
          console.log("ура")
          // this.closeModal()
        } else {
          console.error('Ошибка при получении деталей проекта:', response.data.message);
        }
        // this.closeModal();
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  }
}

export default new ProjectsStore();
