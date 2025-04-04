import { combineReducers } from "redux";
import { reducer1 } from "./reducer";

//load the reducer
//eg:-reducer1-------------|top


//declaring the root
//using the combine reducer function
//combining all the reducer and assign to root variabl].
const root = combineReducers({
    reducer1
})
export default root;