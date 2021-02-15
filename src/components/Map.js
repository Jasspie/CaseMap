import React, { useEffect } from 'react';
import { MapContainer, useMap } from 'react-leaflet';
import MapColor from './MapColor';
import MapCircles from './MapCircles';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ activeCountry, countryResults, setActiveCountry }) => {

    const map = useMap();
    const zoom = 6;

    useEffect (() => {
        if (map._zoom !== zoom) {
            setActiveCountry();
        }
    });

    if (activeCountry !== null) {

        const getIndex = (countryResults, value) => {
            for (var i = 0; i < countryResults.length; i++) {
                if (countryResults[i].name === value) {
                    return i;
                }
            };
        }

        const index = getIndex(countryResults, activeCountry);

        const coordinates = [countryResults[index].info.lat, countryResults[index].info.long]

        setTimeout(() => {
            map.flyTo(coordinates, zoom, {
                duration: 0.5
            });
        }, 1);   
    }
    return null;
};

const Map = ({ zoom, center, activeButton, countryResults, activeCountry, setHoveredCountry, setActiveCountry }) => {

    const setMouseHover = (country) => {
        return setHoveredCountry(country);
    };

    const clearActiveCountry = () => {
        return setActiveCountry(null);
    }

    return (
        <MapContainer 
            style={{height:'96vh', width:'66vw', background:'white'}} 
            zoom={zoom} 
            center={center} 
            maxZoom={4} 
            minZoom={2} 
            maxBounds={[[-60, -170],[90, 180]]} 
            maxBoundsViscosity='1'
            dragging={false}> 
            <MapColor 
                activeButton={activeButton} 
                countryResults={countryResults}
                setMouseHover={setMouseHover}
            />
            <MapCircles
                activeButton={activeButton} 
                countryResults={countryResults}  
            />
            <MapComponent 
                activeCountry={activeCountry}
                countryResults={countryResults}
                setActiveCountry={clearActiveCountry}
            />
        </MapContainer>
    );
};

export default Map;