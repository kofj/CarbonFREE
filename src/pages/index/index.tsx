import { Component } from 'react'
import { connect } from 'react-redux'
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Button, Text } from '@tarojs/components'
import { AtDivider, AtCard, AtList, AtListItem } from "taro-ui"

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
        <AtDivider lineColor="#f7f7f7" height="12"></AtDivider>
        <View>
          <AtCard
            note='累计碳排放 999 Kg'
            // extra='额外信息'
            title='本月记录'
          >
            <Button>hi!</Button>
          </AtCard>
        </View>
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
      </View >
    )
  }
}

export default Index
