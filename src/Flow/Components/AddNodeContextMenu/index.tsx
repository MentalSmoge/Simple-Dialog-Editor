import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { AddNodeContextMenuProps } from '../../types';

export default function ({anchorPoint, isOpen, setOpen, addNode} : AddNodeContextMenuProps) {
  return (
      <ControlledMenu
        anchorPoint={anchorPoint}
        state={isOpen ? 'open' : 'closed'}
        direction="right"
        onClose={() => setOpen(false)}
      >
        <MenuItem onClick={() => addNode(anchorPoint, 'text')}>Add Text Node</MenuItem>
        <MenuItem onClick={() => addNode(anchorPoint, 'choice')}>Add Choice Node</MenuItem>
      </ControlledMenu>
  );
}
