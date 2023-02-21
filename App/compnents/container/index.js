import React, { memo } from "react";
import { Platform, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import commonStyle from "../../theme/commonStyle";

export default memo(function Container({
  backgroundColor,
  children: ChildComponent,
  paddingBottom = 30,
  ...props
}) {
  if (Platform.OS === "web")
    return (
      <View style={[commonStyle.container(backgroundColor), { paddingBottom }]}>
        {ChildComponent}
      </View>
    );
  return (
    <KeyboardAwareScrollView
      style={commonStyle.container(backgroundColor)}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={[commonStyle.container(), { paddingBottom }]}>
        {ChildComponent}
      </View>
    </KeyboardAwareScrollView>
  );
});
