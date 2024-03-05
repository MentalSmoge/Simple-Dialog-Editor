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
import FlowStore from '../store/FlowStore';

// this is important! You need to import the styles from the lib to make it work
import 'reactflow/dist/style.css';

import './Flow.css';
import AddNodeContextMenu from './Components/AddNodeContextMenu';
import { observer } from 'mobx-react-lite';
// import TextEditorStore from '../store/TextEditorStore';



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
  const [saveListener, setSaveListener] = useState(true)
  // Для контекстного меню
  const [isOpen, setOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  //

  const reactflow = useReactFlow()
  if (saveListener) {
    // window.electron.onSaveFile(() => {
    //   // const responce = reactflow.toObject()
    //   // console.log(responce)
    //   const responce = JSON.stringify(reactflow.toObject())
    //   window.electron.saveFile(responce)
    // })
    setSaveListener(false)
  }
  // const getPosition = useCallback((pos) => {
  //   const position = reactflow.screenToFlowPosition({
  //     x: pos.x,
  //     y: pos.y,
  //   });
  //   return position
  // }, [reactflow])
  // const addNode = useCallback((pos, nodeType) => {
  //   FlowStore.addNode(getPosition(pos), nodeType)
  // }, [getPosition]);

  const proOptions = { hideAttribution: true };
  return (
    <div className="Flow" >
        <ReactFlow
          proOptions={proOptions}
          nodes={FlowStore.nodes}
          onNodesChange={FlowStore.onNodesChange}
          edges={FlowStore.edges}
          onEdgesChange={FlowStore.onEdgesChange}
          onConnect={FlowStore.onConnect}
          fitView
          nodeTypes={FlowStore.nodeTypes}
          snapToGrid
          nodeOrigin={[0.5,0.5]}
          snapGrid={[25, 25]}
          edgeTypes={FlowStore.edgeTypes}
          // onContextMenu={ (e) => {
          //   console.log(e.target.classList)
          //   if (e.target.classList.contains('react-flow__pane')) {
          //     e.preventDefault();
          //     setAnchorPoint({ x: e.clientX, y: e.clientY });
          //     setOpen(true);
          //   }
          // }}
        >
          {/* <AddNodeContextMenu anchorPoint={anchorPoint} isOpen={isOpen} setOpen={setOpen} addNode={addNode} /> */}
          <Background color="#bbc872" variant={BackgroundVariant.Cross} gap={25} size={4} />
        </ReactFlow>
      </div>
  );
}

export default observer(Flow);
