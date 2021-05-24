import React, { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
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

class Authorized extends Component<AuthorizedProps> {
  constructor(props) {
    super(props);
  }

  getUserProfile = () => {
    this.props.update_auth_tips("获取授权中");
    wx.getUserProfile({
      desc: "授权登录"
    }).then(resp => {
      console.log("getUserProfile", resp, this.props)
      console.log("getUserProfile", resp, this.props)
      wx.getUserInfo({})
      let info = resp.userInfo
      if (info) {
        this.props.update_userinfo({
          isAuthorized: true,
          cloudId: resp["cloudID"],
          userInfo: info
        })
      }
    }).catch(err => {
      console.log("获取授权失败", err);
      this.props.update_auth_tips("授权用户信息并登录后才能使用");
    })
  }

  render() {
    if (this.props.user.isAuthorized || this.props.debug) {
      return (
        React.createElement(
          View, {}, this.props?.children
        )
      )
    } else {
      return (
        React.createElement(
          View, { className: 'login' },
          React.createElement(Button, { onClick: this.getUserProfile }, "授权登录"),
          React.createElement(Text, {}, this.props.user.tips),
        )
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
