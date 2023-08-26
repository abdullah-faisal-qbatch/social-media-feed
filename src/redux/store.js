import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { devToolsEnhancer } from "redux-devtools-extension";

import rootReducers from "./rootReducers";

const store = createStore(
  rootReducers,
  compose(applyMiddleware(thunk), devToolsEnhancer({ trace: true }))
);

export default store;
