import { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type Node,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  useReactFlow,
  Position,
  XYPosition,
} from 'reactflow';

import TextNode from './Node_Types/TextNode';
import ChoiceNode from './Node_Types/ChoiceNode';

// this is important! You need to import the styles from the lib to make it work
import 'reactflow/dist/style.css';

import './Flow.css';
import StaticEdge from './Edge_Types/StaticEdge';
import AddNodeContextMenu from './Components/AddNodeContextMenu';
import { nanoid } from 'nanoid';
// import TextEditorStore from '../store/TextEditorStore';

const nodeTypes = {
  text: TextNode,
  choice : ChoiceNode
};
const edgeTypes = {
  'static-edge': StaticEdge
}

const initialNodes: Node[] = [
  {
    id: '5',
    data: { label: 'Node 5', text: 'This is text   das\n cool ass hat maaaan\n cool ass hat maaaan\n cool ass hat maaaan\n cool ass hat maaaan' },
    position: { x: 200, y: 200 },
    type: 'text',
  },
  {
    id: '6',
    data: { label: 'Node 6', text: 'This is ыфы' },
    position: { x: 0, y: 200 },
    type: 'text',
  },
  {
    id: '9',
    data: { label: 'Node 6', text: 'This is ыфы' },
    position: { x: 0, y: -100 },
    type: 'choice',
  },
];


const initialEdges: Edge[] = [];

function Flow() {
  // Для контекстного меню
  const [isOpen, setOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  //
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactflow = useReactFlow()
  const onConnect = useCallback(
    (params: Connection | Edge) => {
      const edge = { ...params, type: 'static-edge' };
      setEdges((eds) => addEdge(edge, eds))
    },
    [setEdges],
  );

  const addNode = useCallback((pos, nodeType) => {
    const position = reactflow.screenToFlowPosition({
      x: pos.x,
      y: pos.y,
    });
    const newNode = {
      id: nanoid(),
      position,
      data: {},
      type: nodeType,
    };

    setNodes((nds) => nds.concat(newNode))
  }, [reactflow, setNodes]);

  return (
    <div className="Flow" >
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
          snapToGrid
          nodeOrigin={[0.5,0.5]}
          snapGrid={[25, 25]}
          edgeTypes={edgeTypes}
          onContextMenu={ (e) => {
            if (e.target.classList.contains('react-flow__pane')) {
              e.preventDefault();
              setAnchorPoint({ x: e.clientX, y: e.clientY });
              setOpen(true);
            }
          }}
        >
          <AddNodeContextMenu anchorPoint={anchorPoint} isOpen={isOpen} setOpen={setOpen} addNode={addNode} />
          <Background color="#bbc872" variant={BackgroundVariant.Cross} gap={25} size={4} />
        </ReactFlow>
      </div>
  );
}

export default function() {
  return <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
};
