/**
 * Created by warren on 1/17/17.
 */
import reducer from './reducers/index';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

function configureStore(initialState) {
  let store = __DEV__
    ? createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
    : createStore(reducer, composeWithDevTools(applyMiddleware(thunk)), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) ;

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore()