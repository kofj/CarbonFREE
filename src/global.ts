const globalData = {}

export function setData(key: string, val: any) {
  globalData[key] = val
}

export function getData(key: string) {
  return globalData[key]
}
