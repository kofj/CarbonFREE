import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { } from "@tarojs/taro";
import Auth from "../../components/Auth/Auth";

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './mine.scss'

type PageState = {
}


export default class Mine extends Component<{}, PageState> {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // custom funcs

  render() {
    return (
      <View className='mine'>
        <Auth>
          Hi!
          <Text>Mine</Text>
        </Auth>
      </View>
    )
  }
}
