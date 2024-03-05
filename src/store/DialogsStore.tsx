import { makeAutoObservable } from "mobx"
import FlowStore from "./FlowStore"

type Dialog = {
  id : number, name: string, reactflowInstance : object
}

const initialDialogs = [
  {
    id : 1,
    name: "Dialog 1",
    reactflowInstance: {
      "nodes":[
         {
            "id":"5",
            "data":{
               "text":"This is text   das\n cool ass hat maaaan\n cool ass hat maaaan\n cool ass hat maaaan\n cool ass hat maaaan"
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
               "text":"This is ыфы"
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


  dialogs = initialDialogs

  currentDialogId = 1

  constructor(){
    makeAutoObservable(this)
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

  addDialog(dialog : Dialog) {
    this.dialogs.push(dialog)
  }

  deleteDialog(dialogId : number) {
    const result = this.dialogs.filter(dialog => dialog.id !== dialogId);
    this.dialogs = result
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
}

export default new DialogsStore()
