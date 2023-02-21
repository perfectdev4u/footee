import React, { useState } from "react";
import { Platform, SafeAreaView, View } from "react-native";
import Container from "../../compnents/container";
import CustomText from "../../compnents/customText";
import colors from "../../theme/colors";
import commonStyle from "../../theme/commonStyle";
import OtpInputs from "react-native-otp-inputs";
import CustomButton from "../../compnents/customButton";
import screenString from "../../navigation/screenString";
import { apiPostMethod } from "../../api";
import apiUrls from "../../api/apiUrls";
import { CommonActions } from "@react-navigation/native";
import { addUser } from "../../redux/reducers/authReducers";
import { useDispatch } from "react-redux";
import { AlertShow } from "../../utils/constants";

export default function VerifyOtp({ navigation, route, ...props }) {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", route?.params?.email || "");
    formData.append("otp", otp);
    formData.append("platform", Platform.OS);
    apiPostMethod(apiUrls.baseUrl + apiUrls.otpVerify, formData)
      .then(({ data: { data, token } }) => {
        if (data) {
          dispatch(addUser({ access_token: token, ...data }));
          setIsLoading(false);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: screenString.ACCOUNTCONFIRMED }],
            })
          );
        } else {
          setIsLoading(false);
          AlertShow("Somethings went wrong!", dispatch);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("error==>", err?.response?.data);
        err = err?.response?.data;
        AlertShow(err.message, dispatch);
      });
  };

  const handleResendOTP = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", route?.params?.email || "");
    formData.append("platform", Platform.OS);
    apiPostMethod(apiUrls.baseUrl + apiUrls.resendOTP, formData)
      .then(({ data: { message, status } }) => {
        setIsLoading(false);
        AlertShow(message, dispatch);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("error==>", err?.response?.data);
        err = err?.response?.data;
        AlertShow(err.message, dispatch);
      });
  };
  return (
    <Container backgroundColor={colors.WHITE}>
      <SafeAreaView style={commonStyle.container()}>
        <View
          style={[
            commonStyle.centeredContent(),
            {
              marginTop: 20,
              marginHorizontal: 20,
            },
          ]}
        >
          <CustomText
            fontSize={32}
            fontWeight={"700"}
            marginTop={15}
            color={colors.MAINHEADING}
          >
            OTP Verification
          </CustomText>
          <CustomText
            fontSize={16}
            fontWeight={"400"}
            marginTop={5}
            color={colors.SUBHEADING}
          >
            Enter OTP sent to Email Address
          </CustomText>
          <OtpInputs
            handleChange={setOtp}
            numberOfInputs={5}
            autofillFromClipboard={true}
            autoFocus={true}
            focusStyles={{
              borderColor: colors.THEME_COLOR,
            }}
            inputStyles={{
              fontSize: 18,
              width: "100%",
              height: "100%",
              borderWidth: 0,
              textAlign: "center",
            }}
            inputContainerStyles={{
              height: 50,
              borderWidth: 2,
              borderColor: colors.BORDER_COLOR,
              width: 50,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
            style={{
              width: "95%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 50,
              maxWidth: 400,
            }}
          />
          <CustomButton
            fontSize={16}
            lable="Submit"
            width={"100%"}
            fontColor={colors.WHITE}
            marginTop={40}
            borderColor={colors.WHITE}
            borderRadius={7}
            disabled={otp.length < 4}
            isLoading={isLoading}
            onPress={handleSubmit}
          />
          <View style={[commonStyle.row(), { marginTop: 20 }]}>
            <CustomText fontSize={14} fontWeight={"400"} color={colors.BLACK}>
              Didn’t get OTP?{" "}
            </CustomText>
            <CustomText
              fontSize={14}
              fontWeight={"400"}
              color={colors.THEME_COLOR}
              isPressable={true}
              onPress={handleResendOTP}
            >
              Resend
            </CustomText>
          </View>
        </View>
      </SafeAreaView>
    </Container>
  );
}
