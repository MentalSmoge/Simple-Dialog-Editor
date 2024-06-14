
import {ModalAddCharacter,ModalAddDialog,ModalAddVariable,ModalDelete,ModalEditCharacter,ModalEditDialog,ModalEditVariable,ModalPlayerChoiceTextEditor,ModalTextEditor, ModalLogin, ModalRegister, MyProjects} from "./index"

function Modals() {

  return (
    <>

      <ModalDelete />
      <ModalEditDialog />
      <ModalAddDialog />
      <ModalAddCharacter />
      <ModalAddVariable />
      <ModalEditCharacter />
      <ModalEditVariable />
      <ModalPlayerChoiceTextEditor />
      <ModalTextEditor />
      <ModalLogin />
      <ModalRegister />
      <MyProjects/>
    </>
    )
}
export default Modals;
