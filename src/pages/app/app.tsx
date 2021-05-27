import { Component } from 'react'
import { View } from '@tarojs/components'
import Taro, { } from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './app.scss'
import { connect } from 'react-redux'
import { UserState } from 'src/constants/types';

type AppProps = {
  user: UserState,
  children?: any,
}

class App extends Component<AppProps> {

  componentWillMount() {
    wx.login().then((resp) => {
      console.log("wx.login", resp)
      // wx.cloud.callFunction({
      //   name: "login",
      //   data: {
      //     code: resp.code
      //   }
      // }).then((resp) => {
      //   console.log("tcb.login", resp)
      // })
    })
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='app'>
        {this.props.children}
      </View>
    )
  }
}

export default connect(
  (state: { user: UserState }) => ({
    user: state.user,
  }),
  // (dispatch) => ({ })
)(App)
