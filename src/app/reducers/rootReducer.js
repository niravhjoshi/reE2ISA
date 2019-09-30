import { combineReducers } from "redux";
import testReducer from "../../features/testarea/testReducer";
import personsReducer from "../../features/Persons/personsReducer";
import {reducer as FormReducer} from 'redux-form';
import modalReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/Register/authReducer";
import asyncReducer from "../../features/async/asyncReducer";
import {reducer as ToastrReducer} from 'react-redux-toastr';

const rootReducer = combineReducers({

    form: FormReducer,
    test: testReducer,
    persons:personsReducer,
    modals: modalReducer,
    auth:authReducer,
    async:asyncReducer,
    toastr:ToastrReducer
})

export default rootReducer;