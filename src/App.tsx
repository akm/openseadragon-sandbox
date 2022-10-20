import {
  newViewer,
  OpenSeadragon,
  // D3Selection
} from './osd';
import React, {useEffect, useState} from 'react';
import './App.css';

const styles = {
  viewer: {
    width: '800px',
    height: '600px',
  },
  toolbar: {},
};

function hexToRGB(hex) {
  const value = parseInt(hex.replace(/^#/, ''), 16);
  return {
    red: (value >>> 16) & 0xff,
    green: (value >>> 8) & 0xff,
    blue: value & 0xff,
  };
}

function App() {
  let viewer: OpenSeadragon.Viewer;
  useEffect(() => {
    viewer = newViewer({
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

  const clickButton1 = () => {
    console.log('Start processing overlay');

    const cvs = document.createElement('canvas');
    const ctx = cvs.getContext('2d');
    if (!ctx) throw new Error('ctx is null or undefined');

    const filenameField = document.getElementById(
      'filename'
    ) as HTMLInputElement;
    if (!filenameField) throw new Error('filenameField is null or undefined');

    const img = document.createElement('img');
    img.src = './overlays/' + filenameField.value;
    img.style.width = '100%';
    img.onload = () => {
      cvs.width = img.width;
      cvs.height = img.height;
      ctx.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        0,
        0,
        img.width,
        img.height
      );

      const colorizeField = document.getElementById(
        'colorize'
      ) as HTMLInputElement;
      if (!colorizeField) throw new Error('colorizeField is null or undefined');
      if (colorizeField.checked) {
        const colorField = document.getElementById('color') as HTMLInputElement;
        if (!colorField) throw new Error('colorField is null or undefined');
        const color = hexToRGB(colorField.value);

        const src = ctx.getImageData(0, 0, img.width, img.height);
        const dest = ctx.getImageData(0, 0, img.width, img.height);
        for (let i = 0, len = src.data.length; i < len; i += 4) {
          if (src.data[i + 3] > 0) {
            dest.data[i] = (src.data[i] / 256) * color.red;
            dest.data[i + 1] = (src.data[i + 1] / 256) * color.green;
            dest.data[i + 2] = (src.data[i + 2] / 256) * color.blue;
          }
        }
        ctx.putImageData(dest, 0, 0);
        img.src = cvs.toDataURL('image/png');
        img.onload = null;
        console.log('Finish processing overlay');
      }
    };

    const elt = document.createElement('div');
    elt.id = 'runtime-overlay';
    // elt.className = 'highlight';
    elt.appendChild(img);

    viewer.addOverlay({
      element: elt,
      location: new OpenSeadragon.Rect(0, 0, 1, 1),
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div id="toolbar" style={styles.toolbar}></div>
        <div id="osd-viewer" style={styles.viewer}></div>
      </header>
      <div>
        <input id="filename" type="text" defaultValue="overlay1.png" />
        <label>
          <input id="colorize" type="checkbox" defaultChecked={true} />
          Change Image Color
        </label>
        <input id="color" type="text" defaultValue="#00FF00" />
        <button onClick={clickButton1}>button1</button>
      </div>
    </div>
  );
}

export default App;
