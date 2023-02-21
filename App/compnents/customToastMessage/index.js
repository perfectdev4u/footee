import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeMessage } from "../../redux/reducers/alertReducers";
import colors from "../../theme/colors";
import commonStyle from "../../theme/commonStyle";
import CustomText from "../customText";

export default function CustomToastMessage() {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.alertReducers);
  const [isAlertShow, setIsAlertShow] = useState(false);
  const [lastMessage, setlastMessage] = useState(false);

  useEffect(() => {
    if (message && lastMessage != message) {
      setIsAlertShow(true);
      setlastMessage(message);
    }
  }, [message]);

  const handleClose = () => {
    setIsAlertShow(false);
    setlastMessage("");
    dispatch(removeMessage());
  };

  if (isAlertShow)
    return (
      <View
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "absolute",
          backgroundColor: colors.TRANSPARENT,
        }}
      >
        <View style={commonStyle.centeredContent()}>
          <View
            style={{
              width: "84%",
              minHeight: 140,
              backgroundColor: colors.WHITE,
              borderRadius: 15,
              maxWidth: 350,
            }}
          >
            <View
              style={{
                flex: 1,
                padding: 20,
                alignItems: "center",
              }}
            >
              <CustomText
                color={colors.MAINHEADING}
                fontSize={20}
                fontWeight={"700"}
              >
                Footee
              </CustomText>
              <CustomText
                color={colors.MAINHEADING}
                fontSize={15}
                fontWeight={"500"}
                textAlign={"center"}
              >
                {message}
              </CustomText>
            </View>
            <TouchableOpacity
              onPress={handleClose}
              style={{
                width: "100%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderTopWidth: 1,
                borderColor: colors.BORDER_COLOR,
              }}
            >
              <CustomText
                color={colors.THEME_COLOR}
                fontWeight={"700"}
                fontSize={17}
              >
                OK
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  return null;
}
