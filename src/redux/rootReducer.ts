import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

// slices
import globalReducer from 'redux/slices/global';
import productReducer from 'redux/slices/product';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const combineReducer = combineReducers({
  global: globalReducer,
  product: productReducer,

});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'global/logout') {
    // check for action type
    state = undefined;
  }
  return combineReducer(state, action);
};

export { rootReducer, rootPersistConfig };
