import { createStore, applyMiddleware, combineReducers } from "redux";
import Immutable from "seamless-immutable";
import createSagaMiddleware from "redux-saga";
import { createWhitelistFilter } from "redux-persist-transform-filter";
import { createTransform } from "redux-persist";
import rootSaga from "../sagas/index";
import verification from "@/src/reducers/verification";
import auth from "@/src/reducers/auth";

const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // convert mySet to an Array.
    return { ...inboundState };
  },
  // transform state being rehydrated
  (outboundState, key) => {
    if (outboundState) {
      outboundState.mergeDeep = (x) => x;
    }
    return Immutable(outboundState);
  },
);

const storage = require("redux-persist/lib/storage").default;

//COMBINING ALL REDUCERS
const combinedReducer = combineReducers({
  verification,
  auth,
});

// BINDING MIDDLEWARE
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const makeStore = ({ isServer }) => {
  // if (isServer) {
  //     //If it's on server side, create a store
  // //    return createStore(combinedReducer, bindMiddleware([thunkMiddleware]));
  // } else {

  //If it's on client side, create a store which will persist
  const { persistStore, persistReducer } = require("redux-persist");
  const sagaMiddleware = createSagaMiddleware();

  const saveSubsetProjectListMovement = createWhitelistFilter("smartMeter", [
    "smartMeterDetail.data.data",
  ]);

  const saveSubsetGloBalMovement = createWhitelistFilter("global");

  const persistConfig = {
    key: "nextjs",
    whitelist: ["smartMeter", "global"], // only counter will be persisted, add other reducers if needed
    storage,
    transforms: [
      SetTransform,
      saveSubsetProjectListMovement,
      saveSubsetGloBalMovement,
    ],
  };

  const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer

  const store = createStore(persistedReducer, bindMiddleware([sagaMiddleware])); // Creating the store again
  store.sagaTask = sagaMiddleware.run(rootSaga);
  store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

  return store;
  //   }
};

// Export the wrapper & wrap the pages/_app.js with this wrapper only
