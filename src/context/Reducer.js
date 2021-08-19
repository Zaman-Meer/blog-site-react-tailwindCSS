const Reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          user: null,
          isFetching: true,
          error: false,
        };
      case "LOGIN_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "LOGIN_FAILURE":
        return {
          user: null,
          isFetching: false,
          error: true,
        };
        case "UPDATE_USER_PROFILE_PIC":
          return {
            ...state,
            user:{...state?.user,profilePic:action.payload}
          }
        case "UPDATE_USER_REQUEST":
          return {
            ...state,
            isFetching:true
          };
        case "UPDATE_USER_SUCCESS":
          return {
            ...state,
            user: {...state.user, username:action.payload},
            isFetching: false,
            error: false,
          };
        case "UPDATE_USER_FAILURE":
          return {
            user: state.user,
            isFetching: false,
            error: true,
          };
      case "LOGOUT":
        return {
          user: null,
          isFetching: false,
          error: false,
        };
      default:
        return state;
    }
  };
  
  export default Reducer;