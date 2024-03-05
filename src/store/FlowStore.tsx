import { makeAutoObservable, set } from "mobx"
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  type XYPosition,
  useUpdateNodeInternals,
  Viewport,
} from 'reactflow';
import { nanoid } from 'nanoid';
import TextNode from "../Flow/Node_Types/TextNode";
import ChoiceNode from "../Flow/Node_Types/ChoiceNode";
import StaticEdge from "../Flow/Edge_Types/StaticEdge";
import { rowProps } from "../Flow/types";

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
};

const initialNodes: Node[] = [
  {
    id: '5',
    data: { text: 'This is text   das\n cool ass hat maaaan\n cool ass hat maaaan\n cool ass hat maaaan\n cool ass hat maaaan' },
    position: { x: 200, y: 200 },
    type: 'text',
  },
  {
    id: '6',
    data: {text: 'This is ыфы' },
    position: { x: 0, y: 200 },
    type: 'text',
  },
  {
    id: '9',
    data: { rows: [{
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
    }], increment: 1 },
    position: { x: 0, y: -100 },
    type: 'choice',
  },
];

const initialEdges: Edge[] = [
  // { id: 'e1-2', source: '5', target: '6' },
  // { id: 'e2-3', source: '6', target: '9' },
];
class FlowStore {

  nodeTypes = {
    text: TextNode,
    choice : ChoiceNode
  };

  edgeTypes = {
    'static-edge': StaticEdge
  }

  nodes = initialNodes

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

  // onConnect(params: Connection | Edge) {
  //   const edge = { ...params, type: 'static-edge' };
  //   this.setEdges(this.edges.concat(edge))
  // }

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
      newNode.data.text = ""
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

  getNode(nodeId : string) {
    return this.nodes.filter(node => node.id === nodeId)[0]
  }

  deleteRow(nodeId : string, Id : number) {
    const result = this.edges.filter(item => item.source !== nodeId || item.sourceHandle !== `handle-${Id}`);
    this.setEdges(result);
    this.getNode(nodeId).data.rows = (this.getNode(nodeId).data.rows.filter(a => a.idOfRow !== Id))

  };

  changeVar(nodeId : string, Id : number, varType : String, newValue : { value: string, label: string }) {
    switch (varType) {
      case "first":
        this.getNode(nodeId).data.rows.filter(item => item.idOfRow === Id)[0].data.firstVar = newValue;
        break;
      case "second":
        this.getNode(nodeId).data.rows.filter(item => item.idOfRow === Id)[0].data.secondVar = newValue;
        break;
      case "third":
        this.getNode(nodeId).data.rows.filter(item => item.idOfRow === Id)[0].data.thirdVar = newValue;
        break;

      default:
        break;
    }
  }

  updateTextInNode(nodeId: string, text : string) {
    this.nodes.filter(node => node.id === nodeId)[0].data.text = text
  }

  constructor(){
    makeAutoObservable(this, {}, { autoBind: true })
  }

  getFlow() {
    return {nodes: this.nodes, edges: this.edges}
  }
}

export default new FlowStore()
