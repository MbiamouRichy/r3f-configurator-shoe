import { proxy } from "valtio";

export const state = proxy({
  activeSlide: 0,
  slideLenght: 3,
  colors: ["#e60b0b", "#bbb8b9b3", "#161715e6", "#3c3948"],
  selectedColors: "#e60b0b",
});
