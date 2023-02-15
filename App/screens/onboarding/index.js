import React from "react";
import { Image, Platform, View } from "react-native";
import Images from "../../assets/Images";
import Container from "../../compnents/container";
import colors from "../../theme/colors";
import commonStyle from "../../theme/commonStyle";
import CustomText from "../../compnents/customText";
import CustomButton from "../../compnents/customButton";
import style from "./style";
import screenString from "../../navigation/screenString";

export default function OnBoarding({ navigation, ...props }) {
  const handleNavigation = (screen) => screen && navigation.navigate(screen);
  return (
    <Container backgroundColor={colors.THEME_COLOR}>
      <Image
        source={Images.onboardingImage}
        style={Platform.OS === "web" ? style.imageWeb : style.image}
      />
      <View
        style={[
          commonStyle.centeredContent(),
          { marginHorizontal: 25, paddingBottom: 30, alignItems: "center" },
        ]}
      >
        <CustomText fontSize={48} fontWeight={"700"}>
          Connecting you whenever you need
        </CustomText>
        <CustomText fontSize={18} fontWeight={"400"} marginTop={15}>
          Connecting you whenever you need
        </CustomText>
        <CustomButton
          lable="Register Now"
          backgroundColor={colors.WHITE}
          width={"100%"}
          fontColor={colors.THEME_COLOR}
          marginTop={40}
          fontSize={16}
          onPress={() => handleNavigation(screenString.SIGNUP)}
        />
        <CustomButton
          fontSize={16}
          lable="Login"
          width={"100%"}
          fontColor={colors.WHITE}
          marginTop={10}
          borderColor={colors.WHITE}
          onPress={() => handleNavigation(screenString.LOGIN)}
        />
      </View>
    </Container>
  );
}
