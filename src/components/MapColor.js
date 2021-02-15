import React from 'react';
import countries from '../data/world.json'
import { GeoJSON } from 'react-leaflet';

const MapColor = ({ activeButton, countryResults, setMouseHover }) => {

    const getCaseColor = (value) => {
        return  value > 9235 ? '#670101' :
                value > 5427 ? '#A50101' :
                value > 2615 ? '#E01D0F' :
                value > 856 ? '#FF5035' :
                value > 0 ? '#FF805D' : '#E3E3E3';
    };

    const getDeathColor = (value) => {
        return  value > 168 ? '#862501' :
                value > 117 ? '#AE4201' :
                value > 69 ? '#D75F01' :
                value > 26 ? '#FF7F04' : 
                value > 0 ? '#FFA132' : '#E3E3E3';
    };
    
    const getStyle = (countryResults, index) => {
        if (index !== null && activeButton === 'cases') {
            const cases = countryResults[index].results[activeButton];
            const style = getCaseColor(cases);
            return style;
        } else if (index !== null && activeButton === 'deaths') {
            const cases = countryResults[index].results[activeButton];
            const style = getDeathColor(cases);
            return style;
        }
        else {
            return getCaseColor(-1);
        }
    };

    const getCountryIndex = (countryResults, value) => {
        for (var i = 0; i < countryResults.length; i++) {
            if (countryResults[i].info.iso3 === value) {
                return i;
            }
        };
        return null;
    };

    const onEachCountry = (country, layer) => {
        const id = country.properties.ISO_A3;
        const index = getCountryIndex(countryResults, id)
        const style = getStyle(countryResults, index);
        layer.options.fillColor = style;
        layer.options.fillOpacity = 1;
        layer.options.color = 'white';
        layer.options.weight = '0.8'
        countryHover(layer);
    };

    const onEachCountryTotal = (country, layer) => {
        layer.options.fillOpacity = 1;
        layer.options.fillColor = '#E3E3E3';
        layer.options.color = 'white';
        layer.options.weight = '0.8'
        countryHover(layer);
    };

    const countryHover = (layer) => {
        return (
            layer.on ({
                mouseover: (event) => {
                    const id = event.target.feature.properties.ISO_A3;
                    const index = getCountryIndex(countryResults, id);
                    if (index !== null) {
                        (activeButton === 'cases') ? setMouseHover(countryResults[index]) :
                        (activeButton === 'deaths') ? setMouseHover(countryResults[index]) :
                        (activeButton === 'totalCases') ? setMouseHover(countryResults[index]) :
                        (activeButton === 'totalDeaths') ? setMouseHover(countryResults[index]) :
                        setMouseHover(null);
                    }
                } 
            },
        ));
    };

    if (countryResults.length !== 0) {

        if (activeButton === 'cases' || activeButton === 'deaths') {
            return <GeoJSON data={countries} onEachFeature={onEachCountry}/>;

        } else if (activeButton === 'totalCases' || activeButton === 'totalDeaths') {
            return <GeoJSON data={countries} onEachFeature={onEachCountryTotal}/>;
        
        } else {
            return null
        }

    } else {
        return null;
    }

};


export default MapColor;