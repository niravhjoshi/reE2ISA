import { createStore, applyMiddleware } from "redux";
import {reactReduxFirebase,getFirebase} from 'react-redux-firebase';
import {reduxFirestore,getFirestore} from 'redux-firestore'
import rootReducer from "../reducers/rootReducer";
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";
import firebase from '../config/firebase';

const reactreduxfirebaseConfig ={
    userProfile: 'UsersProfile',
    attachAuthIsReady : true,
    useFirestoreForProfile : true
}

export const configureStore = () =>{
    const middlewares =[thunk.withExtraArgument({getFirebase,getFirestore})]
    const composedEnhancer=composeWithDevTools(applyMiddleware(...middlewares),
                                               reactReduxFirebase(firebase,reactreduxfirebaseConfig),
                                               reduxFirestore(firebase)
                                               );
    const store  = createStore(rootReducer,composedEnhancer)

    return store;
}