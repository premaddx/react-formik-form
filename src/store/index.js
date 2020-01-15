import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const thunkMiddleware = applyMiddleware(thunk);
const store = createStore(rootReducer, thunkMiddleware);

export default store;
