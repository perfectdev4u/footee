import React, {memo} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import colors from '../../theme/colors';

export default memo(function CustomTextInput({
  label,
  value,
  onChangeText,
  marginTop = 0,
  width = '90%',
  leftComponent,
  rightComponent,
  borderWidth = 1,
  borderRadius = 5,
  editable = true,
  secureTextEntry = false,
  keyboardType = 'default',
  shadow = false,
  backgroundColor = colors.WHITE,
  borderColor = colors.BORDER_COLOR,
  activeUnderlineColor = colors.INPUT_PLACEHOLDER,
}) {
  let shadowProps = {};
  if (shadow)
    shadowProps = {
      shadowColor: 'rgba(186, 186, 186, 0.66)',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.4,
      shadowRadius: 6,
    };
  if (label)
    return (
      <View
        style={{
          width,
          borderWidth,
          borderColor,
          borderRadius,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: leftComponent ? 10 : 0,
          paddingRight: rightComponent ? 10 : 0,
          marginTop,
          backgroundColor: colors.WHITE,
          ...shadowProps,
        }}>
        {leftComponent && leftComponent}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <TextInput
            label={label}
            style={{
              borderRadius,
              width: '100%',
              color: colors.INPUT_TEXT,
              backgroundColor: backgroundColor,
            }}
            underlineStyle={{
              display: 'none',
            }}
            value={value}
            onChangeText={onChangeText && onChangeText}
            editable={editable}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            activeUnderlineColor={activeUnderlineColor}
          />
        </View>
        {rightComponent && rightComponent}
      </View>
    );
  return null;
});
