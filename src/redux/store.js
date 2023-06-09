import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducer';

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
const enhancer = composeEnhancers(
        applyMiddleware(thunk),
        // other store enhancers if any
      );

export const store = createStore(rootReducer, enhancer); // Corrección en esta línea

