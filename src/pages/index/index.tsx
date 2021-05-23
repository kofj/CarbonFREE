import { Component, } from 'react'
import { connect } from 'react-redux'
import Taro from "@tarojs/taro";
import { View, Button, Text } from '@tarojs/components'
import { AtDivider, AtCard, AtList, AtListItem, AtAvatar } from "taro-ui"

import { add, minus } from '../../actions/counter'
import { Counter, UserState } from "../../constants/types";
import { update_userinfo } from "../../actions/user";
import { Card } from "../../components/Card/card";
import Auth from "../../components/Auth/Auth";

import './index.scss'


type PageStateProps = {
  counter: Counter,
  user: UserState,
  update_userinfo(user: UserState): void,
  add: () => void,
  dec: () => void,
}

type PageState = {
  deny: string
}

class Index extends Component<PageStateProps, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      deny: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
    console.log(this.props.user);
  }

  componentWillUnmount() { }

  componentDidShow() {
  }

  componentDidHide() { }

  componentDidMount() {
  }

  // custom funcs
  getUserProfile = () => {
    this.setState({ deny: "获取授权中" })
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
      }
    }).catch(err => {
      console.log("获取授权失败", err);
      this.setState({ deny: "授权用户信息并登录后才能使用" });
    })
  }

  render() {
    return (
      <View className='index' >
        <Auth>
          <View>
            <View className="userinfo">
              <AtAvatar circle={true}
                size="large" className="userinfo-avatar"
                image={this.props.user.userInfo?.avatarUrl} />
              <Text>{this.props.user.userInfo?.nickName}</Text>
            </View>

            <AtDivider lineColor="#f7f7f7" height="12rpx"></AtDivider>

            <Card title="卡片">
              <Text>Hi!</Text>
            </Card>

            <View>
              <AtCard
                note='累计碳排放 999 Kg'
                extra='额外信息'
                title='本月记录'
              >
                <Text>用户昵称：{this.props.user.userInfo?.nickName}</Text>
                <Button onClick={this.props.add}>{this.props.counter.num}</Button>
              </AtCard>
            </View >
            <AtDivider lineColor="#f7f7f7" height="12"></AtDivider>
            <View>
              <AtCard
                // note='累计碳排放 999 Kg'
                // extra='额外信息'
                title='记录'
              >
                <AtList>
                  <AtListItem title='标题文字' />
                  <AtListItem title='标题文字' arrow='right' />
                  <AtListItem title='标题文字' extraText='详细信息' />
                  <AtListItem title='禁用状态' disabled extraText='详细信息' />
                </AtList>
              </AtCard>

            </View>
          </View>
        </Auth>
        {/* {!this.props.user.isAuthorized &&
          <View className="login">
            <Button onClick={this.getUserProfile}>授权登录</Button>
            <Text>{this.state.deny}</Text>
          </View>
        }
        {
          this.props.user.isAuthorized &&

        } */}
      </View >
    )
  }
}

export default connect(
  (state: {
    counter: Counter,
    user: UserState,
  }) => ({
    counter: state.counter,
    user: state.user,
  }),
  (dispatch) => ({
    update_userinfo(userState: UserState) {
      dispatch(update_userinfo(userState))
    },
    add() {
      dispatch(add())
    },
    dec() {
      dispatch(minus())
    }
  })
)(Index)
