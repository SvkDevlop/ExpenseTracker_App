import { applyMiddleware, createStore } from "redux";
import root from "./main";
import { thunk } from "redux-thunk";    

//creating store using createStore function.
//pass 2 argument  root and middleware (thunk)
//thunk = create connection link     
const store = createStore(root, applyMiddleware(thunk));

//exporting store for application
export default store;