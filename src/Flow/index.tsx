import { observer } from 'mobx-react-lite';
import ReactFlow, {
  Background,
  BackgroundVariant,
  MiniMap,
} from 'reactflow';
import FlowStore from '../store/FlowStore';

// this is important! You need to import the styles from the lib to make it work
import 'reactflow/dist/style.css';

import './Flow.css';

function Flow() {
  const nodeColor = (node) => {
    switch (node.type) {
      case 'start':
        return '#6ede87';
      default:
        return '#FCB1A6';
    }
  }
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

        >
          <MiniMap pannable nodeStrokeColor="black" ariaLabel="Dialog Editor Map" maskStrokeColor="black" nodeColor={nodeColor} />
          <Background color="#bbc872" variant={BackgroundVariant.Cross} gap={25} size={4} />
        </ReactFlow>
      </div>
  );
}

export default observer(Flow);
