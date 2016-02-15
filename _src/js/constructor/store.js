import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/reducer.js';

export default applyMiddleware(thunk)(createStore)(reducer);
