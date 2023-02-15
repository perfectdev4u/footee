import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import colors from '../../theme/colors';
import commonStyle from '../../theme/commonStyle';
import CustomImage from '../customImage';
import CustomText from '../customText';

export default memo(function DrawerMenuItem({label, onPress, image, isActive}) {
  return (
    <TouchableOpacity
      onPress={onPress && onPress}
      style={[
        commonStyle.row(),
        {
          paddingHorizontal: 10,
          marginTop: 30,
        },
      ]}>
      <View
        style={{
          padding: 3,
          backgroundColor: isActive ? colors.WHITE : colors.THEME_COLOR,
          borderRadius: 3,
        }}
      />
      <CustomImage
        source={image}
        style={{
          width: 20,
          height: 20,
          marginRight: 7,
          marginLeft: 13,
        }}
      />
      <CustomText fontSize={13} fontWeight={'400'} color={colors.WHITE}>
        {label}
      </CustomText>
    </TouchableOpacity>
  );
});
