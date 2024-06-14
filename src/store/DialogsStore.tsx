import { makeAutoObservable } from "mobx"
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import FlowStore from "../pages/MainEditor/components/EditorField/FlowStore"


type Dialog = {
  id : number, name: string, reactflowInstance : object
}

const startNode = {
  "id": "start_node",
  "position": {
    "x": 0,
    "y": 0
  },
  "type": "start",
  "deletable": false
}

const initialDialogs = [
  {
    "id": 1,
    "name": "Example Dialog",
    "reactflowInstance": {
      "nodes": [
        {
          "id": "start_node",
          "position": {
            "x": 0,
            "y": 0
          },
          "type": "start",
          "deletable": false,
          "width": 100,
          "height": 58
        },
        {
          "id": "5",
          "data": {
            "text": "Привет, Ева! Меня зовут Адам, приятно познакомиться.",
            "portrait": "",
            "character": {
              "id": 1
            }
          },
          "position": {
            "x": 250,
            "y": -50
          },
          "type": "text",
          "width": 222,
          "height": 259,
          "selected": false,
          "positionAbsolute": {
            "x": 250,
            "y": -50
          },
          "dragging": false
        },
        {
          "id": "6",
          "data": {
            "text": "И тебе не хворать, Адам.",
            "portrait": "",
            "character": {
              "id": 2
            }
          },
          "position": {
            "x": 925,
            "y": -175
          },
          "type": "text",
          "width": 222,
          "height": 259,
          "positionAbsolute": {
            "x": 925,
            "y": -175
          },
          "selected": false,
          "dragging": false
        },
        {
          "id": "9",
          "data": {
            "rows": [
              {
                "idOfRow": 0,
                "data": {
                  "secondVar": {
                    "value": ">",
                    "label": ">"
                  },
                  "firstVar": {
                    "id": 4,
                    "value": "Очень длинная переменная",
                    "label": "Настроение"
                  },
                  "thirdVar": {
                    "label": "20",
                    "value": "20",
                    "__isNew__": true
                  }
                }
              },
              {
                "idOfRow": 1,
                "data": {
                  "secondVar": {
                    "value": "<",
                    "label": "<"
                  },
                  "firstVar": {
                    "id": 4,
                    "value": "Очень длинная переменная",
                    "label": "Настроение"
                  },
                  "thirdVar": {
                    "label": "21",
                    "value": "21",
                    "__isNew__": true
                  }
                }
              }
            ],
            "increment": 1
          },
          "position": {
            "x": 600,
            "y": 25
          },
          "type": "choice",
          "width": 319,
          "height": 153,
          "positionAbsolute": {
            "x": 600,
            "y": 25
          },
          "selected": false,
          "dragging": false
        },
        {
          "id": "BRvkf675Jazm4ZDQVM-Qc",
          "position": {
            "x": 975,
            "y": 125
          },
          "data": {
            "text": "Не мешайся под ногами, Адам!",
            "character": {
              "id": 2
            },
            "portrait": ""
          },
          "type": "text",
          "width": 222,
          "height": 259,
          "selected": false,
          "positionAbsolute": {
            "x": 975,
            "y": 125
          },
          "dragging": false
        }
      ],
      "edges": [
        {
          "animated": true,
          "markerEnd": {
            "type": "arrowclosed"
          },
          "source": "start_node",
          "sourceHandle": null,
          "target": "5",
          "targetHandle": null,
          "type": "static-edge",
          "id": "reactflow__edge-start_node-5"
        },
        {
          "animated": true,
          "markerEnd": {
            "type": "arrowclosed"
          },
          "source": "5",
          "sourceHandle": null,
          "target": "9",
          "targetHandle": null,
          "type": "static-edge",
          "id": "reactflow__edge-5-9"
        },
        {
          "animated": true,
          "markerEnd": {
            "type": "arrowclosed"
          },
          "source": "9",
          "sourceHandle": "handle-0",
          "target": "6",
          "targetHandle": null,
          "type": "static-edge",
          "id": "reactflow__edge-9handle-0-6"
        },
        {
          "animated": true,
          "markerEnd": {
            "type": "arrowclosed"
          },
          "source": "9",
          "sourceHandle": "handle-1",
          "target": "BRvkf675Jazm4ZDQVM-Qc",
          "targetHandle": null,
          "type": "static-edge",
          "id": "reactflow__edge-9handle-1-BRvkf675Jazm4ZDQVM-Qc"
        }
      ]
    }
  }
] as Dialog[]

