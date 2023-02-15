import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store, { persistor } from "./App/redux";
import MainNavigationContainer from "./App/navigation";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainNavigationContainer />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
