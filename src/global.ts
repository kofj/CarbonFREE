const globalData = {}

export const $db = wx.cloud.database()
export const $c = $db.command
export const $record = $db.collection("tests")

export function setData(key: string, val: any) {
  globalData[key] = val
}

export function getData(key: string) {
  return globalData[key]
}

// 碳的分子量为12,二氧化碳的分子量为44,44/12＝3.67
export const carbonToCO2Multipe = 3.67

export const carbonTable = [
  { name: "自行车", action: "骑行", value: 100, unit: "公里", effect: "减排", carbon: 50 },
  { name: "公交/地铁", action: "乘坐", value: 200, unit: "公里", effect: "减排", carbon: 50 },
  // { name: "电动自行车", action: "行驶", value: 300, unit: "公里", effect: "减排", carbon: 1 },
  { name: "电力", action: "使用", value: 400, unit: "度(kWh)", effect: "排放", carbon: 735.7 },
  { name: "燃气", action: "使用", value: 500, unit: "m³", effect: "排放", carbon: 51.7 },
  { name: "汽油", action: "使用", value: 600, unit: "升", effect: "排放", carbon: 785 },
  // { name: "电动汽车", action: "行驶", value: 700, unit: "公里", effect: "减排", carbon: 1 },
  { name: "燃油汽车", action: "行驶", value: 800, unit: "公里", effect: "排放", carbon: 62.8 },
  { name: "自来水", action: "使用", value: 900, unit: "立方米", effect: "排放", carbon: 62.8 },
]

export const findCarbonTab = (actionValue: number): any => {
  return carbonTable.find(element => element.value == actionValue);
}

export const formatCarbon = (v: number): String => {
  if (v < 5e5) return `${(v / 1000).toFixed(2)}kg碳`
  return `${(v / 1e6).toFixed(2)}吨碳`
}

export const formatYmD = (date: Date): string => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}
