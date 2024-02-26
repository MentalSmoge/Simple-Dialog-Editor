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

import TextNode from './Node_Types/TextNode';
import ChoiceNode from './Node_Types/ChoiceNode';

// this is important! You need to import the styles from the lib to make it work
import 'reactflow/dist/style.css';

import './Flow.css';
import StaticEdge from './Edge_Types/StaticEdge';
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
    data: { label: 'Node 5', text: 'This is text   das\n cool ass hat maaaan' },
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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => {
      const edge = { ...params, type: 'static-edge' };
      setEdges((eds) => addEdge(edge, eds))
    },
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
          edgeTypes={edgeTypes}
        >
          <Background color="#bbc872" variant={BackgroundVariant.Cross} gap={25} size={4} />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

export default Flow;
