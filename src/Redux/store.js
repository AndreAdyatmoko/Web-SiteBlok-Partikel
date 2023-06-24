import { createStore, combineReducers } from 'redux';

// Reducer untuk manajemen status login
const initialState = {
  isLogin: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { isLogin: true };
    case 'LOGOUT':
      return { isLogin: false };
    default:
      return state;
  }
};

// Menggabungkan reducer menjadi satu root reducer
const rootReducer = combineReducers({
  auth: authReducer
});

// Membuat Redux store
const store = createStore(rootReducer);

export default store;
