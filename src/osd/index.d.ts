import OpenSeadragon from 'openseadragon';
import {Selection, GElement, OldDatum} from 'd3';

export type D3Selection = Selection<GElement, OldDatum, null, undefined>;

export type ViewerOptions = OpenSeadragon.Options & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  d3Overlay: {(selection: D3Selection): any};
};

export declare function newViewer(options: ViewerOptions): OpenSeadragon.Viewer;
