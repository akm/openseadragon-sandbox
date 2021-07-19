const OpenSeadragon = require('openseadragon');

const newOpenSeadragon = function () {
  const viewer = OpenSeadragon({
    id: 'osd-viewer',
    prefixUrl: './images/',
    tileSources: './tiles/tree1.dzi',
    showNavigator: true,
  });
  return viewer;
};

module.exports = {newOpenSeadragon};
