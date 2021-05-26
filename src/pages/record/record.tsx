import { Component } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import Taro, { getCurrentInstance } from "@tarojs/taro";
import Auth from "../../components/Auth/Auth";
import {
  AtDivider,
  AtForm,
  AtInput,
  AtButton,
  AtList,
  AtListItem,
  AtSegmentedControl,
  AtToast,
  AtCurtain,
} from 'taro-ui'
import { getData, findCarbonTab, carbonTable, formatYmD } from "../../global";

import './record.scss'

type PageState = {
  pageParams?: any,
  group?: number,
  action: number,
  note: string
  value: number
  start_date: Date,
  end_date: Date,
  toastText?: string,
  toastIsOpened: boolean,
  toastStatus?: "success" | "loading" | "error" | undefined,
  days: number,
}

const db = wx.cloud.database()
// const _ = db.command
export default class Record extends Component<{}, PageState> {
  constructor(props) {
    super(props)
    let now = new Date(formatYmD(new Date()))
    this.state = {
      pageParams: getCurrentInstance()?.router?.params,
      group: 0,
      action: 100,
      value: 0,
      note: "",
      start_date: now,
      end_date: now,
      toastIsOpened: false,
      days: 1,
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

  // custom funcs
  changeAction = (event) => {
    let value = carbonTable[event.detail.value]?.value;
    this.setState({ action: value });
  }

  onSubmit = () => {
    this.setState({ toastIsOpened: true, toastStatus: "loading", toastText: "保存中..." })
    let s = this.state
    if (s.value <= 0) {
      this.setState({ toastIsOpened: true, toastStatus: "error", toastText: `请填写${findCarbonTab(this.state.action).action}数值`, })
      return
    }
    db.collection("tests").add({
      data: {
        group: s.group,
        action: s.action,
        note: s.note,
        value: s.value,
        start_date: s.start_date,
        end_date: s.end_date,
        days: s.days,
        carbon: s.days * s.value * findCarbonTab(s.action).carbon,
        crated_at: new Date(),
        updated_at: new Date(),
      }
    }).then((resp) => {
      this.onReset()
      this.setState({ toastIsOpened: true, toastStatus: "success", toastText: "保存成功", })
      console.log("save ok", resp)
    }).catch((err) => {
      this.setState({ toastIsOpened: true, toastStatus: "error", toastText: "报错失败，错误信息：" + err, })
      console.error("save db failed:", err)
    })
  }
  onReset = () => {
    this.setState({ group: 0 })
    this.setState({ action: 100 })
    this.setState({ note: "" })
  }

  onClose = (event: any): any => {
    this.setState({
      toastIsOpened: false
    })
    return event
  }

  calcDays(start: Date, end: Date) {
    let days = Math.round((end.getTime() - start.getTime()) / 86400000) + 1
    this.setState({ days: days })
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
          <AtCurtain
            closeBtnPosition="top-right"
            isOpened={this.state.toastIsOpened}
            onClose={(e) => this.onClose(e)}
          >
            <AtToast
              duration={0}
              onClose={(e) => this.onClose(e)}
              isOpened={this.state.toastIsOpened}
              status={this.state.toastStatus}
              text={this.state.toastText}
            ></AtToast>
          </AtCurtain>

          <AtForm>
            <AtSegmentedControl
              values={['个人', '家庭']}
              onClick={idx => { this.setState({ group: idx }) }}
              current={this.state.group || 0}
            />

            <AtDivider lineColor="#f7f7f7" height="26"></AtDivider>
            <Picker mode='selector' rangeKey="name" range={carbonTable} onChange={this.changeAction}>
              <AtList>
                <AtListItem
                  title='类型'
                  extraText={findCarbonTab(this.state.action)?.name}
                />
              </AtList>
            </Picker>

            <AtInput
              clear
              name='value'
              title={findCarbonTab(this.state.action)?.action}
              type='digit'
              placeholder='请输入数字'
              value={this.state.value.toString() || ""}
              onChange={(v: number) => { this.setState({ value: v }) }}
            >
              <Text className="unit">{findCarbonTab(this.state.action)?.unit}</Text>
            </AtInput>

            <AtInput
              name='note'
              title='备注'
              type='text'
              placeholder='选填'
              value={this.state.note}
              onChange={_ => { }}
            />

            <Picker mode='date' value="" end={this.state.end_date?.toLocaleDateString()} onChange={e => {
              let date = new Date(e.detail.value)
              this.setState({ start_date: date })
              this.calcDays(date, this.state.end_date)
            }}>
              <AtList>
                <AtListItem title='开始日期' extraText={formatYmD(this.state.start_date)} />
              </AtList>
            </Picker>
            <Picker mode='date' value="" start={this.state.start_date?.toLocaleDateString()} end={new Date().toLocaleDateString()} onChange={e => {
              let date = new Date(e.detail.value)
              this.setState({ end_date: date })
              this.calcDays(this.state.start_date, date)
            }}>
              <AtList>
                <AtListItem title="截止日期" extraText={formatYmD(this.state.end_date)} />
              </AtList>
            </Picker>

            <AtDivider lineColor="#f7f7f7"></AtDivider>
            <AtButton formType='submit' className="save" onClick={this.onSubmit}>保存</AtButton>
            <AtDivider lineColor="#f7f7f7" height="16"></AtDivider>
            <AtButton formType='reset' onClick={this.onReset}>重置</AtButton>

          </AtForm>
        </Auth>
      </View >
    )
  }
}
