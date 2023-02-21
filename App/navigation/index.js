import React from "react";
import Home from "../screens/home";
import Login from "../screens/login";
import Signup from "../screens/signup";
import Splash from "../screens/splash";
import ScreenString from "./screenString";
import VerifyOtp from "../screens/verifyOtp";
import OnBoarding from "../screens/onboarding";
import ForgetPassword from "../screens/forgetPassword";
import DrawerMenu from "../compnents/drawerMenu";
import EditProfile from "../screens/editProfile";
import AccountConfirmed from "../screens/accountConfirmed";
import AddCompanyProfile from "../screens/addCompanyProfile";
import CompanyPublicView from "../screens/companyPublicView";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform } from "react-native";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigationContainer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerMenu {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: Platform.OS === "web" ? "30%" : "70%",
        },
      }}
      initialRouteName={ScreenString.HOME}
    >
      <Drawer.Screen
        name={ScreenString.HOME}
        component={Home}
        options={{
          headerShown: true,
        }}
      />
      <Drawer.Screen name={ScreenString.EDITPROFILE} component={EditProfile} />
      <Drawer.Screen
        name={ScreenString.COMPANYPUBLICVIEW}
        component={CompanyPublicView}
      />
      <Drawer.Screen
        name={ScreenString.ADDCOMPANYPROFILE}
        component={AddCompanyProfile}
      />
    </Drawer.Navigator>
  );
}

export default function MainNavigationContainer() {
  const { user } = useSelector((state) => state.authReducers);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenString.SPLASH}
    >
      <Stack.Screen name={ScreenString.LOGIN} component={Login} />
      <Stack.Screen
        name={ScreenString.FORGETPASSWORD}
        component={ForgetPassword}
      />
      <Stack.Screen name={ScreenString.SPLASH} component={Splash} />
      <Stack.Screen name={ScreenString.SIGNUP} component={Signup} />
      <Stack.Screen name={ScreenString.VERIFYOTP} component={VerifyOtp} />
      <Stack.Screen name={ScreenString.ONBOARDING} component={OnBoarding} />
      <Stack.Screen
        name={ScreenString.ACCOUNTCONFIRMED}
        component={AccountConfirmed}
      />
      {user && (
        <Stack.Screen
          name={ScreenString.DRAWER}
          component={DrawerNavigationContainer}
        />
      )}
    </Stack.Navigator>
  );
}
