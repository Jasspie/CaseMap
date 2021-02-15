import React from 'react';
import { Card, CardContent, Typography, makeStyles, CardActionArea } from '@material-ui/core';

const GlobalStats = ({ results, activeIndex }) => {

    const useStyles = makeStyles({
        root: {
            border: 'none',
            boxShadow: 'none'
        },
        activeTitle: {
            fontSize: '1.6vw',
            color: '#20639B',
        },
        title: {
            fontSize: '0.8vw',
            color: '#73A5C6',
        },
        activeNumber: {
            fontWeight: 900,
            color: '#CC0101'
        }
    });

    const toString = (num) => {
        if (num) {
            return num.toLocaleString();
        };
    };
    
    const classes = useStyles();

    return (
        <CardActionArea>
            <Card className={classes.root} variant='outlined'>
                <CardContent>
                    <Typography className={activeIndex === 'globalCases' ? classes.activeTitle : classes.title}>
                        Cases |  <span className={activeIndex === 'globalCases' ? classes.activeNumber : null}> 
                        {toString(results.globalCases)} </span>
                    </Typography>
                    <Typography className={activeIndex === 'globalDeaths' ? classes.activeTitle : classes.title}>
                        Deaths | <span className={activeIndex === 'globalDeaths' ? classes.activeNumber : null}> 
                        {toString(results.globalDeaths)} </span>
                    </Typography> 
                </CardContent>
            </Card>
        </CardActionArea>
    );

};
 
export default GlobalStats;