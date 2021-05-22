import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { getCurrentInstance } from "@tarojs/taro";

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './record.scss'


type PageState = {
}

export default class Record extends Component<{}, PageState> {
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
      <View className='record'>
        <Text>Record</Text>
      </View>
    )
  }
}