class DialogsStore {

  newIdCounter = 2

  dialogs = initialDialogs as Dialog[]

  currentDialogId = 1

  currentProjectId = 0;

  constructor(){
    makeAutoObservable(this)
    // this.fetchAndSetDialogs()
    const flow = this.getDialog(this.currentDialogId).reactflowInstance;
      if (flow) {
        FlowStore.setNodes(flow.nodes || []);
        FlowStore.setEdges(flow.edges || []);
      }
  }

  setCurrentProjectId(id: number) {
    this.currentProjectId = id;
  }



  // Изменение: Новый метод для получения и объединения диалогов
  // async fetchAndSetDialogs() {
  //   try {
  //     const token = await window.electron.getStoreValue('token');

  //     if (token) {
  //       // Декодирование токена для получения идентификатора пользователя
  //       const { id } = jwtDecode(token) as { id: number };

  //       // Выполнение запроса к серверу для получения проектов
  //       const response = await axios.get(`http://localhost:3000/api/v1/projects/?createdBy=${id}`, {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       });

  //       // Проверка успешности ответа от сервера
  //       if (response.data.status === 'success') {
  //         // Фильтрация проектов для текущего пользователя (который создал проект)
  //         const fetchedDialogs = response.data.data.map(project => ({
  //           id: project.id,
  //           name: project.title, // Используйте поле title в качестве имени диалога
  //         }));
  //         // Обновление состояния диалогов
  //         this.dialogs = [...this.dialogs, ...fetchedDialogs];
  //         this.setDialogs(this.dialogs);
  //       } else {
  //         console.error('Ошибка при получении диалогов:', response.data.message);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Ошибка при выполнении запроса:', error);
  //   }
  // }

  saveCurrent() {
    this.getDialog(this.currentDialogId).reactflowInstance = FlowStore.getFlow();
  }

  changeDialog(toId : number) {
    this.getDialog(this.currentDialogId).reactflowInstance = FlowStore.getFlow();
    const flow = this.getDialog(toId).reactflowInstance;

      if (flow) {
        FlowStore.setNodes(flow.nodes || []);
        FlowStore.setEdges(flow.edges || []);
      }
      this.currentDialogId = toId
  }

  changeDialogWithoutSave(toId : number) {
    const flow = this.getDialog(toId).reactflowInstance;

      if (flow) {
        FlowStore.setNodes(flow.nodes || []);
        FlowStore.setEdges(flow.edges || []);
      }
      this.currentDialogId = toId
  }

  addDialog(name : string) {
    this.newIdCounter += 1
    const dialog = {
      id : this.newIdCounter,
      name,
      reactflowInstance: {
        "nodes":[
          startNode
        ],
        "edges":[

        ],
        "viewport":{
           "x":0,
           "y":0,
           "zoom":1,
        }
     }
    }
    this.dialogs.push(dialog)
  }

  deleteDialog(dialogId : number) {
    const result = this.dialogs.filter(dialog => dialog.id !== dialogId);
    this.dialogs = result
    if (this.dialogs.length <= 0) {
      this.addDialog("New Dialog")
    }
    if (this.currentDialogId === dialogId) {
      this.changeDialogWithoutSave(this.dialogs[0].id)
    }
  }

  renameDialog(dialogId : number, newName : string) {
    this.dialogs.filter(dialog => dialog.id === dialogId)[0].name = newName
  }

  getDialog(dialogId : number) {
    return this.dialogs.filter(dialog => dialog.id === dialogId)[0]
  }

