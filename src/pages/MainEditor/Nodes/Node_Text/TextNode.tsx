import Select from "react-select";
import { type FC } from 'react';
import { observer } from "mobx-react-lite";
import { Handle, Position, type NodeProps, useStore, NodeToolbar } from 'reactflow';

import t from "../../Modals/Modal_TextEditor/TextEditorModalStore"
import './TextNode.css';
import DefaultInput from "./components/DefaultInput";
import CharacterCard from "./components/CharacterCard/CharacterCard";
import LimitedHandle from "../../HandleTypes/Handle_Default/LimitedHandle";
import FlowStore from "../../components/EditorField/FlowStore";
import CharacterStore from "../../../../store/CharacterStore";


// eslint-disable-next-line react/function-component-definition
const TextNode: FC<NodeProps> = ({ id, data }) => {
  const resetSelectedElements = useStore(a => a.resetSelectedElements)
  function handleEditClick() {
    resetSelectedElements();
    t.openEditor(data.text, id);
  }
  const changeCharacter = (val) => {
    FlowStore.updateCharacterInNode(id, val?.value)
    FlowStore.updatePortraitInNode(id, "")
    if (val === null) {
      FlowStore.updatePortraitInNode(id, "")
    }
  }
  const character = CharacterStore.getCharacterLabel(data?.character?.id)

  // useEffect(function verifyValueExistsInNewOptions() {
  //   if(character && CharacterStore.character_options.length && !CharacterStore.character_options.find(x => x.value === character.value) {
  //     setValue(null);
  //   }
  // }, [character, CharacterStore.character_options]);

  return (
    <div className='TextNode-container'>
      <NodeToolbar position={Position.Top} >
        <button className='TextNode-button nodrag' type='button' onClick={() => handleEditClick()}>Изменить текст</button>
      </NodeToolbar>
      <Handle type="target" position={Position.Left} />
      <LimitedHandle type="source" position={Position.Right} isConnectable={1} />
      <Select placeholder={<div>Character...</div>}
        isClearable
        onChange={(val) => changeCharacter(val)}
        value={CharacterStore.getCharacterLabel(data?.character?.id)}
        options={CharacterStore.character_options}
        className='TextNode-select nodrag '
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderRadius:"8px 8px 0 0",
        }),
      }}/>

      {character!==undefined && character!==null && <> <CharacterCard id={id}/> </>}

      <div className='TextNode-wrapper'>
        <DefaultInput textContent={data.text} readOnly/>
      </div>
    </div>
  );
};

export default observer(TextNode);
