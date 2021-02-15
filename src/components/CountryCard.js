import React from 'react';
import { Card, CardContent, CardActionArea, CardMedia, Typography, makeStyles } from '@material-ui/core';

const CountryCard = ({activeButton, hoveredCountry}) => {

    const toString = (num) => {
        if (num) {
            num = Math.round(num);
            return num.toLocaleString();
        };
    };
    
    const getIndex = () => {
        if (activeButton === 'cases') {
            return 'Cases/100k'
        } else if (activeButton === 'deaths') {
            return 'Deaths/100k'
        } else if (activeButton === 'totalCases') {
            return 'Total Cases'
        } else if (activeButton === 'totalDeaths') {
            return 'Total Deaths'
        } else {
            return null;
        }
    }

    const useStyles = makeStyles({
        root: {
            border: 'none',
        },
        media: {
            width: '100%',
        },
        country: {
            fontWeight: 900,
            fontSize: '1.2vw'
        },
        details: {
            fontWeight: 400,
            fontSize: '0.8vw'
        },
        number: {
            fontWeight: 900,
            fontSize: '0.8vw',
            color: '#CC0101'
        }
    });

    const classes = useStyles();

    if (hoveredCountry !== null) {
        
        const name = hoveredCountry.name;
        const flag = hoveredCountry.info.flag;
        const results = toString(hoveredCountry.results[activeButton]);
        const index = getIndex();

        return (
            <Card className={classes.root} variant='outlined'>
                <CardActionArea>
                    <CardMedia
                        component='img'
                        alt={`${name} Flag`}
                        image={flag}
                        title='Country Flag'
                        className={classes.media}
                    />
                    <CardContent>
                        <Typography color='primary'className={classes.country}>
                            {name}
                        </Typography>
                        <Typography color='primary'className={classes.details}>
                            {index} | <span className={classes.number}>{results}</span>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );

    } else {

        return null;
    }
}

export default CountryCard;

