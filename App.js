import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store, { persistor } from "./App/redux";
import MainNavigationContainer from "./App/navigation";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import screenString from "./App/navigation/screenString";
import { Text } from "react-native";
import CustomToastMessage from "./App/compnents/customToastMessage";

function App() {
  const linking = {
    prefixes: ["http://solarcontacts.us/"],
    config: {
      screens: {
        [screenString.SPLASH]: screenString.SPLASH.toLocaleLowerCase(),
        [screenString.LOGIN]: screenString.LOGIN.toLocaleLowerCase(),
        [screenString.SIGNUP]: screenString.SIGNUP.toLocaleLowerCase(),
        [screenString.VERIFYOTP]: screenString.VERIFYOTP.toLocaleLowerCase(),
        [screenString.ONBOARDING]: screenString.ONBOARDING.toLocaleLowerCase(),
        [screenString.FORGETPASSWORD]:
          screenString.FORGETPASSWORD.toLocaleLowerCase(),
        [screenString.ACCOUNTCONFIRMED]:
          screenString.ACCOUNTCONFIRMED.toLocaleLowerCase(),
        [screenString.DRAWER]: {
          screens: {
            [screenString.HOME]: "",
            [screenString.EDITPROFILE]:
              screenString.EDITPROFILE.toLocaleLowerCase(),
            [screenString.ADDCOMPANYPROFILE]:
              screenString.ADDCOMPANYPROFILE.toLocaleLowerCase(),
            [screenString.COMPANYPUBLICVIEW]:
              screenString.COMPANYPUBLICVIEW.toLocaleLowerCase(),
          },
        },
      },
    },
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer linking={linking} fallback={<Text>Loading</Text>}>
          <MainNavigationContainer />
          <CustomToastMessage />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
