import { makeAutoObservable } from 'mobx';
import ProjectsStore from '../Modal_myProj/ProjectsStore';

// declare global {
//   interface Window {
//       electron: {
//           getStoreValue: (key: string) => Promise<any>;
//           setStoreValue: (key: string, value: any) => void;
//       };
//   }
// }

class SaveModalStore {
  isOpen = false
  title = "Default project";
  description = 'Default description project';
  errorMessage = '';
  selectedProjectId = 0;

  constructor() {
    makeAutoObservable(this);
  }

  openModal() {
    this.isOpen = true;
  }

  setSelectedProjectId(projectId: number) {
    this.selectedProjectId = projectId;
  }

  closeModal() {
    this.isOpen = false;
    // this.title = ProjectsStore.getTitle();
    // this.description = '';
  }

  setDescription(description) {
    this.description = description;
  }

  setTitle(title) {
    this.title = title;
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }


  // eslint-disable-next-line class-methods-use-this
  // async saveProjectExample() {
  //   const token = await window.electron.getStoreValue('token');
  //     if (token) {
  //       const { id } = jwtDecode(token) as { id: number };
  //       const newProject = {
  //         title: "Example project",
  //         description: "",
  //         createdBy: id,
  //         jsonValue: {DialogsStore}
  //       }

  //       const response = await axios.post(`http://localhost:3000/api/v1/projects/`, newProject, {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           // 'Content-Type': 'application/json',
  //         }
  //       });
  //       if (response.data.status === 'success') {
  //         ProjectsStore.projects.push(response.data.data);
  //         const projectId =  response.data.data.id;
  //         return projectId;
  //         // console.log("Проект успешно сохранен!")
  //       }
  //     }
  //     return null;
  //   }

  // async saveProjectChanges() {
  //   try {
  //     let projectId = 0;
  //     if (this.selectedProjectId === 0)
  //       {
  //         projectId = await this.saveProjectExample()
  //       }
  //     else {
  //       projectId = await this.selectedProjectId;
  //     }
  //     const token = await window.electron.getStoreValue('token');
  //     const { id } = jwtDecode(token) as { id: number };
  //     const response2 = {
  //       dialogs: [] as Dialog[],
  //       characters : [] as Character[],
  //       variables : [] as Variable[]
  //     }
  //       DialogsStore.setDialogs(DialogsStore.dialogs)
  //       CharacterStore.setCharacters(CharacterStore.characters)
  //       VariablesStore.setVariables(VariablesStore.variables)

  //       const dialogs = DialogsStore.getDialogsForSave()
  //       response2.dialogs = dialogs
  //       response2.characters = CharacterStore.getCharactersForSave()
  //       response2.variables = VariablesStore.getVariablesForSave()
  //     // console.log("json:", JSON.stringify(response2, null, 2))

  //     if (token) {
  //       const response3 = await axios.get(`http://localhost:3000/api/v1/projects/${projectId}`, {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       });
  //       const save = response3.data.data;
  //       this.title = save.title;
  //       this.description = save.description;

  //       const Proj = {
  //         // id: projectId,
  //         title: this.title,
  //         description: this.description,
  //         createdBy: id,
  //         jsonValue: response2
  //       };
  //       console.log(this.title)
  //       console.log(this.description)
  //       console.log(id)
  //       const response = await axios.patch(`http://localhost:3000/api/v1/projects/${projectId}`, Proj, {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           // 'Content-Type': 'application/json'
  //         }
  //       });
  //       if (response.data.status === 'success') {
  //         console.log("ура")
  //         // this.closeModal()
  //       } else {
  //         console.error('Ошибка при получении деталей проекта:', response.data.message);
  //       }
  //       // this.closeModal();
  //     }
  //   } catch (error) {
  //     console.error('Ошибка при выполнении запроса:', error);
  //   }
  // }
}

export default new SaveModalStore();
