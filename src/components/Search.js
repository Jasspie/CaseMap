import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({

    option: {
        minHeight: 50,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        cursor: 'pointer',
        paddingTop: 20,
        boxSizing: 'border-box',
        outline: '10',
        WebkitTapHighlightColor: 'transparent',
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,
    },
});

const Dropdown = ({ countryResults, onCountrySubmit, setChartCountry }) => {

    const countryLabel = countryResults.map(country => (country.name));

    const classes = useStyles();

    return (
        <Autocomplete
            id="auto-highlight"
            size="medium"
            options={countryLabel}
            autoHighlight
            renderInput={(params) => <TextField {...params} label="Search for a Country" variant="outlined" />}
            className = {`${classes.option}`}
            onChange={(event,value) => {
                onCountrySubmit(value);
            }}
            onInputChange={(event,inputValue) => {
                setChartCountry(inputValue);
            }}
      />
    );

};


export default Dropdown;