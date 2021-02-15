import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const Chart = ({ countryResults, chartCountry, dataIndex }) => {

    const [results, setResults] = useState([]);

    const countryLabel = countryResults.map(country => (country.name));

    if (dataIndex === 'totalCases') {
        dataIndex = 'cases';
    } else if (dataIndex === 'totalDeaths') {
        dataIndex = 'deaths';
    }
    
    const options = {
        legend: {
            display: false
        },
        elements:{
            point: {
                radius: 0.5
            }
        },
        maintainAspectRatio: false,
        aspectRatio: 1,
        scales: {
            xAxes: [
                {
                    type: 'time',
                    title: {
                        format: 'MM/DD/YY',
                    },
                    gridLines: {
                        display: false,
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        userCallback: function(value, index, values) {
                            value = value.toString();
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(',');
                            return value;
                        }       
                    },
                    gridLines: {
                        display: false,
                    }
                }
            ]
        },
        title: {
            display: true,
            text: `Historical daily new ${dataIndex} in ${chartCountry}`
        },

        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var value = data.datasets[0].data[tooltipItem.index].y;
                    console.log(value);
                    value = value.toString();
                    value = value.split(/(?=(?:...)*$)/);
                    value = value.join(',');
                    return value;
                }
            } 
        }
    }

    useEffect(() => {

        if (countryLabel.includes(chartCountry) === true) {

            const searchInfo = async () => {
                try {
                    const {data} = await axios.get(`https://disease.sh/v3/covid-19/historical/${chartCountry}?lastdays=500`);
                    let chartData = [];
                    let prevDataPoint;
                    for (let date in data.timeline[dataIndex]) {
                        if (prevDataPoint) {
                            let newDataPoint = {
                                x: date,
                                y: `${data.timeline[dataIndex][date] - prevDataPoint}`
                            };
                            chartData.push(newDataPoint);
                        }
                        prevDataPoint = data.timeline[dataIndex][date];
                    }
                    setResults(chartData);
                }
                catch(err) {
                    console.log(err);
                    setResults(null);
                }
            }
            if (chartCountry) {
                searchInfo(chartCountry);
            }
        } else {
            setResults(null);
        }

    }, [chartCountry, dataIndex]);


    if (results !== null && chartCountry !== null) {
        return (
            <Line
                data={{
                    datasets: [
                        {
                            backgroundColor: 'rgba(111, 159, 191, 0.8)',
                            borderColor: '#135BA1',
                            borderWidth: 0.75,
                            data: results,
                        }
                    ]
                }}
                options={options}
            /> 
        )
    } else {
        return null;
    }
}

export default Chart;