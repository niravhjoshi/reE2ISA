import React from 'react';
import ReactDOM from 'react-dom';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import {Provider} from 'react-redux';
import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/common/utils/ScrollToTop';
// import { loadPersons } from './features/Persons/personsActions';
// import {loadEarningtype} from './features/EarningTypes/earningtypeActions';
import ReduxToastr from 'react-redux-toastr';

const store = configureStore();
// store.dispatch(loadPersons())
// store.dispatch(loadEarningtype())
//console.log(store.getState())
const rootElement = document.getElementById('root');

const render = () => {
    ReactDOM.render(
       <Provider store ={store}>
       <BrowserRouter>
       <ScrollToTop>
           <ReduxToastr
           position='bottom-right'
           transitionIn='fadeIn'
           transitionOut='fadeOut'
           />
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
