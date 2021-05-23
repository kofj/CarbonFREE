import {
  UPDATE_AUTH_TIPS,
  UPDATE_USERINFO
} from '../constants/user'
import { UserState } from "../constants/types";

export const update_auth_tips = (payload: string) => {
  return {
    type: UPDATE_AUTH_TIPS,
    payload
  }
}
export const update_userinfo = (userState: UserState) => {
  return {
    type: UPDATE_USERINFO,
    payload: userState
  }
}

