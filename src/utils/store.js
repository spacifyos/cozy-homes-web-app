import { createStore, applyMiddleware, combineReducers } from "redux";
import Immutable from "seamless-immutable";
import createSagaMiddleware from "redux-saga";
import { createWhitelistFilter } from "redux-persist-transform-filter";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducers } from "@/src/reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "@/src/sagas";

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const persistConfig = {
  key: "nextjs",
  // whitelist: ["common"],
  storage,
};

// const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = createStore(
  rootReducers,
  bindMiddleware([sagaMiddleware]),
);

store.sagaTask = sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store);
