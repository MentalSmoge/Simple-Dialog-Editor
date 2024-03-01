import React, { useMemo } from 'react';
import { getConnectedEdges, Handle, useNodeId, useStore } from 'reactflow';

const selector = (s) => ({
    nodeInternals: s.nodeInternals,
    edges: s.edges,
});

// eslint-disable-next-line react/function-component-definition
const LimitedHandleChoice = (props) => {
    const { nodeInternals, edges } = useStore(selector);
    const nodeId = useNodeId();

    const isHandleConnectable = useMemo(() => {

      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node], edges);
      let connectedFromMe = 0;
      connectedEdges.forEach(element => {
        if ((element.source === nodeId) && (element.sourceHandle === props.handleId)) connectedFromMe += 1
      })

      return connectedFromMe < props.isConnectable;

    }, [nodeInternals, nodeId, edges, props.isConnectable, props.handleId]);

    return (
        <Handle {...props} isConnectable={isHandleConnectable}></Handle>
    );
};

export default LimitedHandleChoice;
