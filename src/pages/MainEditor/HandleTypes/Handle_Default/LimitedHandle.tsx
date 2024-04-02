import React, { useMemo } from 'react';
import { getConnectedEdges, Handle, useNodeId, useStore } from 'reactflow';

const selector = (s) => ({
    nodeInternals: s.nodeInternals,
    edges: s.edges,
});

// eslint-disable-next-line react/function-component-definition
const LimitedHandle = (props) => {
    const { nodeInternals, edges } = useStore(selector);
    const nodeId = useNodeId();

    const isHandleConnectable = useMemo(() => {

      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node], edges);
      let connectedFromMe = 0;
      connectedEdges.forEach(element => {
        if (element.source === nodeId) connectedFromMe += 1
      });

      return connectedFromMe < props.isConnectable;

    }, [nodeInternals, edges, nodeId, props.isConnectable]);

    return (
        <Handle {...props} isConnectable={isHandleConnectable}></Handle>
    );
};

export default LimitedHandle;
