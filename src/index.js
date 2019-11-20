import React from 'react';
import ReactDOM from 'react-dom';
import webFont from 'webfontloader';
import { Spinner } from './GeneralComponents/LoadingSpinner/loadingSpinner.component';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

webFont.load({
    google: {
        families: ['Pacifico', 'Ubuntu:400,700', 'Vollkorn']
    }
});

ReactDOM.render(
    <div>
        <App />
        <Spinner />
    </div>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
