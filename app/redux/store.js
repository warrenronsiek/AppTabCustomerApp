/**
 * Created by warren on 1/17/17.
 */
import reducer from './reducers/index';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';

function configureStore(initialState) {
  let store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore()