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

  dialogs = initialDialogs

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

  getDialogsForExport() {
    this.saveCurrent()
    return this.dialogs
  }
}

export default new DialogsStore()
