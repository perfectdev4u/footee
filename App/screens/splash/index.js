import { CommonActions } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Image, StatusBar, Platform } from "react-native";
import Images from "../../assets/Images";
import screenString from "../../navigation/screenString";
import colors from "../../theme/colors";
import commonStyle from "../../theme/commonStyle";
import { useSelector } from "react-redux";

export default function Splash({ navigation, ...props }) {
  const { user } = useSelector((state) => state.authReducers);
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: user ? screenString.DRAWER : screenString.ONBOARDING },
          ],
        })
      );
    }, 3000);
  }, []);

  return (
    <View style={commonStyle.centeredContent(colors.THEME_COLOR)}>
      <Image
        source={Images.LOGO}
        style={
          Platform.OS === "web"
            ? {
                width: "360px",
                height: "100px",
              }
            : {}
        }
      />
    </View>
  );
}
