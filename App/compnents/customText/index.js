import React, { memo } from "react";
import { Text, TouchableOpacity } from "react-native";
import colors from "../../theme/colors";

export default memo(function CustomText({
  onPress,
  alignSelf,
  textAlign,
  fontSize = 15,
  marginTop = 0,
  textDecorationLine,
  isPressable = false,
  fontWeight = "normal",
  color = colors.WHITE,
  children: ChildComponent,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      disabled={!isPressable}
      onPress={onPress && onPress}
      style={{
        alignSelf,
      }}
    >
      <Text
        ellipsizeMode="tail"
        style={{
          fontSize,
          fontWeight,
          color,
          marginTop,
          textDecorationLine,
          textAlign,
        }}
      >
        {ChildComponent}
      </Text>
    </TouchableOpacity>
  );
});
