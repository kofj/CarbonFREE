# 部署指引

## 依赖
- git >= 2.30.0
- nodejs >= v15.12.0
- Taro >= v3.2.8


## 构建与开发
### 准备工作
首先, 克隆本项目的代码到开发机:
```
git clone https://github.com/kofj/CarbonFREE
```
由于本项目使用 Taro 开发框架，故而需要先行安装 Taro 命令行工具:
```
npm install @tarojs/cli
```
进入项目根目录，安装项目需要的 nodejs 库：
```
cd CarbonFREE
npm install
```

### 开发
在项目根目录运行 `npm run dev:weapp` 可以进入开发模式。使用`微信开发者工具`导入项目或者使用 `VS CODE` 等编辑器编辑项目代码即可。

### 构建生产代码
开发模式下，后端数据库、环境变量等与生产环境是不同的。当需要上线小程序的时候，需要使用生产模式编译代码：
```
npm run build:weapp
```


### 后端部署
本项目采用了 TCB 的`云数据库`、`云函数`，故而上线到生产环境需要执行下列工作。
#### 云数据库
在首次部署的时候，需要在云开发环境的云数据库控制台新建 `tests` 和 `records` collection 分别用于测试环境和正式的生产环境。

#### 云函数
云开发代码位于`cloudbase/carbon-free-1gzp5o087d63e0f3` 目录下，当编辑云函数的代码后，可以使用`微信开发者工具`完成部署。以下云函数需要部署：
- login
