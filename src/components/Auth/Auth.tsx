import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { AtCountdown } from "taro-ui"
import { connect } from 'react-redux'
import { UserState } from '../../constants/types'
import { update_userinfo, update_auth_tips } from '../../actions/user'

type AuthorizedProps = {
  debug?: boolean;
  user: UserState,
  children?: JSX.Element | any,
  update_userinfo(user: UserState): void,
  update_auth_tips(tips: string): void,
}

type PageState = {
  autologin: boolean,
}
class Authorized extends Component<AuthorizedProps, PageState> {
  constructor(props) {
    super(props);
    this.state = {
      autologin: false
    }
  }

  componentDidMount() {
    const info = wx.getStorageSync("userinfo")
    console.log("获取本地信息，用于自动登录", info)
    if (info.nickName) {
      this.props.update_auth_tips("近期授权过使用个人信息，将自动登录");
      this.setState({ autologin: true })
      return
    }
  }

  timeup = () => {
    const info = wx.getStorageSync("userinfo")
    this.props.update_userinfo({
      isAuthorized: true,
      userInfo: info
    })
  }

  getUserProfile = () => {
    this.props.update_auth_tips("获取授权中");
    wx.getUserProfile({
      desc: "授权登录"
    }).then(resp => {
      console.log("getUserProfile", resp, this.props)
      wx.getUserInfo({})
      let info = resp.userInfo
      if (info) {
        this.props.update_userinfo({
          isAuthorized: true,
          cloudId: resp["cloudID"],
          userInfo: info
        })
        wx.setStorageSync("userinfo", info)
      }
    }).catch(err => {
      console.log("获取授权失败", err);
      this.props.update_auth_tips("需要您授权头像、昵称信息用于注册登录");
    })
  }

  render() {
    if (this.props.user.isAuthorized || this.props.debug) {
      return (
        <View>
          {this.props?.children}
        </View>
      )
    } else {
      return (
        <View className="login">
          <Button onClick={this.getUserProfile}>授权登录</Button>
          <Text className="usertips">{this.props.user.tips}</Text>
          {this.state.autologin && <AtCountdown seconds={0} onTimeUp={this.timeup} isShowDay={false} isShowHour={false} />}
        </View>
      )
    }
  }
}

export default connect(
  (state: {
    user: UserState,
  }) => ({
    user: state.user,
  }),
  (dispatch) => ({
    update_userinfo(userState: UserState) {
      dispatch(update_userinfo(userState))
    },
    update_auth_tips(tips: string) {
      dispatch(update_auth_tips(tips))
    }
  })
)(Authorized)
