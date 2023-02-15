import React, { memo } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import colors from "../../theme/colors";
import CustomText from "../customText";

export default memo(function CustomButton({
  width = "85%",
  height = 50,
  backgroundColor = colors.THEME_COLOR,
  marginTop = 0,
  borderRadius = 5,
  maxWidth = 400,
  lable = "",
  fontColor = colors.WHITE,
  onPress,
  isLoading = false,
  disabled = false,
  shadowProp = {},
  fontWeight = "600",
  borderColor,
  fontSize = 18,
}) {
  return (
    <TouchableOpacity
      onPress={onPress && onPress}
      disabled={isLoading || disabled}
      activeOpacity={0.7}
      style={{
        width,
        height,
        backgroundColor,
        marginTop,
        borderRadius,
        maxWidth,
        alignItems: "center",
        justifyContent: "center",
        borderColor,
        borderWidth: borderColor ? 2 : 0,
        opacity: disabled ? 0.6 : 1,
        ...shadowProp,
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color={fontColor} />
      ) : (
        <CustomText
          color={fontColor}
          fontSize={fontSize}
          fontWeight={fontWeight}
        >
          {lable}
        </CustomText>
      )}
    </TouchableOpacity>
  );
});
