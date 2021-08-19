
// User login, logout, update Actions
export const LoginRequest = (userCredentials) => ({
    type: "LOGIN_START",
  });
  
  export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
  });
  
  export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
  });
  
  export const Logout = () => ({
    type: "LOGOUT",
  });
  
  export const UpdateUserRequest = () => ({
    type: "UPDATE_USER_REQUEST",
  });
  
  export const UpdateUserSuccess = (user) => ({
    type: "UPDATE_USER_SUCCESS",
    payload: user,
  });
  
  export const UpdateUserFailure = () => ({
    type: "UPDATE_USER_FAILURE",
  });

  export const UpdateUserProfilePic =(pic)=>({
    type:"UPDATE_USER_PROFILE_PIC",
    payload: pic,
  })

//Post create, update, delete Actions

  
  export const CreatePostRequest = (postData) => ({
    type: "CREATE_POST_REQUEST",
  });
  
  export const CreatePostSuccess = (response) => ({
    type: "CREATE_POST_SUCCESS",
    payload: response,
  });
  
  export const CreatePostFailure = () => ({
    type: "CREATE_POST_FAILURE",
  });

    
  export const UpdatePostRequest = (postData) => ({
    type: "UPDATE_POST_REQUEST",
  });
  
  export const UpdatePostSuccess = (response) => ({
    type: "UPDATE_POST_SUCCESS",
    payload: response,
  });
  
  export const UpdatePostFailure = () => ({
    type: "UPDATE_POST_FAILURE",
  });

  export const DeletePostRequest = (postData) => ({
    type: "DELETE_POST_REQUEST",
  });
  
  export const DeletePostSuccess = (response) => ({
    type: "DELETE_POST_SUCCESS",
    payload: response,
  });
  
  export const DeletePostFailure = () => ({
    type: "DELETE_POST_FAILURE",
  });
