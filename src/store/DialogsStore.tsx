import { makeAutoObservable } from "mobx"
import FlowStore from "./FlowStore"

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
    id : 1,
    name: "Dialog 1",
    reactflowInstance: {
      "nodes":[
        startNode,
         {
            "id":"5",
            "data":{
               "text":"Это достаточно длинный последовательный осмысленный текст. Эта реплика такая длинная, что тот, кто писал её, засыпал несколько раз в процессе. Говорят, что если прочитать эту реплику семь раз стоя на одной ноге, то можно достичь тайн мироздания. А еще говорят, что лучше бы я так много писал в курсовую работу, нежели сюда.",
               "portrait": ""
            },
            "position":{
               "x":275,
               "y":75
            },
            "type":"text",
            "width":234,
            "height":132,
            "selected":false,
            "positionAbsolute":{
               "x":275,
               "y":75
            },
            "dragging":false
         },
         {
            "id":"6",
            "data":{
               "text":"Это короткая реплика",
               "portrait": ""
            },
            "position":{
               "x":0,
               "y":200
            },
            "type":"text",
            "width":234,
            "height":106,
            "positionAbsolute":{
               "x":0,
               "y":200
            }
         },
         {
            "id":"9",
            "data":{
               "rows":[
                  {
                     "idOfRow":0,
                     "data":{
                        "secondVar":{
                           "value":"=",
                           "label":"="
                        }
                     }
                  },
                  {
                     "idOfRow":1,
                     "data":{
                        "secondVar":{
                           "value":"=",
                           "label":"="
                        }
                     }
                  }
               ],
               "increment":1
            },
            "position":{
               "x":0,
               "y":-100
            },
            "type":"choice",
            "width":254,
            "height":202,
            "positionAbsolute":{
               "x":0,
               "y":-100
            }
         }
      ],
      "edges":[

      ],
      "viewport":{
         "x":288.56754915320226,
         "y":309.20731944714817,
         "zoom":1.378236324703134
      }
   }
  },
  {
    id : 2,
    name: "Dialog 2",
    reactflowInstance: {
      "nodes":[
        startNode,

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
] as Dialog[]

class DialogsStore {

  newIdCounter = 2

  dialogs = initialDialogs as Dialog[]

  currentDialogId = 1

  constructor(){
    makeAutoObservable(this)
    const flow = this.getDialog(this.currentDialogId).reactflowInstance;
      if (flow) {
        FlowStore.setNodes(flow.nodes || []);
        FlowStore.setEdges(flow.edges || []);
      }
  }

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
    let returnDialogs = []
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
          if (node.type !== "choice")
          {
            node.next = edges[0].target
          }
          else {
            const options = []
            node.data.rows.forEach(row => {
              const edge = edges.filter(ed => ed.sourceHandle === (`handle-${row.idOfRow}`));
              if (edge.length > 0) {
                console.log(row)
                options.push(
                  {
                    first: row.data.firstVar?.label,
                    second: row.data.secondVar?.label,
                    third: row.data.thirdVar?.label,
                    next: edge[0].target
                  }
                )
              }
            });
            node.data = {
              options
            }
          }
        }
        else
        if (node.type === 'choice') {
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
