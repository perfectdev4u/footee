import React, { memo } from "react";
import { Platform, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import commonStyle from "../../theme/commonStyle";

export default memo(function Container({
  backgroundColor,
  children: ChildComponent,
  ...props
}) {
  if (Platform.OS === "web")
    return (
      <View
        style={[commonStyle.container(backgroundColor), { paddingBottom: 30 }]}
      >
        {ChildComponent}
      </View>
    );
  return (
    <KeyboardAwareScrollView
      style={commonStyle.container(backgroundColor)}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={[commonStyle.container(), { paddingBottom: 30 }]}>
        {ChildComponent}
      </View>
    </KeyboardAwareScrollView>
  );
});
