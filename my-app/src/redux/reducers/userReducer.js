import produce from 'immer';
import createReducer from './reducerUntils'

const initialState = {
    user: {
      
    }
}
const users = {
    setUser(state, action) {
        debugger
        console.log(action.payload)
        state.user = action.payload;
        console.log('staaaaaaaaaaaaaaa',state.user)
    },
}

export default produce((state, action) => createReducer(state, action, users), initialState)