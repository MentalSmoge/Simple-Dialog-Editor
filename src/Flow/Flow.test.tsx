import { render } from '@testing-library/react';

import Flow from '.';

const wrapperStyle = { height: 500 };

test('renders nodes and edges', () => {
  const { container } = render(
    <div style={wrapperStyle}>
      <Flow />
    </div>,
  );

  const nodes = container.getElementsByClassName('react-flow__node');
  const edges = container.getElementsByClassName('react-flow__edge');

  expect(nodes.length).toBe(4);
  expect(edges.length).toBe(2);
});
