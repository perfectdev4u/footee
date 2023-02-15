import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
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
import { apiPostMethod } from "../../api";
import apiUrls from "../../api/apiUrls";
import { useDispatch, useSelector } from "react-redux";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { addUser, reset } from "../../redux/reducers/authReducers";
import { categoryList, isValidEmail } from "../../utils/constants";

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

  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      Alert.alert("Footee", "Please provide vaild email!");
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
          Alert.alert("Footee", "Data added successfully!");
        } else Alert.alert("Footee", "Somethings went wrong!");
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("error==>", err?.response?.data);
        err = err?.response?.data;
        if (err?.message === "Unauthorized") {
          Alert.alert("Footee", "Session expired! Please login again.");
          dispatch(reset());
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: screenString.LOGIN }],
            })
          );
        } else Alert.alert("Footee", "Somethings went wrong!");
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
  }, [user?.company_profile]);
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
          <TouchableOpacity
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
          </TouchableOpacity>
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
        <CustomTextInput
          label={"Phone Number"}
          marginTop={20}
          value={phone}
          onChangeText={setPhone}
          width="100%"
          leftComponent={<CustomImage source={Images.inputPhoneIcon} />}
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
          disabled={!user?.company_profile}
        />
      </View>
    </Container>
  );
}
