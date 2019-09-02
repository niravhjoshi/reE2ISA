import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/common/utils/ScrollToTop';
import { loadPersons } from './features/Persons/personsActions';

const store = configureStore();
store.dispatch(loadPersons())
//console.log(store.getState())
const rootElement = document.getElementById('root');

const render = () => {
    ReactDOM.render(
       <Provider store ={store}>
       <BrowserRouter>
       <ScrollToTop>
        <App/>
        </ScrollToTop>
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
