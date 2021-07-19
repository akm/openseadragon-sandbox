import {newOpenSeadragon} from './osd';
import React, {useEffect} from 'react';
import './App.css';

const styles = {
  viewer: {
    width: '800px',
    height: '600px',
  },
};

function App() {
  useEffect(() => {
    newOpenSeadragon();
  });

  return (
    <div className="App">
      <header className="App-header">
        <div id="osd-viewer" style={styles.viewer}></div>
      </header>
    </div>
  );
}

export default App;
