const OpenSeadragon = require('openseadragon');

const newViewer = function (options) {
  const viewer = OpenSeadragon(options);
  return viewer;
};

module.exports = {newViewer};
