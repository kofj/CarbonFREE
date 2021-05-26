import { Component, } from 'react'
import { connect } from 'react-redux'
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Text } from '@tarojs/components'
import {
  AtDivider,
  AtCard,
  AtList,
  AtListItem,
  AtAvatar,
  AtButton,
} from "taro-ui"

import { UserState } from "../../constants/types";
import { update_userinfo } from "../../actions/user";
import { Card } from "../../components/Card/card";
import Auth from "../../components/Auth/Auth";
import { $record, setData, carbonTable, findCarbonTab, formatCarbon, formatYmD } from "../../global";

import './index.scss'


type PageStateProps = {
  user: UserState,
  update_userinfo(user: UserState): void,
}

type PageState = {
  pageParams?: any,
  list: Record<string, any>,
  showActivity: boolean,
}

class Index extends Component<PageStateProps, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      pageParams: getCurrentInstance()?.router?.params,
      list: {},
      showActivity: false,
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
    let $ = this
    $record
      // 按 start_date 降序
      .orderBy('start_date', 'desc')
      .orderBy('days', 'desc')
      // 取按 orderBy 排序之后的前 10 个
      .limit(5)
      // 筛选语句
      .where({
        // 填入当前用户 openid，或如果使用了安全规则，则 {openid} 即代表当前用户 openid
        _openid: '{openid}'
      })
      // 发起监听
      .watch({
        onChange: function (snapshot) {
          console.log('snapshot', snapshot)
          $.setState({ list: snapshot.docs })
        },
        onError: function (err) {
          console.error('the watch closed because of error', err)
        }
      })
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

  onReachBottom() {
    console.log("到底了")
    this.setState({ showActivity: true })
  }

  render() {
    return (
      <View className='index' >
        {/* <View className="code">{JSON.stringify(this.state.list)}</View> */}
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
                // note='累计碳排放 999 Kg'
                extra='查看更多'
                title='最近记录'
                onClick={_ => { wx.switchTab({ url: "../mine/mine" }) }}
              >
                <View>
                  <AtList>
                    {Object.entries(this.state.list).map((key): any => {
                      let s = findCarbonTab(key[1].action)
                      let actionClass = "good-action"
                      if (s.effect == "排放") actionClass = "bad-action"
                      return (
                        <View>
                          <AtListItem
                            className={actionClass}
                            title={`${s.action} ${key[1].value} ${s.unit}${s.name}`}
                            extraText={`${s.effect}${formatCarbon(s.carbon * key[1].value)}`}
                            note={`自${formatYmD(key[1].start_date)}, ${key[1].days >>> 0}天`}
                          />
                        </View>)
                    })
                    }
                  </AtList>
                </View>
              </AtCard>
            </View >
            <AtDivider lineColor="#f7f7f7" height="12"></AtDivider>

            <View>
              <AtCard
                // note='累计碳排放 999 Kg'
                // extra='额外信息'
                title='计算规则'
              >
                <AtList>
                  {carbonTable.map((v, k): any => {
                    console.log("计算规则", v, v)
                    let actionClass = "good-action"
                    if (v.effect == "排放") actionClass = "bad-action"

                    return (
                      <AtListItem
                        className={actionClass}
                        title={`${k} ${v.action}  ${v.name}`}
                        note={`每${v.unit}${v.effect} ${v.carbon}克碳`}
                      />)
                  })}
                </AtList>
              </AtCard>
              <AtDivider lineColor="#f7f7f7" height="20"></AtDivider>
            </View>

          </View>
        </Auth>

      </View >
    )
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
  })
)(Index)
