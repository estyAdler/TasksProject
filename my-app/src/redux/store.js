import {createStore} from 'redux';
import userReducer from './reducers/userReducer';

const store = createStore(userReducer)

window.store = store
export default store

