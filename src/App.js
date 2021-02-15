import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import Buttons from './components/Buttons';
import CardTitle from './components/CardTitle';
import CountryCard from './components/CountryCard';
import GlobalStats from './components/GlobalStats';
import Map from './components/Map';
import Dropdown from './components/Search';
import Chart from './components/Chart';

const App = () => {

    const [results, setResults] = useState([]);
    const [countryResults, setCountryResults] = useState([]);
    const [activeIndex, setActiveIndex] = useState('globalCases');
    const [activeButton, setActiveButton] = useState('cases');
    const [zoom, setZoom] = useState(2);
    const [center, setCenter] = useState([42,8]);
    const [activeCountry, setActiveCountry] = useState(null);
    const [hoveredCountry, setHoveredCountry] = useState(null);
    const [chartCountry, setChartCountry] = useState(null);
    
    useEffect(() => {
        
        const searchInfo = async () => {
            const {data} = await axios.get('https://disease.sh/v3/covid-19/all');
            setResults({
                globalCases: data.cases,
                globalDeaths: data.deaths
            });
        }

        const searchCountry = async () => {
            const {data} = await axios.get('https://disease.sh/v3/covid-19/countries');
            const countries = data.map((country) => ({
                name: country.country,
                info: country.countryInfo,
                results: {
                    totalCases: country.cases,
                    cases: country.casesPerOneMillion / 10,
                    totalDeaths: country.deaths,
                    deaths: country.deathsPerOneMillion / 10
                }
            }));

            setCountryResults(countries);
        }
        
        searchInfo();
        searchCountry();

    }, []);

    const useStyles = makeStyles({
        container: {
            display: 'flex'
        },
        item: {
            flexBasis: '44vw',
            margin: 10
        },
        stats: {
            position: 'absolute',
            bottom: 0,
            left: 8,
            zIndex: 2000
        },
        buttons: {
            justifyContent: 'center',
            margin: 50
        },
        country: {
            position: 'absolute',
            width: '11.2vw',
            bottom: '6vw',
            left: 8,
            zIndex: 1000
        },
        chart: {
            justifyContent: 'center',
            height: '52vh',
            paddingRight: 14,
            paddingLeft: 10,
            paddingTop: 5,
        }

    });

    const classes = useStyles();
    
    return (

        <div className={classes.container}>
            <div>
                <Map 
                    zoom={zoom} 
                    center={center} 
                    activeButton={activeButton}
                    countryResults={countryResults}
                    activeCountry={activeCountry}
                    setHoveredCountry={setHoveredCountry}
                    setActiveCountry={setActiveCountry}
                />
                <div className={classes.stats}>
                    <GlobalStats 
                        results={results} 
                        activeIndex={activeIndex}
                    />
                </div>
            </div>
            <div className={classes.country}>
            <CountryCard
                activeButton={activeButton}
                hoveredCountry={hoveredCountry}
            />
            </div>
            <div className={classes.item}>
                <CardTitle/>
                <Buttons 
                    activeButton={activeButton} 
                    onIndexChange={setActiveIndex} 
                    onButtonChange={setActiveButton}
                    setHoveredCountry={setHoveredCountry}
                />
                <Dropdown 
                    countryResults={countryResults}
                    onCountrySubmit={setActiveCountry}
                    setChartCountry={setChartCountry}
                />
                <div className={classes.chart}>
                    <Chart
                        chartCountry={chartCountry}
                        dataIndex={activeButton} 
                        countryResults={countryResults}
                    />
                </div>
            </div>
        </div>

    );

};

export default App; 
