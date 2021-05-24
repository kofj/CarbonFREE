import { Component } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import Taro, { getCurrentInstance } from "@tarojs/taro";
import Auth from "../../components/Auth/Auth";
import { AtDivider, AtForm, AtInput, AtButton, AtList, AtListItem, AtSegmentedControl } from 'taro-ui'
import { getData } from "../../global";

import './record.scss'

type PageState = {
  pageParams?: any,
  group?: number,
  action: number,
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
      action: 100,
      value: 0,
      note: "",
      start_date: new Date(),
      end_date: new Date(),
    }
  }

  componentWillMount() { }

  componentDidMount() {
    let params = this.state.pageParams
    if (params["shortcut"]) {
      if (params["group"]) this.setState({ group: parseInt(params["group"]) })
      if (params["action"]) this.setState({ action: parseInt(params["action"]) })
      if (params["note"]) this.setState({ note: params["note"] })
    }
  }

  componentWillUnmount() { }

  componentDidShow() {
    let group = getData("shortcut_group")
    console.log("getData shorcut.group", group)
    if (group) this.setState({ group: group })
    let action = getData("shortcut_action")
    console.log("getData shorcut.action", action)
    if (action) this.setState({ action: action })
    let note = getData("shortcut_note")
    console.log("getData shorcut.note", note)
    if (note) this.setState({ note: note })
  }

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

  changeAction = (event) => {
    let value = this.selector[event.detail.value]?.value;
    this.setState({ action: value });
    console.log("changeAction", value, event, this.state);
  }

  onSubmit() { }
  onReset() { }

  // custom funcs

  selector = [
    { name: "自行车", action: "骑行", value: 100, unit: "公里" },
    { name: "公交/地铁", action: "乘坐", value: 200, unit: "公里" },
    { name: "电动自行车", action: "行驶", value: 300, unit: "公里" },
    { name: "电量", action: "使用", value: 400, unit: "度" },
    { name: "燃气", action: "使用", value: 500, unit: "m³" },
    { name: "汽油", action: "使用", value: 600, unit: "升" },
    { name: "电动汽车", action: "行驶", value: 700, unit: "公里" },
    { name: "燃油汽车", action: "行驶", value: 800, unit: "公里" },
  ]
  foundSelector = (value: number): any => {
    return this.selector.find(element => element.value == value);
  }

  render() {
    return (
      <View className='record'>
        {this.state.pageParams["debug"] &&
          <View className="code">
            <Text >{JSON.stringify(this.state)}</Text>
          </View>
        }

        <Auth debug={this.state.pageParams["debug"]}>
          <AtForm onSubmit={this.onSubmit.bind(this)}
            onReset={this.onReset.bind(this)}>
            <AtSegmentedControl
              values={['个人', '家庭']}
              onClick={idx => { this.setState({ group: idx }) }}
              current={this.state.group || 0}
            />

            <AtDivider lineColor="#f7f7f7" height="26"></AtDivider>
            <Picker mode='selector' rangeKey="name" range={this.selector} onChange={this.changeAction}>
              <AtList>
                <AtListItem
                  title='类型'
                  extraText={this.foundSelector(this.state.action)?.name}
                />
              </AtList>
            </Picker>

            <AtInput
              clear
              name='value'
              title={this.foundSelector(this.state.action)?.action}
              type='digit'
              placeholder='请输入数字'
              value=""
              onChange={_ => { }}
            >
              <Text className="unit">{this.foundSelector(this.state.action)?.unit}</Text>
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