  getDialogName(dialogId : number) {
    return this.dialogs.filter(dialog => dialog.id === dialogId)[0]?.name
  }

  setDialogs(dialogs: Dialog[]) {
    if (dialogs === undefined) {
      console.log("Error")
      return
    }
    this.dialogs = dialogs
    const flow = this.getDialog(dialogs[0].id).reactflowInstance;

      if (flow) {
        FlowStore.setNodes(flow.nodes || []);
        FlowStore.setEdges(flow.edges || []);
      }
      this.currentDialogId = dialogs[0].id
  }

  getDialogsForSave() {
    this.saveCurrent()
    return this.dialogs
  }

  getDialogsForExport() {
    this.saveCurrent()
    const returnDialogs = []
    const copyDialogs = this.dialogs as Dialog[]
    // eslint-disable-next-line array-callback-return
    copyDialogs.map(dialog => {
      const copyDialog = {
        "id": dialog.id,
        "name": dialog.name,
        "nodes" : [],
        "edges" : []
      }
      dialog.reactflowInstance.nodes.map(node => {
        const copyNode = {
          "id": node.id,
          "data": node.data,
          "type": node.type
        }
        copyDialog.nodes.push(copyNode)
      })
      dialog.reactflowInstance.edges.map(edge => {
        const copyEdge = {
          "source": edge.source,
          "sourceHandle": edge.sourceHandle,
          "target": edge.target,
          "targetHandle": edge.targetHandle,
        }
        copyDialog.edges.push(copyEdge)
      })
      returnDialogs.push(copyDialog)
    })

    returnDialogs.map(dialog => (
      dialog.nodes.map(node => {
        const edges = dialog.edges.filter(e => e.source === node.id);
        if (edges.length > 0) {
          if (node.type !== "choice" && node.type !== "playerChoice" )
          {
            node.next = edges[0].target
          }
          else {
            const options = []
            node.data.rows.forEach(row => {
              const edge = edges.filter(ed => ed.sourceHandle === (`handle-${row.idOfRow}`));
              if (edge.length > 0) {
                console.log(row)
                if (node.type === "choice") {
                  options.push(
                    {
                      first: row.data.firstVar?.label,
                      second: row.data.secondVar?.label,
                      third: row.data.thirdVar?.label,
                      next: edge[0].target
                    }
                  )
                }
                if (node.type === "playerChoice") {
                  options.push(
                    {
                      text: row.data.text,
                      next: edge[0].target
                    }
                  )
                }
              }
            });
            node.data = {
              options
            }
          }
        }
        else
        if (node.type === 'choice' || node.type === 'playerChoice') {
            const options = []
            node.data = {
              options
            }

          }
      })
    ))
    const updatedArray = returnDialogs.map(obj => {
      const { edges, ...newObj } = obj;
      return newObj;
    });

    return updatedArray
  }

  deleteCharacterFromDialogs(characterId : number) {
    this.dialogs.forEach(dialog => {
      dialog.reactflowInstance.nodes.forEach(node => {
        if (node?.data?.character?.id === characterId) {
          delete node.data.character
        }
      });
    });

    FlowStore.getFlow().nodes.forEach(node => {
      if (node?.data?.character?.id === characterId) {
        delete node.data.character
      }
    });
  }

  deleteVarFromDialogs(varId : number) {
    this.dialogs.forEach(dialog => {
      dialog.reactflowInstance.nodes.forEach(node => {
        node?.data?.rows?.forEach(row => {
          if (row?.data?.firstVar?.id === varId) {
            row.data.firstVar = null
          }
          if (row?.data?.thirdVar?.id === varId) {
            row.data.thirdVar = null
          }

        })
      });
    });

    FlowStore.getFlow().nodes.forEach(node => {
      node?.data?.rows?.forEach(row => {
        if (row?.data?.firstVar?.id === varId) {
          delete row.data.firstVar
        }
        if (row?.data?.secondVar?.id === varId) {
          delete row.data.secondVar
        }

      })
    });
  }
}

export default new DialogsStore()
