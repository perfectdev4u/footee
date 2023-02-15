import React, {memo, useEffect} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import CustomText from '../customText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';

export default memo(function CustomHeader({
  elementColor = colors.WHITE,
  isBackBtnShow = true,
  screenLabel,
  rightComponent,
}) {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View
        style={{
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
        }}>
        {screenLabel && (
          <CustomText fontSize={17} fontWeight={'400'} color={elementColor}>
            {screenLabel}
          </CustomText>
        )}
        {isBackBtnShow && navigation.canGoBack() && (
          <View
            style={{
              position: 'absolute',
              left: 0,
              height: '100%',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" color={elementColor} size={28} />
            </TouchableOpacity>
          </View>
        )}
        {rightComponent && (
          <View
            style={{
              position: 'absolute',
              right: 0,
              height: '100%',
              justifyContent: 'center',
            }}>
            {rightComponent}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
});
