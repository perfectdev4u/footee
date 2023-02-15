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
import { useSelector, useDispatch } from "react-redux";
import { apiPostMethod } from "../../api";
import apiUrls from "../../api/apiUrls";
import { addUser, reset } from "../../redux/reducers/authReducers";
import { CommonActions, useNavigation } from "@react-navigation/native";
import screenString from "../../navigation/screenString";

export default function EditProfile(props) {
  const { user } = useSelector((state) => state.authReducers);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("phone_number", phone);
    apiPostMethod(
      apiUrls.baseUrl + apiUrls.updateUser,
      formData,
      user?.access_token
    )
      .then(({ data: { status } }) => {
        if (status === "success") {
          dispatch(addUser({ ...user, name, email, phone_number: phone }));
          Alert.alert("Footee", "Profile Update successfully!");
          setIsLoading(false);
        } else {
          Alert.alert("Footee", "Somethings went wrong!");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("error==>", err?.response?.data);
        err = err?.response?.data;
        if (err?.message === "Unauthenticated.") {
          Alert.alert("Footee", "Session expired! Please login again.");
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
          Alert.alert("Footee", "The email has already been taken.");
        } else {
          Alert.alert("Footee", "Somethings went wrong!");
        }
      });
  };

  useEffect(() => {
    if (name != user?.name) setName(user?.name || "");
    if (email != user?.email) setEmail(user?.email || "");
    if (phone != user?.phone_number) setPhone(user?.phone_number || "");
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
        />
        <CustomTextInput
          label={"Email address"}
          marginTop={20}
          value={email}
          onChangeText={setEmail}
          width="100%"
        />
        <CustomTextInput
          label={"Phone Number"}
          marginTop={20}
          value={phone}
          onChangeText={setPhone}
          width="100%"
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
