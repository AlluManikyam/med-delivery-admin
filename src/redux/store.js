import { applyMiddleware, combineReducers, createStore } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";

//Link reducers of all modules here.
import { user_reducer } from "./userReducer";

let reducers = combineReducers({
  user_reducer,
});

export default createStore(
  reducers,
    composeWithDevTools(
    applyMiddleware(thunk)
  )
);
