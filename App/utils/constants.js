import colors from "../theme/colors";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { showMessage } from "../redux/reducers/alertReducers";

export const TextInputIcon = (status) => {
  if (status)
    return (
      <AntDesign name="checkcircleo" size={15} color={colors.THEME_COLOR} />
    );
  return <Feather name="x-circle" size={15} color={colors.RED} />;
};

export const TextInputPasswordIcon = (status) => {
  if (status)
    return <Feather name="eye-off" size={20} color={colors.THEME_COLOR} />;
  return <Feather name="eye" size={20} color={colors.THEME_COLOR} />;
};

export const CheckIcon = (status) => {
  if (status)
    return (
      <MaterialCommunityIcons
        name="checkbox-marked"
        size={20}
        color={colors.THEME_COLOR}
      />
    );
  return (
    <MaterialCommunityIcons
      name="checkbox-blank-outline"
      size={20}
      color={colors.SUBHEADING}
    />
  );
};

export const isValidEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

export const isVaildNumber = (number) => !isNaN(number);

export const AlertShow = (message, dispatch) => dispatch(showMessage(message));
export const categoryList = [
  "Room Addition",
  "Appliances Installation",
  "Architectural Service",
  "3D Design",
  "Bathroom Remodeling",
  "Brick Stone",
  "Carpentry & Cabinets",
  "Concrete",
  "Countertops",
  "Deck & Porches",
  "Drywall",
  "Electrical",
  "Fencing",
  "Wood Flooring",
  "Flooring Refinish",
  "Foundation",
  "General Remodeling",
  "General Contractor",
  "Handyman Services",
  "Heating & Cooling",
  "Home Builder",
  "Kitchen Remodeling",
  "Other Services",
  "Painting",
  "Patio Cover",
  "Plumbing",
  "Roofing Contractor",
  "Gutters",
  "Stucco & Siding",
  "Swimming Pool & Spa",
  "Tile & Stone",
  "Windows & Doors",
  "Sun Room",
];
