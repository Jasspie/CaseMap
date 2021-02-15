import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const Buttons = ({ activeButton, onIndexChange, onButtonChange, setHoveredCountry }) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            textAlign: 'center',
            '& >*': {
                margin: theme.spacing(1),
            },
        },
        sizeSmall: {
            padding: '3px 9px',
            fontSize: theme.typography.pxToRem(11.5),
        },
    }));

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const resetIndex = async (string) => {
        setHoveredCountry(null);
        onButtonChange(null);
        await delay(5);
        onButtonChange(string);
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button 
                color='primary' 
                variant={activeButton === 'cases' ? 'contained' : 'outlined'} 
                className={classes.sizeSmall}
                onClick={() => {
                    onIndexChange('globalCases');
                    onButtonChange(null);
                    resetIndex('cases');
                }}
            >
                Cases/100k
            </Button>
            <Button 
                color='primary' 
                variant={activeButton === 'deaths' ? 'contained' : 'outlined'} 
                className={classes.sizeSmall}
                onClick={() => {
                    onIndexChange('globalDeaths');
                    resetIndex('deaths');
                }}
            >
                Deaths/100k
            </Button>
            <Button 
                color='primary' 
                variant={activeButton === 'totalCases' ? 'contained' : 'outlined'} 
                className={classes.sizeSmall}
                onClick={() => {
                    onIndexChange('globalCases');
                    resetIndex('totalCases');
                    
                }}
            >
                Total Cases
            </Button>
            <Button 
                color='primary' 
                variant={activeButton === 'totalDeaths' ? 'contained' : 'outlined'} 
                className={classes.sizeSmall}
                onClick={() => {
                    onIndexChange('globalDeaths');
                    resetIndex('totalDeaths');
                }}
            >
                Total Deaths
            </Button>
        </div>
    );
};

export default Buttons;