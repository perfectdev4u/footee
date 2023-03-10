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
import CustomDropDown from "../../compnents/customDropDown";
import screenString from "../../navigation/screenString";
import { apiGetMethod, apiPostMethod } from "../../api";
import apiUrls from "../../api/apiUrls";
import { useDispatch, useSelector } from "react-redux";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { addUser, reset } from "../../redux/reducers/authReducers";
import {
  AlertShow,
  // categoryList,
  isVaildNumber,
  isValidEmail,
} from "../../utils/constants";
import { CountryPicker } from "react-native-country-codes-picker";
import CustomText from "../../compnents/customText";

export default function AddCompanyProfile(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.authReducers);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      AlertShow("Please provide vaild email!", dispatch);
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone_number", phone);
    formData.append("category", category);
    formData.append("address", address);
    apiPostMethod(
      apiUrls.baseUrl + apiUrls.addCompanyProfile,
      formData,
      user?.access_token
    )
      .then(({ data }) => {
        if (data?.user) {
          dispatch(addUser({ ...user, company_profile: data?.user }));
          AlertShow("Data added successfully!", dispatch);
        } else AlertShow("Somethings went wrong!", dispatch);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("error==>", err?.response?.data);
        err = err?.response?.data;
        if (err?.message === "Unauthorized") {
          AlertShow("Session expired! Please login again.", dispatch);
          dispatch(reset());
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: screenString.LOGIN }],
            })
          );
        } else AlertShow("Somethings went wrong!", dispatch);
      });
  };

  const handleNavigation = (screen) => screen && navigation.navigate(screen);

  useEffect(() => {
    let company_profile = user?.company_profile;
    if (company_profile) {
      if (name != company_profile?.name) setName(company_profile?.name || "");
      if (email != company_profile?.email)
        setEmail(company_profile?.email || "");
      if (phone != company_profile?.phone_number)
        setPhone(company_profile?.phone_number || "");
      if (address != company_profile?.address)
        setAddress(company_profile?.address || "");
      if (category != company_profile?.category)
        setCategory(company_profile?.category || "");
    }
    return () => null;
  }, [user?.company_profile]);

  const getCategoryList = () => {
    apiGetMethod(apiUrls.baseUrl + apiUrls.getCategoryList)
      .then(({ data }) => {
        console.log("data==>", data);
        setCategoryList(data?.data || []);
      })
      .catch((err) => console.log("error==>", err.response.data));
  };

  useEffect(() => getCategoryList(), []);

  return (
    <Container backgroundColor={colors.WHITE}>
      <CustomHeader elementColor={colors.BLACK} screenLabel="Add Company" />
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
          leftComponent={<CustomImage source={Images.inputUserIcon} />}
        />
        <CustomTextInput
          label={"Email address"}
          marginTop={20}
          value={email}
          onChangeText={setEmail}
          width="100%"
          leftComponent={<CustomImage source={Images.inputEmailIcon} />}
        />
        <View
          style={[
            commonStyle.row(),
            {
              width: "100%",
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
              isVaildNumber(number) && number?.length <= 10 && setPhone(number)
            }
            width={"75%"}
            leftComponent={<CustomImage source={Images.inputPhoneIcon} />}
          />
        </View>
        <CountryPicker
          show={isPickerShow}
          style={{
            modal: { flex: 1 },
          }}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            setIsPickerShow(false);
          }}
        />
        <CustomTextInput
          label={"Location"}
          marginTop={20}
          value={address}
          onChangeText={setAddress}
          width="100%"
          leftComponent={<CustomImage source={Images.inputLocationIcon} />}
        />
        <CustomDropDown
          editable={false}
          label={"Category"}
          marginTop={20}
          value={category}
          onChangeText={setCategory}
          width="100%"
          options={categoryList}
        />
        <CustomButton
          fontSize={16}
          lable="Submit"
          width={"100%"}
          fontColor={colors.WHITE}
          marginTop={40}
          borderColor={colors.THEME_COLOR}
          borderRadius={7}
          onPress={handleSubmit}
          isLoading={isLoading}
          disabled={
            (name === user?.company_profile?.name &&
              email === user?.company_profile?.email &&
              phone === user?.company_profile?.phone_number &&
              address === user?.company_profile?.address &&
              category === user?.company_profile?.category) ||
            !name ||
            !email ||
            !phone ||
            !address ||
            !category
          }
        />
        <CustomButton
          fontSize={16}
          lable="Comapny Public View"
          width={"100%"}
          fontColor={colors.THEME_COLOR}
          marginTop={20}
          borderColor={colors.THEME_COLOR}
          borderRadius={7}
          backgroundColor={colors.WHITE}
          onPress={() => handleNavigation(screenString.COMPANYPUBLICVIEW)}
          disabled={!user?.company_profile?.name}
        />
      </View>
    </Container>
  );
}
