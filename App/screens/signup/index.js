import React, { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import Images from "../../assets/Images";
import Container from "../../compnents/container";
import CustomHeader from "../../compnents/customHeader";
import CustomImage from "../../compnents/customImage";
import CustomTextInput from "../../compnents/customInput";
import CustomText from "../../compnents/customText";
import colors from "../../theme/colors";
import style from "./style";
import {
  CheckIcon,
  isValidEmail,
  TextInputIcon,
  TextInputPasswordIcon,
} from "../../utils/constants";
import CustomButton from "../../compnents/customButton";
import commonStyle from "../../theme/commonStyle";
import screenString from "../../navigation/screenString";
import { Platform } from "react-native";
import { apiPostMethod } from "../../api";
import apiUrls from "../../api/apiUrls";

export default function Signup({ navigation, ...props }) {
  const [isCheck, setIsCheck] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleEmail = (email) => {
    setEmail(email);
    setIsEmailCorrect(isValidEmail(email));
  };

  const handleSignup = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone_number", phone);
    formData.append("platform", Platform.OS);
    formData.append("password_confirmation", confirmPassword);
    apiPostMethod(apiUrls.baseUrl + apiUrls.register, formData)
      .then(({ data: { status, message } }) => {
        if (status === "Success") {
          Alert.alert("Footee", message);
          setIsLoading(false);
          handleNavigation(screenString.VERIFYOTP, { email });
        } else {
          setIsLoading(false);
          Alert.alert("Footee", "Somethings went wrong!");
        }
      })
      .catch((err) => {
        console.log("error==>", err);
        err = err?.response?.data;
        setIsLoading(false);
        if (err?.message?.email[0] === "The email has already been taken.") {
          Alert.alert("Footee", "The email has already been taken.");
        } else {
          Alert.alert("Footee", "Somethings went wrong!");
        }
      });
  };

  const handleNavigation = (screen, params) =>
    screen && navigation.navigate(screen, params);
  return (
    <Container backgroundColor={colors.WHITE}>
      <View style={commonStyle.container(colors.THEME_COLOR)}>
        <CustomHeader
          rightComponent={
            <CustomText fontSize={28} fontWeight={"700"}>
              Footee
            </CustomText>
          }
        />
        <CustomImage
          source={Images.loginTopImage}
          style={
            Platform.OS === "web" ? style.loginTopImageWeb : style.loginTopImage
          }
        />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: colors.WHITE,
            marginTop: 30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 20,
          }}
        >
          <CustomText
            fontSize={32}
            fontWeight={"700"}
            marginTop={15}
            color={colors.MAINHEADING}
          >
            Get Started
          </CustomText>
          <CustomText
            fontSize={16}
            fontWeight={"400"}
            marginTop={5}
            color={colors.SUBHEADING}
          >
            Enter the following details to Register
          </CustomText>
          <CustomTextInput
            label={"Name"}
            marginTop={40}
            value={name}
            onChangeText={setName}
            rightComponent={TextInputIcon(name)}
          />
          <CustomTextInput
            label={"Email Address"}
            marginTop={15}
            value={email}
            onChangeText={handleEmail}
            rightComponent={TextInputIcon(isEmailCorrect)}
          />
          <CustomTextInput
            label={"Phone Number"}
            marginTop={15}
            value={phone}
            onChangeText={setPhone}
            // rightComponent={TextInputIcon(name)}
          />
          <CustomTextInput
            label={"Password"}
            marginTop={15}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordShow}
            rightComponent={
              <TouchableOpacity
                onPress={() => setIsPasswordShow(!isPasswordShow)}
              >
                {TextInputPasswordIcon(!isPasswordShow)}
              </TouchableOpacity>
            }
          />
          <CustomTextInput
            label={"Confirm Password"}
            marginTop={15}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!isConfirmPasswordShow}
            rightComponent={
              <TouchableOpacity
                onPress={() => setIsConfirmPasswordShow(!isConfirmPasswordShow)}
              >
                {TextInputPasswordIcon(!isConfirmPasswordShow)}
              </TouchableOpacity>
            }
          />
          <View
            style={[
              commonStyle.row("90%"),
              {
                marginTop: 10,
              },
            ]}
          >
            <TouchableOpacity onPress={() => setIsCheck(!isCheck)}>
              {CheckIcon(isCheck)}
            </TouchableOpacity>
            <CustomText
              fontSize={14}
              fontWeight={"400"}
              color={colors.SUBHEADING}
            >
              Accept Terms & Conditions
            </CustomText>
          </View>
          <CustomButton
            fontSize={16}
            lable="Register Now"
            width={"90%"}
            fontColor={colors.WHITE}
            marginTop={20}
            borderColor={colors.WHITE}
            borderRadius={7}
            onPress={handleSignup}
            isLoading={isLoading}
            disabled={
              !name ||
              !isEmailCorrect ||
              !phone ||
              password.length < 6 ||
              confirmPassword.length < 6 ||
              password != confirmPassword ||
              !isCheck
            }
          />
          <View style={[commonStyle.row(), { marginTop: 20 }]}>
            <CustomText fontSize={14} fontWeight={"400"} color={colors.BLACK}>
              Don’t have an account?{" "}
            </CustomText>
            <CustomText
              fontSize={14}
              fontWeight={"400"}
              color={colors.THEME_COLOR}
              isPressable={true}
              onPress={() => handleNavigation(screenString.LOGIN)}
            >
              Login
            </CustomText>
          </View>
        </View>
      </View>
    </Container>
  );
}
