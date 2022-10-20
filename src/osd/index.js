const OpenSeadragon = require('openseadragon');
const Annotorious = require('@recogito/annotorious-openseadragon');
const Toolbar = require('@recogito/annotorious-toolbar/dist/annotorious-toolbar.min');
require('./plugins/svg-overlay');

// const d3 = require('d3');

const newViewer = function (options) {
  const viewer = OpenSeadragon(options);
  // const overlay = viewer.svgOverlay();
  // const d3Element = options.d3Overlay(d3.select(overlay.node()));
  // overlay.onClick(d3Element.node(), () => {
  //   console.log('click', arguments);
  // });

  // $(window).resize(function() {
  //   overlay.resize();
  // });

  const anno = Annotorious(viewer, {
    locale: 'auto',
    allowEmpty: true,
  });

  Toolbar(anno, global.document.getElementById(options.toolbarId));

  // const sampleAnnotation = {
  //   '@context': 'http://www.w3.org/ns/anno.jsonld',
  //   id: '#07475897-d2eb-4dce-aa12-ecb50771c734',
  //   type: 'Annotation',
  //   body: [
  //     {
  //       type: 'TextualBody',
  //       value: 'Annotation',
  //     },
  //   ],
  //   target: {
  //     selector: {
  //       type: 'FragmentSelector',
  //       conformsTo: 'http://www.w3.org/TR/media-frags/',
  //       value: 'xywh=540,240,180,340',
  //     },
  //   },
  // };

  // anno.addAnnotation(sampleAnnotation);
  return viewer;
};

module.exports = {newViewer, OpenSeadragon};
