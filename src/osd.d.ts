import OpenSeadragon from 'openseadragon';

export type ViewerOptions = OpenSeadragon.Options;

export declare function newOpenSeadragon(
  options: ViewerOptions
): OpenSeadragon.Viewer;
