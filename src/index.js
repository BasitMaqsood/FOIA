import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import * as serviceWorker from './serviceWorker';
import 'react-toastify/dist/ReactToastify.css';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A529C' },
    secondary: { main: '#DDDDDD' },
  },
});
const themedApp = (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </MuiThemeProvider>
);
ReactDOM.render(themedApp, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
