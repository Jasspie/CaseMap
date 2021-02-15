import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import App from './App';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#135BA1'
        },
        secondary: {
            main: '#6FA2C1'
        }
    }
});

ReactDOM.render(<ThemeProvider theme={theme}><App/></ThemeProvider>, document.querySelector('#root')); 