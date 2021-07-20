import {newViewer, D3Selection} from './osd';
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
    newViewer({
      id: 'osd-viewer',
      prefixUrl: './images/',
      tileSources: './tiles/tree1.dzi',
      showNavigator: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      d3Overlay: (selection: D3Selection): any => {
        return selection
          .append('rect')
          .style('fill', '#f00')
          .attr('x', 0.35)
          .attr('width', 0.25)
          .attr('y', 0.5)
          .attr('height', 0.125);
      },
    });
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
