const OpenSeadragon = require('openseadragon');
require('./plugins/svg-overlay');
const d3 = require('d3');

const newViewer = function (options) {
  const viewer = OpenSeadragon(options);
  const overlay = viewer.svgOverlay();
  const d3Element = options.d3Overlay(d3.select(overlay.node()));
  overlay.onClick(d3Element.node(), () => {
    console.log('click', arguments);
  });

  // $(window).resize(function() {
  //   overlay.resize();
  // });

  return viewer;
};

module.exports = {newViewer};
