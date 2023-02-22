import React, { useState } from "react";
import { Platform, SafeAreaView, TouchableOpacity, View } from "react-native";
import Container from "../../compnents/container";
import CustomText from "../../compnents/customText";
import colors from "../../theme/colors";
import commonStyle from "../../theme/commonStyle";
import OtpInputs from "react-native-otp-inputs";
import CustomButton from "../../compnents/customButton";
import CustomTextInput from "../../compnents/customInput";
import screenString from "../../navigation/screenString";
import { apiPostMethod } from "../../api";
import apiUrls from "../../api/apiUrls";
import {
  AlertShow,
  isVaildNumber,
  isValidEmail,
  TextInputIcon,
  TextInputPasswordIcon,
} from "../../utils/constants";
import { CommonActions } from "@react-navigation/native";
import { CountryPicker } from "react-native-country-codes-picker";
import { useDispatch } from "react-redux";

export default function ForgetPassword({ navigation, ...props }) {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [otpSendLoading, setOtpSendLoading] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [isPasswordShow, setisPasswordShow] = useState(false);
  const [setNewPasswordLoading, setSetNewPasswordLoading] = useState(false);

  const handleEmail = (email) => {
    setEmail(email);
    setIsEmailCorrect(isValidEmail(email));
  };

  const handleOtpSend = () => {
    setOtpSendLoading(true);
    const formData = new FormData();
    formData.append(
      "email",
      Platform.OS === "web" ? email : countryCode + phone
    );
    formData.append("platform", Platform.OS);
    apiPostMethod(apiUrls.baseUrl + apiUrls.forgetPassword, formData)
      .then(({ data: { status, message } }) => {
        if (status?.toLowerCase() === "success") {
          setIsOtpSent(true);
          AlertShow(message, dispatch);
        } else AlertShow("Somethings went wrong!", dispatch);
        setOtpSendLoading(false);
      })
      .catch((err) => {
        setOtpSendLoading(false);
        console.log("error==>", err?.response?.data);
        err = err?.response?.data;
        AlertShow(err.message, dispatch);
      });
  };

  const handleSetNewPassword = () => {
    setSetNewPasswordLoading(true);
    const formData = new FormData();
    formData.append("otp", otp);
    formData.append(
      "email",
      Platform.OS === "web" ? email : countryCode + phone
    );
    formData.append("platform", Platform.OS);
    formData.append("new_password", password);
    apiPostMethod(apiUrls.baseUrl + apiUrls.setNewPassword, formData)
      .then(({ data: { status, message } }) => {
        if (status === "success") {
          setIsOtpSent(true);
          AlertShow(message, dispatch);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: screenString.LOGIN }],
            })
          );
        } else AlertShow("Somethings went wrong!", dispatch);
        setSetNewPasswordLoading(false);
      })
      .catch((err) => {
        setSetNewPasswordLoading(false);
        console.log("error==>", err?.response?.data);
        AlertShow("Invaild Otp!", dispatch);
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
            Forget Password
          </CustomText>
          {!isOtpSent ? (
            <>
              {Platform.OS === "web" ? (
                <CustomTextInput
                  marginTop={40}
                  label={"Email"}
                  value={email}
                  onChangeText={handleEmail}
                  rightComponent={TextInputIcon(isEmailCorrect)}
                  width="100%"
                />
              ) : (
                <View
                  style={[
                    commonStyle.row(),
                    {
                      width: "100%",
                      maxWidth: 400,
                      justifyContent: "space-between",
                      marginTop: 40,
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => setIsPickerShow(true)}
                    style={{
                      width: "20%",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 60,
                      borderWidth: 1,
                      borderColor: colors.BORDER_COLOR,
                      borderRadius: 5,
                    }}
                  >
                    <CustomText color={colors.INPUT_TEXT}>
                      {countryCode}
                    </CustomText>
                  </TouchableOpacity>
                  <CustomTextInput
                    label={"Phone Number"}
                    value={phone}
                    keyboardType={"decimal-pad"}
                    onChangeText={(number) =>
                      isVaildNumber(number) &&
                      number?.length <= 10 &&
                      setPhone(number)
                    }
                    width={"75%"}
                  />
                </View>
              )}
              <CountryPicker
                show={isPickerShow}
                // initialState={countryCode}
                style={{
                  modal: { flex: 1 },
                }}
                pickerButtonOnPress={(item) => {
                  setCountryCode(item.dial_code);
                  setIsPickerShow(false);
                }}
              />
              <CustomButton
                fontSize={16}
                lable="Send OTP"
                width={"100%"}
                fontColor={colors.WHITE}
                marginTop={40}
                borderColor={colors.WHITE}
                borderRadius={7}
                disabled={
                  Platform.OS === "web"
                    ? !isEmailCorrect
                    : phone.length != 10 || isOtpSent
                }
                isLoading={otpSendLoading}
                onPress={handleOtpSend}
              />
            </>
          ) : (
            <>
              <OtpInputs
                handleChange={setOtp}
                numberOfInputs={5}
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
              <CustomTextInput
                label={"Password"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordShow}
                marginTop={20}
                rightComponent={
                  <TouchableOpacity
                    onPress={() => setisPasswordShow(!isPasswordShow)}
                  >
                    {TextInputPasswordIcon(!isPasswordShow)}
                  </TouchableOpacity>
                }
                width={"100%"}
              />
              <CustomButton
                fontSize={16}
                lable="Set New Password"
                width={"100%"}
                fontColor={colors.WHITE}
                marginTop={40}
                borderColor={colors.WHITE}
                borderRadius={7}
                disabled={otp.length < 5 || password.length < 6}
                isLoading={setNewPasswordLoading}
                onPress={handleSetNewPassword}
              />
              <View style={[commonStyle.row(), { marginTop: 20 }]}>
                <CustomText
                  fontSize={14}
                  fontWeight={"400"}
                  color={colors.BLACK}
                >
                  Didn’t get OTP?{" "}
                </CustomText>
                <CustomText
                  fontSize={14}
                  fontWeight={"400"}
                  color={colors.THEME_COLOR}
                  isPressable={true}
                  onPress={handleOtpSend}
                >
                  Resend
                </CustomText>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </Container>
  );
}
