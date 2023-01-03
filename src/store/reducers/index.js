import loading from "./loading";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
   loading: loading
})

export default rootReducer;