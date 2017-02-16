import React from 'react';
import update from 'react-addons-update';
import d3 from 'd3';
const topojson = require('topojson');

import PolygonCollection from './Map50Renderer.jsx';
import ChartRendererMixin from "./../mixins/MapRendererMixin.js";

const projectionFunc = require('react-d3-map-core').projection;
const geoPath = require('react-d3-map-core').geoPath;

// move into config?
const polygonClass = 'polygon-render';

const MapRenderer = React.createClass({

  propTypes: {
		displayConfig: React.PropTypes.shape({
			margin: React.PropTypes.object.isRequired,
			padding: React.PropTypes.object.isRequired,
			labelRectSize: React.PropTypes.number.isRequired,
			afterLegend: React.PropTypes.number.isRequired
		}).isRequired,
		chartProps: React.PropTypes.shape({
			chartSettings: React.PropTypes.array.isRequired,
			data: React.PropTypes.array.isRequired,
			scale: React.PropTypes.object.isRequired,
			_annotations: React.PropTypes.object,
			date: React.PropTypes.object,
			mobile: React.PropTypes.object
		}).isRequired,
		metadata: React.PropTypes.object,
		showMetadata: React.PropTypes.bool,
		editable: React.PropTypes.bool,
		useMobileSettings: React.PropTypes.bool
	},
  render: function() {

    const chartProps = this.props.chartProps;
    const schema = chartProps.schema.schema;
    const featname = schema.feature;
    const shouldSearch = this.props.shouldSearch;

		const displayConfig = this.props.displayConfig;
    const metadata = this.props.metadata;

    const data = topojson.feature(schema.topojson, schema.topojson.objects[featname]);

    let projObj = {
      projection: schema.proj,
      scale: schema.scale,
      translate: schema.translate,
      precision: schema.precision
    }

    if (schema.parallels) projObj.parallels = schema.parallels;
    if (schema.rotate) projObj.rotate = schema.rotate;

    const proj = projectionFunc(projObj);
    const geo = geoPath(proj);

    return (
          <PolygonCollection
            chartProps= {chartProps}
            stylings = {chartProps.stylings}
            data= {data.features}
            geoPath= {geo}
            metadata ={metadata}
            schema={schema}
            proj={proj}
            shouldSearch={shouldSearch}
            displayConfig={displayConfig}
            polygonClass={polygonClass}
          />
    );
  }
});

module.exports = MapRenderer;