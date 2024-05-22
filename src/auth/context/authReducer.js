export const authReducer = (state = {}, action) => {
    switch (action.type) {
      case "[Auth] Login": {
        return {
          ...state,
          logged: true,
          user: action.payload,
        };
      }
  
      case "[Auth] Logout": {
        return {
          logged: false,
        };
      }
  
      default: {
        return state;
      }
    }
  };
  