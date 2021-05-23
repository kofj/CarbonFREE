import {
  UPDATE_OPENID,
  UPDATE_USERINFO
} from '../constants/user'
import { UserState } from "../constants/types";

export const update_openid = (payload: string) => {
  return {
    type: UPDATE_OPENID,
    payload
  }
}
export const update_userinfo = (userState: UserState) => {
  return {
    type: UPDATE_USERINFO,
    payload: userState
  }
}

