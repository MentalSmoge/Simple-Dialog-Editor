import { FpsView } from 'react-fps';
import { ReactFlowProvider } from 'reactflow';
import Flow from '../Flow';
import TextEditorView from '../Flow/TextEditorView';

import './App.css';

function App() {
  // const reactflow = useReactFlow()
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
    <ReactFlowProvider>
    <div className="App">
      <header className="App-header">React Flow - CRA Example</header>
      {/* <FpsView/> */}
      <TextEditorView />
      <Flow />
      <footer className="App-footer">React Flow - CRA Example</footer>
    </div>
    </ReactFlowProvider>
  );
}

export default App;
