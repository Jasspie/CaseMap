import React from 'react';
import { Card, CardActionArea, CardContent, Typography, makeStyles } from '@material-ui/core';
import { LocationOnRounded } from '@material-ui/icons';

const CardTitle = () => {
    
    const useStyles = makeStyles({
        root: {
            margin: 10,
            border: 'none',
            boxShadow: 'none',
        },
        title: {
            fontSize: '3.8vw',
            color: '#145EA7',
        },
        body: {
            fontSize: '1.2vw',
            color: '#73A5C6',
        },
        icon: {
            fontSize: '4vw',
            color: '#145EA7',
        },
    });
    
    const classes = useStyles();

    return (
        <Card className={classes.root} variant='outlined'>
            <CardActionArea>
                <CardContent>
                    <Typography className={classes.title} align='center'>
                        CaseMap
                        <LocationOnRounded className={classes.icon} align='center'/>
                    </Typography>
                    <Typography className={classes.body} align='center'>
                        An Interactive Map for Tracking COVID-19
                    </Typography> 
                </CardContent>
            </CardActionArea>
        </Card>
    );

};
 
export default CardTitle;