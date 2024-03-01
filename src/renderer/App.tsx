import { FpsView } from 'react-fps';
import Flow from '../Flow';
import TextEditorView from '../Flow/TextEditorView';

import './App.css';

function App() {

  // document.body.onmousedown(event => {
  //   console.log("sas");
  //   if( event.which === 3) {
  //    //this is a right click, so electron-context-menu will be appearing momentarily...
  //    let elementClicked = event.target;
  //    console.log(elementClicked);
  //    //if(textBoxClicked.length) ipcRenderer.send('right-click/' + $(textBoxClicked).attr('id') )
  //   }
  //   })
  return (
    <div className="App" onContextMenu={ (e) => {
      e.preventDefault();
      console.log(e.target)
      console.log("Right")
    }}>
      <header className="App-header">React Flow - CRA Example</header>
      {/* <FpsView/> */}
      <TextEditorView />
      <Flow />
      <footer className="App-footer">React Flow - CRA Example</footer>
    </div>
  );
}

export default App;
