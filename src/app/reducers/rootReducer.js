import { combineReducers } from "redux";
import testReducer from "../../features/testarea/testReducer";
import personsReducer from "../../features/Persons/personsReducer";

const rootReducer = combineReducers({
    test: testReducer,
    persons:personsReducer
})

export default rootReducer;