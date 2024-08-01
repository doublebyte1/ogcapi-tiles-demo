import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import Map from 'ol/Map';
import View from 'ol/View';
import { transform } from 'ol/proj';
import LayerGroup from 'ol/layer/Group';
import LayerImage from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source.js';
import XYZ from 'ol/source/XYZ.js';
import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import OGCMapTile from 'ol/source/OGCMapTile.js';
import OGCVectorTile from 'ol/source/OGCVectorTile.js';

import LayerSwitcher from 'ol-layerswitcher';

var map = new Map({
    target: 'map',
    layers: [
        new LayerGroup({
            'title': 'Base maps',
            layers: [
                new TileLayer({
                    title: 'OSM',
                    type: 'base',
                    visible: true,
                    source: new OSM()
                }),
                new TileLayer({
                    title: 'Esri Nat Geo World Map',
                    type: 'base',
                    visible: true,
                    source: new XYZ({
                      attributions:
                        'Tiles &copy; Esri &mdash; National Geographic, Esri, ' +
                        'DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
                      url:
                        'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                        'NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
                    }),
                  }),
            ]
        }),
         new LayerGroup({
            title: 'OGC API - Tiles',
            layers: [
                new TileLayer({
                    title: '<a href="https://maps.gnosis.earth/ogcapi/collections/blueMarble/">Blue Marble',
                    visible: true,
                    source: new OGCMapTile({
                      url: 'https://maps.gnosis.earth/ogcapi/collections/blueMarble/map/tiles/WebMercatorQuad',
                    }),
                  }),
                  new VectorTileLayer({
                    title: '<a href="https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:cultural:ne_10m_admin_0_countries/">Natural Earth</a>',
                    visible: true,
                    source: new OGCVectorTile({
                      url: 'https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:cultural:ne_10m_admin_0_countries/tiles/WebMercatorQuad',
                      format: new MVT(),
                    }),
                    background: '#d1d1d1',
                    style: {
                      'stroke-width': 0.6,
                      'stroke-color': '#8c8b8b',
                      'fill-color': '#f7f7e9',
                    },
                  }),
                  new TileLayer({
                    title: '<a href="https://test.cubewerx.com/cubewerx/cubeserv/demo/ogcapi/Foundation/collections/aerofacp_1m/">Airport Facilities Points</a>',
                    visible: true,
                    source: new OGCMapTile({
                      url: 'https://test.cubewerx.com/cubewerx/cubeserv/demo/ogcapi/Foundation/collections/aerofacp_1m/styles/default/map/tiles/smerc',
                    }),
                  }),
                  new VectorTileLayer({
                    title: '<a href="https://demo.ldproxy.net/daraa/">Daraa</a>',
                    visible: true,
                    source: new OGCVectorTile({
                      url: 'https://demo.ldproxy.net/daraa/tiles/WebMercatorQuad/',
                      format: new MVT(),
                    }),
                    style: {
                      'stroke-width': 1,
                      'stroke-color': 'red'
                    },
                  }),
                  new VectorTileLayer({
                    title: '<a href="https://demo.ldproxy.net/vineyards/">Vineyards</a>',
                    visible: true,
                    source: new OGCVectorTile({
                      url: 'https://demo.ldproxy.net/vineyards/tiles/WebMercatorQuad/',
                      format: new MVT(),
                    }),
                    style: {
                      'stroke-width': 1,
                      'stroke-color': 'red'
                    },
                  })
            ]
        })
    ],
    view: new View({
        center: transform([-0.92, 52.96], 'EPSG:4326', 'EPSG:3857'),
        zoom: 2
    })
});

var layerSwitcher = new LayerSwitcher();
map.addControl(layerSwitcher);
