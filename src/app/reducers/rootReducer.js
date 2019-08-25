import { combineReducers } from "redux";
import testReducer from "../../features/testarea/testReducer";
import personsReducer from "../../features/Persons/personsReducer";
import {reducer as FormReducer} from 'redux-form';

const rootReducer = combineReducers({
    form: FormReducer,
    test: testReducer,
    persons:personsReducer
})

export default rootReducer;