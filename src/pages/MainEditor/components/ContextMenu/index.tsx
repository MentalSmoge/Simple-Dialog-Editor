import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import { ContextMenuProps } from '../../../../Flow/types';
import FlowStore from '../EditorField/FlowStore';
import DeleteModalStore from '../../Modals/Modal_Delete/DeleteModalStore';
import RenameDialogModalStore from '../../Modals/Modal_EditDialog/RenameDialogModalStore';
import EditModalCharacterStore from '../../Modals/Modal_EditCharacter/EditCharacterModalStore';
import EditModalVariableStore from '../../Modals/Modal_EditVariable/EditVariableModalStore';

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
        <MenuItem onClick={() => FlowStore.addNode(getPosition(anchorPoint), 'text')}>Добавить текстовый узел</MenuItem>
        <MenuItem onClick={() => FlowStore.addNode(getPosition(anchorPoint), 'choice')}>Добавить узел ветвления</MenuItem>
        <MenuItem onClick={() => FlowStore.addNode(getPosition(anchorPoint), 'playerChoice')}>Добавить узел выбора игрока</MenuItem>
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
