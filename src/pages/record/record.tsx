import { Component } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import Taro, { getCurrentInstance } from "@tarojs/taro";
import Auth from "../../components/Auth/Auth";
import { AtDivider, AtForm, AtInput, AtButton, AtList, AtListItem, AtSegmentedControl } from 'taro-ui'

import './record.scss'

type PageState = {
  pageParams?: any,
  group?: number,
  type: number,
  note: string
  value: number
  start_date?: Date,
  end_date?: Date,
}

const db = wx.cloud.database()
const _ = db.command
export default class Record extends Component<{}, PageState> {
  constructor(props) {
    super(props)
    this.state = {
      pageParams: getCurrentInstance()?.router?.params,
      group: 0,
      type: 0,
      value: 0,
      note: "",
      start_date: new Date(),
      end_date: new Date(),
    }
  }

  componentWillMount() { }

  componentDidMount() {
    console.log("pageParams", this.state.pageParams)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  add = (value: number) => {
    console.log("add")
    db.collection("tests").add({
      data: {
        name: "xxx",
        value: _.inc(value)
      }
    })
  }

  onSubmit() { }
  onReset() { }

  // custom funcs

  selector = [
    { name: "耗电量", value: 100, unit: "度" },
    { name: "燃气", value: 200, unit: "m³" },
    { name: "汽油", value: 300, unit: "升" },
  ]
  render() {
    return (
      <View className='record'>
        <Auth debug={this.state.pageParams["debug"]}>
          <AtForm onSubmit={this.onSubmit.bind(this)}
            onReset={this.onReset.bind(this)}>
            <AtSegmentedControl
              values={['个人', '家庭']}
              onClick={idx => { this.setState({ group: idx }) }}
              current={this.state.group || 0}
            />

            <AtDivider lineColor="#f7f7f7" height="26"></AtDivider>
            <Picker mode='selector' rangeKey="name" range={this.selector} onChange={e => { this.setState({ type: e.detail.value as number }) }}>
              <AtList>
                <AtListItem
                  title='类型'
                  extraText={this.selector[this.state.type].name}
                />
              </AtList>
            </Picker>

            <AtInput
              clear
              name='value'
              title='消耗'
              type='digit'
              placeholder='请输入数字'
              value=""
              onChange={_ => { }}
            >
              <Text className="unit">{this.selector[this.state.type].unit}</Text>
            </AtInput>

            <AtInput
              name='note'
              title='备注'
              type='text'
              placeholder='选填'
              value={this.state.note}
              onChange={_ => { }}
            />

            <Picker mode='date' value="" end={this.state.end_date?.toLocaleDateString()} onChange={e => { this.setState({ start_date: new Date(e.detail.value) }) }}>
              <AtList>
                <AtListItem title='开始日期' extraText={this.state.start_date?.toLocaleDateString()} />
              </AtList>
            </Picker>
            <Picker mode='date' value="" start={this.state.start_date?.toLocaleDateString()} end={new Date().toLocaleDateString()} onChange={e => { this.setState({ end_date: new Date(e.detail.value) }) }}>
              <AtList>
                <AtListItem title="截止日期" extraText={this.state.end_date?.toLocaleDateString()} />
              </AtList>
            </Picker>

            <AtDivider lineColor="#f7f7f7"></AtDivider>
            <AtButton formType='submit' className="save">保存</AtButton>
            <AtDivider lineColor="#f7f7f7" height="16"></AtDivider>
            <AtButton formType='reset'>重置</AtButton>

          </AtForm>
        </Auth>
      </View >
    )
  }
}
