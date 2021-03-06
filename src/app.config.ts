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
        iconPath: 'assets/user.png',
        selectedIconPath: 'assets/on/user.png',
        text: '我的'
      },
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#f7f7f7',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f7f7f7'
  }
}
