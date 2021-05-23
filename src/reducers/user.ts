import { UPDATE_AUTH_TIPS, UPDATE_USERINFO } from '../constants/user'
import { UserState } from "../constants/types";


const userInitState: UserState = {
  isAuthorized: false,
  openId: "",
  userInfo: undefined
}

export default function user(state = userInitState, action: any) {
  switch (action.type) {
    case UPDATE_AUTH_TIPS:
      return { ...state, tips: action.payload }
    case UPDATE_USERINFO:
      return { ...state, ...action.payload }

    default:
      return state
  }
}
