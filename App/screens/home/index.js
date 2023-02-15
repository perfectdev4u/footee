import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Images from "../../assets/Images";
import Container from "../../compnents/container";
import CustomButton from "../../compnents/customButton";
import CustomImage from "../../compnents/customImage";
import CustomTextInput from "../../compnents/customInput";
import CustomText from "../../compnents/customText";
import screenString from "../../navigation/screenString";
import colors from "../../theme/colors";
import commonStyle from "../../theme/commonStyle";

export default function Home() {
  const [company_profile, setCompany_profile] = useState(null);
  const { user } = useSelector((state) => state.authReducers);
  const navigation = useNavigation();
  useEffect(() => {
    if (
      user?.company_profile &&
      JSON.stringify(company_profile) != JSON.stringify(user?.company_profile)
    )
      setCompany_profile(user.company_profile);
  }, [user?.company_profile]);
  return (
    <Container backgroundColor={colors.WHITE}>
      {company_profile ? (
        <View
          style={[
            commonStyle.container(colors.WHITE),
            { marginHorizontal: 30, marginTop: 30 },
          ]}
        >
          <View
            style={{
              width: "100%",
              padding: 15,
              backgroundColor: colors.THEME_COLOR,
              borderRadius: 6,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CustomImage
              source={Images.userDefaultImg}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
              }}
            />
            <View
              style={{
                marginLeft: 13,
                flex: 1,
              }}
            >
              <CustomText fontSize={28} fontWeight={"600"} color={colors.WHITE}>
                {company_profile?.name}
              </CustomText>
              <CustomText fontSize={16} fontWeight={"400"} color={colors.WHITE}>
                {company_profile?.category}
              </CustomText>
            </View>
          </View>
          <CustomTextInput
            label={"Email address"}
            marginTop={20}
            value={company_profile?.email}
            width="100%"
            editable={false}
            rightComponent={<CustomImage source={Images.inputEmailIcon} />}
            shadow={true}
          />
          <CustomTextInput
            label={"Phone Number"}
            marginTop={20}
            value={company_profile?.phone_number}
            width="100%"
            editable={false}
            rightComponent={<CustomImage source={Images.inputPhoneIcon} />}
            shadow={true}
          />
          <CustomTextInput
            label={"Location"}
            marginTop={20}
            value={company_profile?.address}
            width="100%"
            editable={false}
            shadow={true}
            rightComponent={<CustomImage source={Images.inputLocationIcon} />}
          />
        </View>
      ) : (
        <View
          style={[
            commonStyle.centeredContent(colors.WHITE),
            { marginHorizontal: 30, marginTop: 30 },
          ]}
        >
          <CustomText fontSize={28} fontWeight={"600"} color={colors.BLACK}>
            No company found!
          </CustomText>
          <CustomButton
            fontSize={16}
            lable="Add Company"
            width={"100%"}
            fontColor={colors.WHITE}
            marginTop={10}
            borderColor={colors.THEME_COLOR}
            borderRadius={7}
            onPress={() => navigation.navigate(screenString.ADDCOMPANYPROFILE)}
          />
        </View>
      )}
    </Container>
  );
}
