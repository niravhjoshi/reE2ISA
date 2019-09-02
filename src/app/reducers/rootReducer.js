import { combineReducers } from "redux";
import testReducer from "../../features/testarea/testReducer";
import personsReducer from "../../features/Persons/personsReducer";
import {reducer as FormReducer} from 'redux-form';
import modalReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/Register/authReducer";
import asyncReducer from "../../features/async/asyncReducer";


const rootReducer = combineReducers({

    form: FormReducer,
    test: testReducer,
    persons:personsReducer,
    modals: modalReducer,
    auth:authReducer,
    async:asyncReducer
})

export default rootReducer;