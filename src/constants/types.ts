export interface UserState {
  tips?: string,
  isAuthorized?: boolean,
  openId?: string,
  cloudId?: string,
  userInfo?: {
    avatarUrl: string,
    nickName: string,
    province: string,
    city: string,
    gender: number,
  }
}

export interface Counter {
  num: number,
}

