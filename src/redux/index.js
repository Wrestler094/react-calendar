import {combineReducers, createStore} from "redux"
import userReducer from "./userAuth"
import groupReducer from "./groups";
import classesReducer from "./classes";

const rootReducer = combineReducers({
    user: userReducer,
    groups: groupReducer,
    dates: classesReducer
})

const store = createStore(rootReducer)
store.subscribe(() => {
    console.log(store.getState())
})
export default store