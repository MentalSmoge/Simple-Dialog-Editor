import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  MarkerType,
  MiniMap,
  Node,
} from 'reactflow';
import FlowStore from './FlowStore';

// this is important! You need to import the styles from the lib to make it work
import 'reactflow/dist/style.css';

import './Flow.css';
import { NodeBranch, NodePlayerChoice, NodeStart, NodeText } from '../../Nodes';
import StaticEdge from '../../EdgeTypes/Edge_Static/StaticEdge';

function Flow() {
  const nodeColor = (node: Node) => {
    switch (node.type) {
      case 'start':
        return '#6ede87';
      default:
        return '#FCB1A6';
    }
  }
  const defaultEdgeOptions = {
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  };
  const nodeTypes = useMemo(
    () => ({
      text: NodeText,
      choice : NodeBranch,
      start : NodeStart,
      playerChoice : NodePlayerChoice,
    }),
    []
  );

  const edgeTypes = useMemo(
    () => (
    {
      'static-edge': StaticEdge
    }), []
  )
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
          nodeTypes={nodeTypes}
          snapToGrid
          nodeOrigin={[0.5,0.5]}
          snapGrid={[25, 25]}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
        >
          <MiniMap pannable nodeStrokeColor="black" ariaLabel="Dialog Editor Map" maskStrokeColor="black" nodeColor={nodeColor} />
          <Background color="#bbc872" variant={BackgroundVariant.Cross} gap={25} size={4} />
        </ReactFlow>
      </div>
  );
}

export default observer(Flow);
