import { UPDATE_OPENID, UPDATE_USERINFO } from '../constants/user'
import { UserState } from "../constants/types";


const userInitState: UserState = {
  login: false,
  openId: "",
  userInfo: {
    avatarUrl: "",
    nickName: "",
  }
}

export default function user(state = userInitState, action: any) {
  switch (action.type) {
    case UPDATE_OPENID:
      return { ...state, openId: action.payload }
    case UPDATE_USERINFO:
      return { ...state, userInfo: action.payload }

    default:
      return state
  }
}
