// import React, { useState } from "react";
// import {
//   ImageBackground,
//   Platform,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Images from "../../assets/Images";
// import Container from "../../compnents/container";
// import CustomHeader from "../../compnents/customHeader";
// import CustomImage from "../../compnents/customImage";
// import CustomTextInput from "../../compnents/customInput";
// import CustomText from "../../compnents/customText";
// import colors from "../../theme/colors";
// import style from "./style";
// import {
//   AlertShow,
//   CheckIcon,
//   isValidEmail,
//   TextInputIcon,
//   TextInputPasswordIcon,
// } from "../../utils/constants";
// import CustomButton from "../../compnents/customButton";
// import commonStyle from "../../theme/commonStyle";
// import screenString from "../../navigation/screenString";
// import { apiPostMethod } from "../../api";
// import apiUrls from "../../api/apiUrls";
// import { useDispatch } from "react-redux";
// import { addUser } from "../../redux/reducers/authReducers";
// import { CommonActions } from "@react-navigation/native";

// export default function Login({ navigation, ...props }) {
//   const dispatch = useDispatch();
//   const [isCheck, setIsCheck] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isEmailCorrect, setIsEmailCorrect] = useState(false);
//   const [isPasswordShow, setisPasswordShow] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleEmail = (email) => {
//     setEmail(email);
//     setIsEmailCorrect(isValidEmail(email));
//   };

//   const handleLogin = () => {
//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append("email", email);
//     formData.append("password", password);
//     apiPostMethod(apiUrls.baseUrl + apiUrls.login, formData)
//       .then(
//         ({
//           data: {
//             token: { access_token },
//             user,
//             company_profile,
//           },
//         }) => {
//           if (access_token && user) {
//             dispatch(addUser({ access_token, ...user, company_profile }));
//             setIsLoading(false);
//             navigation.dispatch(
//               CommonActions.reset({
//                 index: 0,
//                 routes: [{ name: screenString.DRAWER }],
//               })
//             );
//           } else {
//             setIsLoading(false);
//             AlertShow("Somethings went wrong!", dispatch);
//           }
//         }
//       )
//       .catch((err) => {
//         setIsLoading(false);
//         console.log("error==>", err?.response?.data);
//         if (err?.response?.data?.error === "Unauthorized")
//           AlertShow("Invalid credentials!", dispatch);
//         else AlertShow("Somethings went wrong!", dispatch);
//       });
//   };

//   const handleNavigation = (screen, method) =>
//     screen && navigation[method || "navigate"](screen);

//   return (
//     <Container backgroundColor={colors.WHITE} paddingBottom={0}>
//       <View style={commonStyle.container()}>
//         <ImageBackground
//           source={Images.loginTopImage}
//           style={{
//             width: "100%",
//             height: "100%",
//             alignSelf: "center",
//             maxWidth: 400,
//           }}
//         >
//           <CustomHeader
//             elementColor={colors.THEME_COLOR}
//             rightComponent={
//               <CustomText
//                 fontSize={28}
//                 fontWeight={"700"}
//                 color={colors.THEME_COLOR}
//               >
//                 Footee
//               </CustomText>
//             }
//           />
//           <View
//             style={{
//               flex: 1,
//               alignItems: "center",
//               // backgroundColor: colors.WHITE,
//               marginTop: 30,
//               borderTopLeftRadius: 30,
//               borderTopRightRadius: 30,
//               padding: 20,
//             }}
//           >
//             <CustomText
//               fontSize={32}
//               fontWeight={"700"}
//               marginTop={15}
//               color={colors.MAINHEADING}
//             >
//               Welcome Back
//             </CustomText>
//             <CustomText
//               fontSize={16}
//               fontWeight={"400"}
//               marginTop={5}
//               color={colors.SUBHEADING}
//             >
//               Enter the following details to Login
//             </CustomText>
//             <CustomTextInput
//               marginTop={40}
//               label={"Email"}
//               value={email}
//               onChangeText={handleEmail}
//               rightComponent={TextInputIcon(isEmailCorrect)}
//             />
//             <CustomTextInput
//               label={"Password"}
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry={!isPasswordShow}
//               marginTop={15}
//               rightComponent={
//                 <TouchableOpacity
//                   onPress={() => setisPasswordShow(!isPasswordShow)}
//                 >
//                   {TextInputPasswordIcon(!isPasswordShow)}
//                 </TouchableOpacity>
//               }
//             />
//             <View
//               style={[
//                 commonStyle.row("90%", "space-between"),
//                 {
//                   marginTop: 10,
//                   maxWidth: 400,
//                 },
//               ]}
//             >
//               <View style={[commonStyle.row()]}>
//                 <TouchableOpacity onPress={() => setIsCheck(!isCheck)}>
//                   {CheckIcon(isCheck)}
//                 </TouchableOpacity>
//                 <CustomText
//                   fontSize={14}
//                   fontWeight={"400"}
//                   color={colors.SUBHEADING}
//                 >
//                   Remember me
//                 </CustomText>
//               </View>
//               <CustomText
//                 fontSize={14}
//                 fontWeight={"400"}
//                 color={colors.THEME_COLOR}
//                 isPressable={true}
//                 onPress={() => handleNavigation(screenString.FORGETPASSWORD)}
//               >
//                 Forgot Password?
//               </CustomText>
//             </View>
//             <CustomButton
//               fontSize={16}
//               lable="Login"
//               width={"90%"}
//               fontColor={colors.WHITE}
//               marginTop={40}
//               borderColor={colors.WHITE}
//               borderRadius={7}
//               onPress={handleLogin}
//               isLoading={isLoading}
//               disabled={!email || password.length < 6 || !isEmailCorrect}
//             />
//             <View style={[commonStyle.row(), { marginTop: 20 }]}>
//               <CustomText fontSize={14} fontWeight={"400"} color={colors.BLACK}>
//                 Don’t have an account?{" "}
//               </CustomText>
//               <CustomText
//                 fontSize={14}
//                 fontWeight={"400"}
//                 color={colors.THEME_COLOR}
//                 isPressable={true}
//                 onPress={() => handleNavigation(screenString.SIGNUP)}
//               >
//                 Register Now
//               </CustomText>
//             </View>
//           </View>
//         </ImageBackground>
//       </View>
//     </Container>
//   );
// }

