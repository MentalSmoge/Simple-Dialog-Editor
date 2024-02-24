import { BaseEdge, Position, getBezierPath, getSimpleBezierPath, getSmoothStepPath } from 'reactflow';

export default function StaticEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  });

  return (
      <BaseEdge style={{
        strokeWidth: 3,
      stroke: "#6d763d"}} id={id} path={edgePath} />
  );
}
