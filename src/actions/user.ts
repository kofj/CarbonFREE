import {
  UPDATE_OPENID,
  UPDATE_USERINFO
} from '../constants/user'

export const update_openid = (payload: string) => {
  return {
    type: UPDATE_OPENID,
    payload
  }
}
export const update_userinfo = (payload: any) => {
  return {
    type: UPDATE_USERINFO,
    payload
  }
}

