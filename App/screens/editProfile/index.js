import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Images from "../../assets/Images";
import Container from "../../compnents/container";
import CustomHeader from "../../compnents/customHeader";
import CustomImage from "../../compnents/customImage";
import CustomTextInput from "../../compnents/customInput";
import colors from "../../theme/colors";
import commonStyle from "../../theme/commonStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomButton from "../../compnents/customButton";
import { useSelector, useDispatch } from "react-redux";
import { apiPostMethod } from "../../api";
import apiUrls from "../../api/apiUrls";
import { addUser, reset } from "../../redux/reducers/authReducers";
import { CommonActions, useNavigation } from "@react-navigation/native";
import screenString from "../../navigation/screenString";
import { AlertShow, isVaildNumber } from "../../utils/constants";
import CustomText from "../../compnents/customText";
import { CountryPicker } from "react-native-country-codes-picker";

export default function EditProfile(props) {
  const { user } = useSelector((state) => state.authReducers);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [isPickerShow, setIsPickerShow] = useState(false);

  const handleUpdate = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("phone_number", countryCode + phone);
    apiPostMethod(
      apiUrls.baseUrl + apiUrls.updateUser,
      formData,
      user?.access_token
    )
      .then(({ data: { status } }) => {
        if (status === "success") {
          dispatch(
            addUser({ ...user, name, email, phone_number: countryCode + phone })
          );
          AlertShow("Profile Update successfully!", dispatch);
          setIsLoading(false);
        } else {
          AlertShow("Somethings went wrong!", dispatch);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("error==>", err?.response?.data);
        err = err?.response?.data;
        if (err?.message === "Unauthenticated.") {
          AlertShow("Session expired! Please login again.", dispatch);
          dispatch(reset());
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: screenString.LOGIN }],
            })
          );
        } else if (
          err?.message ===
          "Email Address Already Exists Please use different email"
        ) {
          AlertShow("The email has already been taken.", dispatch);
        } else {
          AlertShow("Somethings went wrong!", dispatch);
        }
      });
  };

  useEffect(() => {
    if (name != user?.name) setName(user?.name || "");
    if (email != user?.email) setEmail(user?.email || "");
    if (phone != user?.phone_number) {
      console.log("user?.phone_number==>", user?.phone_number);
      let number =
        user?.phone_number?.slice(
          user.phone_number.length - 10,
          user?.phone_number.length - 0
        ) || "";
      let code =
        user?.phone_number?.slice(0, user?.phone_number.length - 10) || "";
      setPhone(number);
      setCountryCode(code);
    }
    return () => null;
  }, [user]);
  return (
    <Container backgroundColor={colors.WHITE}>
      <CustomHeader elementColor={colors.BLACK} screenLabel="Edit Profile" />
      <View
        style={[
          commonStyle.centeredContent(),
          { marginHorizontal: 30, marginTop: 30 },
        ]}
      >
        <View>
          <CustomImage
            source={Images.userDefaultImg}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
            }}
          />
          {/* <TouchableOpacity
            style={{
              width: 23,
              height: 23,
              borderRadius: 12,
              alignSelf: "flex-end",
              marginTop: -24,
              backgroundColor: colors.THEME_COLOR,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign name="camerao" size={15} color={colors.WHITE} />
          </TouchableOpacity> */}
        </View>
        <CustomTextInput
          label={"Name"}
          marginTop={50}
          value={name}
          onChangeText={setName}
          width="100%"
        />
        <CustomTextInput
          label={"Email address"}
          marginTop={20}
          value={email}
          onChangeText={setEmail}
          width="100%"
        />
        <View
          style={[
            commonStyle.row(),
            {
              width: "100%",
              maxWidth: 400,
              justifyContent: "space-between",
              marginTop: 20,
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
              isVaildNumber(number) && number?.length <= 10 && setPhone(number)
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
        <CustomButton
          fontSize={16}
          lable="Update"
          width={"100%"}
          fontColor={colors.WHITE}
          marginTop={40}
          borderColor={colors.WHITE}
          borderRadius={7}
          disabled={
            name === user?.name &&
            email === user?.email &&
            phone === user?.phone_number
          }
          isLoading={isLoading}
          onPress={handleUpdate}
        />
      </View>
    </Container>
  );
}
