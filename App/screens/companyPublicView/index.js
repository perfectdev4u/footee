import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Images from "../../assets/Images";
import Container from "../../compnents/container";
import CustomHeader from "../../compnents/customHeader";
import CustomImage from "../../compnents/customImage";
import CustomTextInput from "../../compnents/customInput";
import CustomText from "../../compnents/customText";
import colors from "../../theme/colors";
import commonStyle from "../../theme/commonStyle";

export default function CompanyPublicView() {
  const [company_profile, setCompany_profile] = useState(null);
  const { user } = useSelector((state) => state.authReducers);
  useEffect(() => {
    if (
      user?.company_profile &&
      JSON.stringify(company_profile) != JSON.stringify(user?.company_profile)
    )
      setCompany_profile(user.company_profile);
    return () => null;
  }, [user?.company_profile]);
  return (
    <Container backgroundColor={colors.WHITE}>
      <CustomHeader
        elementColor={colors.BLACK}
        screenLabel="Comapny Public View"
      />
      <View
        style={[
          commonStyle.container(),
          { marginHorizontal: 30, marginTop: 30, alignItems: "center" },
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
            maxWidth: 400,
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
    </Container>
  );
}
