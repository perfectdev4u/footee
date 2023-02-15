import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import Images from "../../assets/Images";
import screenString from "../../navigation/screenString";
import colors from "../../theme/colors";
import commonStyle from "../../theme/commonStyle";
import CustomImage from "../customImage";
import CustomText from "../customText";
import DrawerMenuItem from "../drawerMenuItem";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/reducers/authReducers";

export default function DrawerMenu(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.authReducers);
  const menuItems = [
    {
      isActive: true,
      image: Images.sidebarHome,
      label: "Home",
      screen: screenString.HOME,
    },
    {
      isActive: false,
      image: Images.sidebarEditProfile,
      label: "Edit Profile",
      screen: screenString.EDITPROFILE,
    },
    {
      isActive: false,
      image: Images.sidebarCompanyProfile,
      label: "Company Profiles",
      screen: screenString.ADDCOMPANYPROFILE,
    },
    // {
    //   isActive: false,
    //   image: Images.sidebarChangePassword,
    //   label: 'Change Password',
    //   // screen: screenString.HOME,
    // },
    {
      isActive: false,
      image: Images.sidebarTerm,
      label: "Terms & Conditions",
      // screen: screenString.HOME,
    },
  ];
  const [activeRoute, setActiveRoute] = useState(screenString.HOME);
  const handleNavigation = (screen, method) =>
    screen && navigation[method || "navigate"](screen);
  useEffect(() => {
    const { state } = props;
    const { routes, index } = state;
    const focusedRoute = routes[index].name;
    setActiveRoute(focusedRoute);
  }, [props]);
  return (
    <SafeAreaView style={commonStyle.container(colors.THEME_COLOR)}>
      <ScrollView
        style={commonStyle.container(colors.THEME_COLOR)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            marginHorizontal: 30,
            marginTop: 35,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderColor: colors.WHITE,
          }}
        >
          <CustomImage
            source={Images.userDefaultImg}
            style={{
              width: 80,
              height: 80,
              borderWidth: 2,
              borderColor: colors.WHITE,
              borderRadius: 40,
            }}
          />
          <CustomText
            fontSize={15}
            fontWeight={"500"}
            marginTop={10}
            color={colors.WHITE}
          >
            {user?.name}
          </CustomText>
          <CustomText fontSize={11} fontWeight={"400"} color={colors.WHITE}>
            {user?.email}
          </CustomText>
        </View>
        <View style={commonStyle.container()}>
          {menuItems?.map((item, index) => (
            <DrawerMenuItem
              {...item}
              isActive={activeRoute === item.screen}
              key={index}
              onPress={() => handleNavigation(item.screen)}
            />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          paddingBottom: 30,
        }}
      >
        <DrawerMenuItem
          image={Images.sidebarLogout}
          label="Logout"
          screen={screenString.ONBOARDING}
          onPress={() => {
            dispatch(reset());
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: screenString.ONBOARDING }],
              })
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
