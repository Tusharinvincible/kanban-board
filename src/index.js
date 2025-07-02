import React from 'react';
import ReactDOM from 'react-dom';
// import {createRoot} from "react-dom/client"
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
