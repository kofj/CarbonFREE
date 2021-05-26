import { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from '@tarojs/components'
import Taro, { } from "@tarojs/taro";
import Auth from "../../components/Auth/Auth";
import { UserState } from "../../constants/types";
import { update_userinfo } from "../../actions/user";
import {
  AtDivider,
  AtList,
  AtListItem,
} from "taro-ui"
import { $record, findCarbonTab, formatCarbon, formatYmD } from "../../global";
import ActivityIndicator from "../../components/ActivityIndicator/index";

import './mine.scss'

type PageStateProps = {
  user: UserState,
  update_userinfo(user: UserState): void,
}


type PageState = {
  pageParams?: any,
  list: Record<string, any>,
  showActivity: boolean,
  loadAll: boolean,
}

class Mine extends Component<PageStateProps, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      list: {},
      showActivity: false,
      loadAll: false,
    }
  }

  query = $record
    // 按 start_date 降序
    .orderBy('start_date', 'desc')
    .orderBy('days', 'desc')
    // 取按 orderBy 排序之后的前 10 个
    .limit(10)
    // 筛选语句
    .where({
      // 填入当前用户 openid，或如果使用了安全规则，则 {openid} 即代表当前用户 openid
      _openid: '{openid}'
    })

  componentWillMount() {
    const $ = this

    // 发起监听
    this.query.watch({
      onChange: function (snapshot) {
        console.log('snapshot', snapshot, snapshot.docs.length)
        $.setState({ list: snapshot.docs })
      },
      onError: function (err) {
        console.error('the watch closed because of error', err)
      }
    })
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // custom funcs
  onPullDownRefresh() {
    console.log("下拉刷新")
    this.query.get(
      {
        success: (res) => {
          const keys = Object.keys(res.data)
          let list = {}
          keys.map((key): any => {
            list[res.data[key]._id] = res.data[key]
          })
          this.setState({ list: list })
          console.log("更新成功")
          this.setState({
            showActivity: true,
          })
          if (keys.length < 10) {
            this.setState({
              loadAll: true,
            })
            return
          }
        },
        fail: console.error
      }
    )
  }
  onReachBottom() {
    console.log("到底了")
    if (this.state.loadAll) {
      console.log("加载完了")
      return
    }
    const size = Object.keys(this.state.list).length
    // console.log("list size", size, this.state.list[size - 1])
    this.setState({ showActivity: true })
    this.query.skip(size).get(
      {
        success: (res) => {
          const keys = Object.keys(res.data)
          let list = this.state.list
          keys.map((key): any => {
            list[res.data[key]._id] = res.data[key]
          })
          this.setState({
            showActivity: true,
            list: list,
          })
          if (keys.length < 10) {
            this.setState({
              loadAll: true,
            })
            return
          }
        },
        fail: console.error
      }
    )
  }

  render() {
    return (
      <View className='mine'>
        {/* <View className="code">{JSON.stringify(this.state.list)}</View> */}
        <Auth>
          <AtDivider lineColor="#f7f7f7" height="12"></AtDivider>
          <View className="bgtitle">
            <Text>我的记录</Text>
          </View>
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
          <AtDivider lineColor="#f7f7f7" height="12"></AtDivider>
          {this.state.loadAll && <View className="bginfo"><Text>没有更多数据了</Text></View>}

          {(this.state.showActivity && !this.state.loadAll) && <ActivityIndicator></ActivityIndicator>}
        </Auth>
      </View>
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
)(Mine)
