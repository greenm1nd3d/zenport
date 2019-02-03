import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import WebFont from 'webfontloader';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

WebFont.load({
  google: {
    families: ['Open Sans:400']
  }
});
