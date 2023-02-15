import { CommonActions } from "@react-navigation/native";
import React from "react";
import { Platform, SafeAreaView, View } from "react-native";
import Images from "../../assets/Images";
import Container from "../../compnents/container";
import CustomButton from "../../compnents/customButton";
import CustomImage from "../../compnents/customImage";
import CustomText from "../../compnents/customText";
import screenString from "../../navigation/screenString";
import colors from "../../theme/colors";
import commonStyle from "../../theme/commonStyle";
import style from "./style";

export default function AccountConfirmed({ navigation, ...props }) {
  return (
    <Container backgroundColor={colors.WHITE}>
      <SafeAreaView style={commonStyle.container()}>
        <View
          style={[
            commonStyle.centeredContent(),
            {
              marginHorizontal: 30,
            },
          ]}
        >
          <CustomText
            fontSize={32}
            fontWeight={"700"}
            marginTop={126}
            color={colors.THEME_COLOR}
            textAlign={"center"}
          >
            Account{"\n"}Confirmed!
          </CustomText>
          <CustomImage
            source={Images.accountConfirmedImage}
            style={
              Platform.OS === "web"
                ? style.accountConfirmedImageWeb
                : style.accountConfirmedImage
            }
          />
          <CustomText
            fontSize={20}
            fontWeight={"400"}
            marginTop={51}
            color={colors.SUBHEADING}
            textAlign={"center"}
          >
            You have successfully Registered now just get started to our
            platform
          </CustomText>
          <CustomButton
            fontSize={16}
            lable="Let’s Start"
            width={"100%"}
            fontColor={colors.WHITE}
            marginTop={65}
            borderColor={colors.WHITE}
            borderRadius={7}
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: screenString.DRAWER }],
                })
              )
            }
          />
        </View>
      </SafeAreaView>
    </Container>
  );
}
