import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from '../../_reducers';
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth','registration','lang','hostName']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const dev=(process.env.NODE_ENV !== 'production');


let middleWareList=[thunkMiddleware];
if(dev)middleWareList.push(logger);

const middleWare = composeEnhancers(
    applyMiddleware(
        ...middleWareList
    )
);


let store = createStore(persistedReducer,middleWare);
let persistor = persistStore(store);

export{
    store,
    persistor
}
