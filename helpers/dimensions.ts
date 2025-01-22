import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeigth } = Dimensions.get("window");

export const hp = (percentange: number) => {
  return (percentange * deviceHeigth) / 100;
};

export const wp = (percentage: number) => {
  return (percentage * deviceWidth) / 100;
};
