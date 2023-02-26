import React from 'react';
import geoData from '@/assets/nigeria_geojson.geojson';
import {
  ComposableMap,
  Geography,
  Geographies,
  Annotation,
} from 'react-simple-maps';

const Map = () => {
  return (
    <ComposableMap
      projection='geoAzimuthalEqualArea'
      projectionConfig={{
        center: [8, 9],
        scale: 2200,
      }}
    >
      <Geographies geography={geoData}>
        {({ geographies }) =>
          geographies.map((geo, idx) => (
            <Geography
              key={idx}
              geography={geo}
              style={{
                default: {
                  width: '100%',
                  height: '800px',
                  fill: '#EEE',
                  overflow: 'hidden',
                  stroke: '#444',
                },
                hover: {
                  fill: '#50cc34ec',
                },
              }}
            />
          ))
        }
      </Geographies>
      <Annotation
        subject={[7.69297, 9.349403]}
        dx={-90}
        dy={-30}
        connectorProps={{
          stroke: '#FF5533',
          strokeWidth: 3,
          strokeLinecap: 'round',
        }}
      >
        <text x='-8' textAnchor='end' alignmentBaseline='middle' fill='#F53'>
          Sample Annotation
        </text>
      </Annotation>
    </ComposableMap>
  );
};

export default Map;
