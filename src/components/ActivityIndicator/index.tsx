import { View } from '@tarojs/components'
import { AtActivityIndicator } from "taro-ui"

function ActivityIndicator() {
  return (
    <View style={{ display: 'flex', justifyContent: 'center', paddingTop: '30rpx', paddingBottom: '30rpx' }}>
      <AtActivityIndicator></AtActivityIndicator>
    </View>
  );
}

export default ActivityIndicator;
