import { FpsView } from 'react-fps';
import Flow from '../Flow';
import TextEditorView from '../Flow/TextEditorView';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">React Flow - CRA Example</header>
      {/* <FpsView/> */}
      <TextEditorView />
      <Flow />
      <footer className="App-footer">React Flow - CRA Example</footer>
    </div>
  );
}

export default App;
