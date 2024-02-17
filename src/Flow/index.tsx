import { useCallback } from 'react';
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
} from 'reactflow';

import CustomNode from './Node_Types/CustomNode';
import ResizeableText from './Node_Types/ResizeableText';
import TextNode from './Node_Types/TextNode';
import ChoiceNode from './Node_Types/ChoiceNode';

// this is important! You need to import the styles from the lib to make it work
import 'reactflow/dist/style.css';

import './Flow.css';
// import TextEditorStore from '../store/TextEditorStore';

const nodeTypes = {
  custom: CustomNode,
  resizable: ResizeableText,
  text: TextNode,
  choice : ChoiceNode
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 400, y: 100 },
  },
  {
    id: '4',
    data: { label: 'Node 4' },
    position: { x: 400, y: 200 },
    type: 'custom',
  },
  {
    id: '5',
    data: { label: 'Node 5', text: 'This is text   das\n cool ass hat maaaan   wo w ddddddddddddddddd dddddddddddddd ddddddddddddddddddddd sad asd asd asd wqe  s yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy' },
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
    position: { x: 0, y: 0 },
    type: 'choice',
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e1-4', source: '9', target: '3', sourceHandle: "handle-2", animated: true },
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlowProvider>

    <div className="Flow">
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
          snapToGrid
          snapGrid={[25, 25]}
        >
          <Background color="#ccc" variant={BackgroundVariant.Cross} gap={25} size={4} />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

export default Flow;
