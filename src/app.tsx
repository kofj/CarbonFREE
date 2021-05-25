import Taro from "@tarojs/taro";
import { Component } from 'react';
import { Provider } from 'react-redux'
import configStore from "./store";
import AppContainer from "./pages/app/app";
import { View } from '@tarojs/components'

import "./app.scss";
const store = configStore();

export default class App extends Component {

  componentDidMount() {
    Taro.cloud.init()
  }

  componentDidShow() { }

  componentDidHide() { }

  componentCatchError() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <View>
        <Provider store={store}>
          <AppContainer />
          {this.props.children}
        </Provider >
      </View>
    )
  }
}
