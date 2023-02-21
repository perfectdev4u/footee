import React, { memo, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import colors from "../../theme/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomText from "../customText";

export default memo(function CustomDropDown({
  label,
  value,
  options = [],
  marginTop = 0,
  width = "90%",
  borderWidth = 1,
  borderRadius = 5,
  editable = true,
  secureTextEntry = false,
  keyboardType = "default",
  backgroundColor = colors.WHITE,
  borderColor = colors.BORDER_COLOR,
  activeUnderlineColor = colors.INPUT_PLACEHOLDER,
  onChangeText,
  maxWidth = 400,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    value || "Please Select Value"
  );

  const handleClick = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChangeText(value);
  };

  useEffect(() => {
    if (value != selectedValue) setSelectedValue(value || "");
    return () => null;
  }, [value]);

  return (
    <View
      style={{
        width,
        borderWidth,
        borderColor,
        borderRadius,
        marginTop,
        maxWidth,
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 10,
        }}
        onPress={() => setIsOpen(!isOpen)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <TextInput
            label={label}
            style={{
              borderRadius,
              width: "100%",
              color: colors.INPUT_TEXT,
              backgroundColor: backgroundColor,
            }}
            underlineStyle={{
              display: "none",
            }}
            value={selectedValue}
            editable={editable}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            activeUnderlineColor={activeUnderlineColor}
            onPressOut={() => setIsOpen(!isOpen)}
          />
        </View>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <AntDesign
            size={20}
            color={colors.THEME_COLOR}
            name={isOpen ? "up" : "down"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      {isOpen &&
        options?.map((item, index) => (
          <View
            key={index}
            style={{
              paddingVertical: 6,
              marginHorizontal: 14,
            }}
          >
            <CustomText
              fontSize={14}
              fontWeight={"400"}
              color={colors.THEME_COLOR}
              isPressable={true}
              onPress={() => handleClick(item)}
            >
              {item}
            </CustomText>
          </View>
        ))}
    </View>
  );
});
