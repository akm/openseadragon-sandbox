const OpenSeadragon = require('openseadragon');

const newOpenSeadragon = function (options) {
  const viewer = OpenSeadragon(options);
  return viewer;
};

module.exports = {newOpenSeadragon};
