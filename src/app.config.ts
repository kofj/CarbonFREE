export default {
  pages: [
    'pages/index/index',
    'pages/record/record',
    'pages/mine/mine'
  ],
  tabBar: {
    // custom: true,
    selectedColor: '#d43c33',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: 'assets/loading.png',
        selectedIconPath: 'assets/on/loading.png',
        text: '碳迹'
      },
      {
        pagePath: 'pages/record/record',
        iconPath: 'assets/add.png',
        selectedIconPath: 'assets/on/add.png',
        text: '记录'
      },
      {
        pagePath: 'pages/mine/mine',
        iconSize: 64,
        iconPath: 'assets/user.png',
        selectedIconPath: 'assets/on/user.png',
        text: '我的'
      },
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    // navigationBarTitleText: '碳迹',
    navigationBarTextStyle: 'black'
  }
}
