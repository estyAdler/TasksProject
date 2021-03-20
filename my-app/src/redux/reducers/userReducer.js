import produce from 'immer';
import createReducer from './reducerUntils'

const initialState = {
    user: {
      
    }
}
const users = {
    setUser(state, action) {
        state.user = action.payload;
    },
}

export default produce((state, action) => createReducer(state, action, users), initialState)