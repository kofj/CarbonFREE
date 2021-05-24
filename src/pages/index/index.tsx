import { Component, } from 'react'
import { connect } from 'react-redux'
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Button, Text } from '@tarojs/components'
import { AtDivider, AtCard, AtList, AtListItem, AtAvatar, AtButton } from "taro-ui"

import { add, minus } from '../../actions/counter'
import { Counter, UserState } from "../../constants/types";
import { update_userinfo } from "../../actions/user";
import { Card } from "../../components/Card/card";
import Auth from "../../components/Auth/Auth";
import { setData } from "../../global";

import './index.scss'


type PageStateProps = {
  counter: Counter,
  user: UserState,
  update_userinfo(user: UserState): void,
  add: () => void,
  dec: () => void,
}

type PageState = {
  pageParams?: any,
}

class Index extends Component<PageStateProps, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      pageParams: getCurrentInstance()?.router?.params,
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
  shortcut(idx: number, _: any): any {
    // wx.switchTab 不能传递 queryString，通过 globalData 传递

    switch (idx) {
      case 1:
        setData("shortcut_group", 0)
        setData("shortcut_action", 100)
        setData("shortcut_note", "低碳骑行")
        break;

      case 2:
        setData("shortcut_group", 0)
        setData("shortcut_action", 200)
        setData("shortcut_note", "公共出行")
        break;

      case 3:
        setData("shortcut_group", 1)
        setData("shortcut_action", 400)
        setData("shortcut_note", "家庭耗电")
        break;

      default:
        setData("shortcut_group", 0)
        setData("shortcut_action", 100)
        setData("shortcut_note", "低碳骑行")
        break;
    }
    wx.switchTab({ url: "../record/record" })
  }

  render() {
    return (
      <View className='index' >
        <Auth debug={this.state.pageParams["debug"]}>
          <View>
            <View className="userinfo">
              <AtAvatar circle={true}
                size="large" className="userinfo-avatar"
                image={this.props.user.userInfo?.avatarUrl} />
              <Text>{this.props.user.userInfo?.nickName}</Text>
            </View>

            <AtDivider lineColor="#f7f7f7" height="16"></AtDivider>

            <Card title="快捷记录">
              <View className="shortcut">
                <AtButton className="green" onClick={(e) => { this.shortcut(1, e) }}>绿色骑行</AtButton>
                <AtButton className="green" onClick={(e) => { this.shortcut(2, e) }}>公交通勤</AtButton>
                <AtButton className="green" onClick={(e) => { this.shortcut(3, e) }}>家庭耗电</AtButton>
              </View>
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
