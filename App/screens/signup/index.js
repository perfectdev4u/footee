import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import Images from "../../assets/Images";
import Container from "../../compnents/container";
import CustomHeader from "../../compnents/customHeader";
import CustomImage from "../../compnents/customImage";
import CustomTextInput from "../../compnents/customInput";
import CustomText from "../../compnents/customText";
import colors from "../../theme/colors";
import style from "./style";
import {
  AlertShow,
  CheckIcon,
  isVaildNumber,
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
import { CountryPicker } from "react-native-country-codes-picker";
import { useDispatch } from "react-redux";

export default function Signup({ navigation, ...props }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);

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
    formData.append("phone_number", countryCode + phone);
    formData.append("platform", Platform.OS);
    formData.append("password_confirmation", password);
    apiPostMethod(apiUrls.baseUrl + apiUrls.register, formData)
      .then(({ data: { status, message } }) => {
        if (status === "Success") {
          setIsLoading(false);
          handleNavigation(screenString.VERIFYOTP, {
            email: Platform.OS === "web" ? email : countryCode + phone,
          });
          AlertShow(message, dispatch);
        } else {
          setIsLoading(false);
          AlertShow("Somethings went wrong!", dispatch);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("error==>", err);
        err = err?.response?.data;
        if (err?.message?.email) AlertShow(err?.message?.email[0], dispatch);
        else if (err?.message?.phone_number)
          AlertShow(err.message.phone_number[0], dispatch);
        else AlertShow("Somethings went wrong!", dispatch);
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
          <View
            style={[
              commonStyle.row(),
              {
                width: "90%",
                maxWidth: 400,
                justifyContent: "space-between",
                marginTop: 15,
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
              <CustomText color={colors.INPUT_TEXT}>{countryCode}</CustomText>
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
          <View
            style={[
              commonStyle.row("90%"),
              {
                marginTop: 10,
                maxWidth: 400,
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
              phone.length < 10 ||
              password.length < 6 ||
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
