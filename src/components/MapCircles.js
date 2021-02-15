import React from 'react';
import { Circle } from 'react-leaflet';

const MapCircles = ({ activeButton, countryResults }) => {
    
    if (activeButton === 'totalCases' || activeButton === 'totalDeaths') {

        const index = {
            totalCases: {
                color: '#E01D0F',
                multiplier: 200
            },
            totalDeaths: {
                color: '#FF7F04',
                multiplier: 1250
            }
        };

        const getRadius = (country) => {
            const num = Math.sqrt(country.results[activeButton]);
            return num * index[activeButton].multiplier;
        };

        const data = countryResults.map((country) => (
            <Circle
                center={[country.info.lat, country.info.long]}
                color={index[activeButton].color}
                weight={0.95}
                fillColor={index[activeButton].color}
                fillOpacity={0.3}
                radius={getRadius(country)}
                key={country.name}
            />
        ));

        return data;
        

    } else {
        return null;
    }
};

export default MapCircles;