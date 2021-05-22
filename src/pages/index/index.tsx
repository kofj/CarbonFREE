import { Component } from 'react'
import { connect } from 'react-redux'
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Button, Text } from '@tarojs/components'

import { add, minus } from '../../actions/counter'
import { Counter } from "../../constants/types";

import './index.scss'


type PageStateProps = {
  counter: Counter,
  add: () => void,
  dec: () => void,
}

type PageState = {
}

@connect(
  ({ counter }) => ({
    counter: counter,
  }),
  (dispatch) => ({
    add() {
      dispatch(add())
    },
    dec() {
      dispatch(minus())
    }
  })
)

class Index extends Component<PageStateProps, PageState> {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() {
  }

  componentDidHide() { }

  componentDidMount() {
    console.log("getCurrentInstance: ", getCurrentInstance())
  }

  // custom funcs

  render() {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <View><Text>{this.props.counter.num}</Text></View>

        {/* 
        <AtTabBar
          fixed
          selectedColor="#d43c33"
          tabList={[
            { title: "碳迹", iconType: "loading-2" },
            { title: "记录", iconType: "add" },
            { title: "我的", iconType: "user" }
          ]}
        /> */}
      </View>
    )
  }
}

export default Index
