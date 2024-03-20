import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import { ContextMenuProps } from '../../types';
import FlowStore from '../../../store/FlowStore';
import DeleteModalStore from '../../../store/DeleteModalStore';
import RenameDialogModalStore from '../../../store/RenameDialogModalStore';
import EditModalCharacterStore from '../../../store/EditCharacterModalStore';
import EditModalVariableStore from '../../../store/EditVariableModalStore';

export default function ({destiny, anchorPoint, isOpen, setOpen} : ContextMenuProps) {
  const reactflow = useReactFlow()
  const getPosition = useCallback((pos) => {
    const position = reactflow.screenToFlowPosition({
      x: pos.x,
      y: pos.y,
    });
    return position
  }, [reactflow])
  return (
      <ControlledMenu
        anchorPoint={anchorPoint}
        state={isOpen ? 'open' : 'closed'}
        direction="right"
        onClose={() => setOpen(false)}
      >
        { destiny==="addNode" && <>
        <MenuItem onClick={() => FlowStore.addNode(getPosition(anchorPoint), 'text')}>Add Text Node</MenuItem>
        <MenuItem onClick={() => FlowStore.addNode(getPosition(anchorPoint), 'choice')}>Add Choice Node</MenuItem>
        </>}
        { destiny==="SideBarDialog" && <>
        <MenuItem onClick={() => RenameDialogModalStore.openEditor()}>Rename Dialog</MenuItem>
        <MenuItem onClick={() => DeleteModalStore.openEditor("Dialog")}>Delete Dialog</MenuItem>
        </>}
        { destiny==="SideBarCharacter" && <>
        <MenuItem onClick={() => EditModalCharacterStore.openEditor()}>Edit Character</MenuItem>
        <MenuItem onClick={() => DeleteModalStore.openEditor("Character")}>Delete Character</MenuItem>
        </>}
        { destiny==="SideBarVariable" && <>
        <MenuItem onClick={() => EditModalVariableStore.openEditor()}>Edit Variable</MenuItem>
        <MenuItem onClick={() => DeleteModalStore.openEditor("Variable")}>Delete Variable</MenuItem>
        </>}

      </ControlledMenu>
  );
}
