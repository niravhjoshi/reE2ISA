import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');

const render = () => {
    ReactDOM.render(<App/>,rootElement);
}

ReactDOM.render(<App />, document.getElementById('root'));

if(module.hot){
    module.hot.accept('./app/layout/App',() => {
        setTimeout(render);
    })
}

render();

serviceWorker.unregister();
