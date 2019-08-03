import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import { configureStore } from './app/store/configureStore';


const store = configureStore();

console.log(store.getState())
const rootElement = document.getElementById('root');

const render = () => {
    ReactDOM.render(
       <Provider store ={store}>
       <BrowserRouter>
        <App/>
        </BrowserRouter>
        </Provider>,
        rootElement);
}

//ReactDOM.render(<App />, document.getElementById('root'));

if(module.hot){
    module.hot.accept('./app/layout/App',() => {
        setTimeout(render);
    })
}

render();

serviceWorker.unregister();
