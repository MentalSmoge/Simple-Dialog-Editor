import Select from "react-select";
import { observer } from "mobx-react-lite";
import { Handle, Position, type NodeProps, useStore, NodeToolbar } from 'reactflow';
// USEFUL ACTUALLY
import LimitedHandle from "../../HandleTypes/Handle_Default/LimitedHandle";
import './TextNode.css';
import DefaultInput from "./components/DefaultInput";
import CharacterCard from "./components/CharacterCard/CharacterCard";
// TRAAASH
import t from "../../Modals/Modal_TextEditor/TextEditorModalStore"
import FlowStore from "../../components/EditorField/FlowStore";
import CharacterStore from "../../../../store/CharacterStore";
import { CharacterLabel, DialogFileData } from "../../../../Flow/types";



function TextNode({ id, data } : NodeProps) {
  const resetSelectedElements = useStore(a => a.resetSelectedElements)
  function handleEditClick() {
    resetSelectedElements();
    t.openEditor(data.text, id);
  }
  const changeCharacter = (val: CharacterLabel) => {
    FlowStore.updateCharacterInNode(id, val?.value)
    FlowStore.updatePortraitInNode(id, "")
    if (val === null) {
      FlowStore.updatePortraitInNode(id, "")
    }
  }
  async function OpenPortrait() {
    const files: DialogFileData = await window.electron.showOpenDialog("C:\\")
    if (files.canceled === false) {
      FlowStore.updatePortraitInNode(id, files.filePaths[0])
    }
  }
  const character = CharacterStore.getCharacterLabel(data?.character?.id)
  return (
    <div className='TextNode-container'>
      <NodeToolbar position={Position.Top} >
        <button className='TextNode-button nodrag' type='button' onClick={() => handleEditClick()}>Изменить текст</button>
      </NodeToolbar>
      <Handle type="target" position={Position.Left} />
      <LimitedHandle type="source" position={Position.Right} isConnectable={1} />
      <Select placeholder={<div>Character...</div>}
        isClearable
        onChange={(val) => changeCharacter(val as CharacterLabel)}
        value={CharacterStore.getCharacterLabel(data?.character?.id)}
        options={CharacterStore.character_options}
        className='TextNode-select nodrag '
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderRadius:"8px 8px 0 0",
        }),
      }}/>

      {/* {character!==undefined && character!==null && <> <CharacterCard id={id} OpenPortrait={() => OpenPortrait}/> </>} */}

      <div className='TextNode-wrapper'>
        <DefaultInput textContent={data.text} readOnly/>
      </div>
    </div>
  );
};

export default observer(TextNode);
