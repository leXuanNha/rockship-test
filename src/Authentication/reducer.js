import * as AuthActionType from "./constants";

const defaultState = {
  authenticated: false,
  UserProfile: null
};

export default function UserStore(state = defaultState, action) {
  switch (action.type) {
    case AuthActionType.SET_CURRENT_USER:
      return {
        ...state,
        authenticated: true,
        UserProfile: action.data
      };
    default:
      return state;
  }
}
