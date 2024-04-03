import { makeAutoObservable } from "mobx"
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type XYPosition,
  Viewport,
} from 'reactflow';
import { nanoid } from 'nanoid';

import {NodeBranch, NodePlayerChoice, NodeStart, NodeText} from "../../Nodes/index"
import StaticEdge from "../../EdgeTypes/Edge_Static/StaticEdge";
import { playerChoiceRowProps, rowProps } from "../../../../Flow/types";

const initialEdges: Edge[] = [];
class FlowStore {
  nodeTypes = {
    text: NodeText,
    choice : NodeBranch,
    start : NodeStart,
    playerChoice : NodePlayerChoice,
  };

  edgeTypes = {
    'static-edge': StaticEdge
  }

  nodes = [] as Node[]

  edges = initialEdges

  viewport = {x : 0, y : 0, zoom : 5} as Viewport

  onNodesChange(changes: NodeChange[]) {
    this.nodes = applyNodeChanges(changes, this.nodes)
  }

  onEdgesChange(changes: EdgeChange[]) {
    this.edges = applyEdgeChanges(changes, this.edges)
  }

  onConnect(connection: Connection) {
    const edge = { ...connection, type: 'static-edge' };
    this.edges = addEdge(edge, this.edges)
  }

  setNodes(nodes: Node[]) {
    this.nodes = nodes
  }

  setEdges(edges: Edge[]) {
    this.edges = edges
  }

  setViewport(viewport: Viewport) {
    this.viewport = viewport;
  }

  addNode(position : XYPosition, nodeType : string) {
    const newNode = {
      id: nanoid(),
      position,
      data: {},
      type: nodeType,
    };
    if (nodeType === "text") {
      newNode.data = {text:""}
    }
    if (nodeType === "choice") {
      newNode.data = { rows: [{
        idOfRow: 0,
        data: {
          firstVar: undefined,
          secondVar: { value: '=', label: '=' },
          thirdVar: undefined
        }
      }, {
        idOfRow: 1,
        data: {
          firstVar: undefined,
          secondVar: { value: '=', label: '=' },
          thirdVar: undefined
        }
      }], increment: 1 }
    }
    if (nodeType === "playerChoice") {
      newNode.data = { rows: [{
        idOfRow: 0,
        data: {
          text: ""
        }
      }], increment: 1 }
    }

    this.setNodes(this.nodes.concat(newNode))
  }

  addRow (nodeId : string) {
    this.getNode(nodeId).data.increment += 1
    const {increment} = this.getNode(nodeId).data
    const newElement : rowProps = {
      idOfRow: increment,
      data: {
        firstVar: undefined,
        secondVar: { value: '=', label: '=' },
        thirdVar: undefined
      }
    };
    this.getNode(nodeId).data.rows.push(newElement)
  }

  addPlayerChoiceRow (nodeId : string) {
    this.getNode(nodeId).data.increment += 1
    const {increment} = this.getNode(nodeId).data
    const newElement : playerChoiceRowProps = {
      idOfRow: increment,
      data: {
        text: ""
      }
    };
    this.getNode(nodeId).data.rows.push(newElement)
  }

  getNode(nodeId : string) {
    return this.nodes.filter(node => node.id === nodeId)[0]
  }

  deleteRow(nodeId : string, Id : number) {
    const result = this.edges.filter(item => item.source !== nodeId || item.sourceHandle !== `handle-${Id}`);
    this.setEdges(result);
    this.getNode(nodeId).data.rows = (this.getNode(nodeId).data.rows.filter(row => row.idOfRow !== Id))

  };

  changeVar(nodeId : string, Id : number, varType : String, newValue : { value: string, label: string }) {
    switch (varType) {
      case "first":
        this.getNode(nodeId).data.rows.filter(row => row.idOfRow === Id)[0].data.firstVar = newValue;
        break;
      case "second":
        this.getNode(nodeId).data.rows.filter(row => row.idOfRow === Id)[0].data.secondVar = newValue;
        break;
      case "third":
        this.getNode(nodeId).data.rows.filter(row => row.idOfRow === Id)[0].data.thirdVar = newValue;
        break;

      default:
        break;
    }
  }

  updateTextInNode(nodeId: string, text : string) {
    this.nodes.filter(node => node.id === nodeId)[0].data.text = text
  }

  updateTextInPlayerChoiceNode(nodeId: string, rowId: number, text : string) {
    this.nodes.filter(node => node.id === nodeId)[0].data.rows.filter(row => row.idOfRow === rowId)[0].data.text = text
  }

  updateCharacterInNode(nodeId: string, characterId : number | undefined) {
    if (characterId === undefined) {
      this.nodes.filter(node => node.id === nodeId)[0].data.character = undefined
      return
    }
    this.nodes.filter(node => node.id === nodeId)[0].data.character = {id : characterId}
  }

  updatePortraitInNode(nodeId: string, portrait : string) {
    this.nodes.filter(node => node.id === nodeId)[0].data.portrait = portrait
  }

  constructor(){
    makeAutoObservable(this, {}, { autoBind: true })
  }

  getFlow() {
    return {nodes: this.nodes, edges: this.edges}
  }
}

export default new FlowStore()
