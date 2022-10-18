import {
  newViewer,
  // D3Selection
} from './osd';
import React, {useEffect} from 'react';
import './App.css';

const styles = {
  viewer: {
    width: '800px',
    height: '600px',
  },
  toolbar: {},
};

function App() {
  useEffect(() => {
    const viewer = newViewer({
      id: 'osd-viewer',
      prefixUrl: './images/',
      tileSources: './tiles/target.dzi',
      defaultZoomLevel: 1,
      showNavigator: true,
      gestureSettingsTouch: {
        pinchToZoom: true,
      },
      gestureSettingsMouse: {
        clickToZoom: true,
      },
      // // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // d3Overlay: (selection: D3Selection): any => {
      //   return selection
      //     .append('rect')
      //     .style('fill', '#f00')
      //     .attr('x', 0.35)
      //     .attr('width', 0.25)
      //     .attr('y', 0.5)
      //     .attr('height', 0.125);
      // },
      toolbarId: 'toolbar',
    });
    viewer.addHandler('zoom', event => {
      // console.log('zoom event', event);
      const maxScale = 40;
      const maxZoom = viewer.viewport.getMaxZoom();
      const currentZoom = viewer.viewport.getZoom(false);
      console.log('viewer zooms', {
        // homeZoom: viewer.viewport.getHomeZoom(),
        // minZoom: viewer.viewport.getMinZoom(),
        // maxZoom,
        // currentZoom,
        // zoomFalse: viewer.viewport.getZoom(false),
        dotByDot: (currentZoom / maxZoom) * 100,
        scale: maxScale * (currentZoom / maxZoom),
      });
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <div id="toolbar" style={styles.toolbar}></div>
        <div id="osd-viewer" style={styles.viewer}></div>
      </header>
    </div>
  );
}

export default App;