import React, { useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
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
  isValidEmail,
  TextInputIcon,
  TextInputPasswordIcon,
} from "../../utils/constants";
import CustomButton from "../../compnents/customButton";
import commonStyle from "../../theme/commonStyle";
import screenString from "../../navigation/screenString";
import { apiPostMethod } from "../../api";
import apiUrls from "../../api/apiUrls";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/reducers/authReducers";
import { CommonActions } from "@react-navigation/native";

export default function Login({ navigation, ...props }) {
  const dispatch = useDispatch();
  const [isCheck, setIsCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [isPasswordShow, setisPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmail = (email) => {
    setEmail(email);
    setIsEmailCorrect(isValidEmail(email));
  };

  const handleLogin = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    apiPostMethod(apiUrls.baseUrl + apiUrls.login, formData)
      .then(
        ({
          data: {
            token: { access_token },
            user,
            company_profile,
          },
        }) => {
          if (access_token && user) {
            dispatch(addUser({ access_token, ...user, company_profile }));
            setIsLoading(false);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: screenString.DRAWER }],
              })
            );
          } else {
            setIsLoading(false);
            AlertShow("Somethings went wrong!", dispatch);
          }
        }
      )
      .catch((err) => {
        setIsLoading(false);
        console.log("error==>", err?.response?.data);
        if (err?.response?.data?.error === "Unauthorized")
          AlertShow("Invalid credentials!", dispatch);
        else AlertShow("Somethings went wrong!", dispatch);
      });
  };

  const handleNavigation = (screen, method) =>
    screen && navigation[method || "navigate"](screen);

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
            Welcome Back
          </CustomText>
          <CustomText
            fontSize={16}
            fontWeight={"400"}
            marginTop={5}
            color={colors.SUBHEADING}
          >
            Enter the following details to Login
          </CustomText>
          <CustomTextInput
            marginTop={40}
            label={"Email"}
            value={email}
            onChangeText={handleEmail}
            rightComponent={TextInputIcon(isEmailCorrect)}
          />
          <CustomTextInput
            label={"Password"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordShow}
            marginTop={15}
            rightComponent={
              <TouchableOpacity
                onPress={() => setisPasswordShow(!isPasswordShow)}
              >
                {TextInputPasswordIcon(!isPasswordShow)}
              </TouchableOpacity>
            }
          />
          <View
            style={[
              commonStyle.row("90%", "space-between"),
              {
                marginTop: 10,
                maxWidth: 400,
              },
            ]}
          >
            <View style={[commonStyle.row()]}>
              <TouchableOpacity onPress={() => setIsCheck(!isCheck)}>
                {CheckIcon(isCheck)}
              </TouchableOpacity>
              <CustomText
                fontSize={14}
                fontWeight={"400"}
                color={colors.SUBHEADING}
              >
                Remember me
              </CustomText>
            </View>
            <CustomText
              fontSize={14}
              fontWeight={"400"}
              color={colors.THEME_COLOR}
              isPressable={true}
              onPress={() => handleNavigation(screenString.FORGETPASSWORD)}
            >
              Forgot Password?
            </CustomText>
          </View>
          <CustomButton
            fontSize={16}
            lable="Login"
            width={"90%"}
            fontColor={colors.WHITE}
            marginTop={40}
            borderColor={colors.WHITE}
            borderRadius={7}
            onPress={handleLogin}
            isLoading={isLoading}
            disabled={!email || password.length < 6 || !isEmailCorrect}
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
              onPress={() => handleNavigation(screenString.SIGNUP)}
            >
              Register Now
            </CustomText>
          </View>
        </View>
      </View>
    </Container>
  );
}

