import { ScreenType } from "./ScreenSize";

const GetSize = (screenType: ScreenType, currentPage: number, hoveredText: string) => {
  let size = 0.08;
  if (currentPage === 1 && !hoveredText) {
    if (screenType === ScreenType.SMALL_DESKTOP || screenType === ScreenType.LARGE_DESKTOP) {
      size = 0.15;
    } else {
      size = 0.06;
    }
  } else if (currentPage === 2 && hoveredText) {
    if (screenType === ScreenType.SMALL_DESKTOP || screenType === ScreenType.LARGE_DESKTOP) {
      size = 0.15;
    } else {
      size = 0.05;
    }
  } else if (currentPage === 4 && hoveredText) {
    if (screenType === ScreenType.SMALL_DESKTOP || screenType === ScreenType.LARGE_DESKTOP) {
      size = 0.15;
    } else {
      size = 0.05;
    }
  } else {
    if (screenType === ScreenType.SMALL_DESKTOP || screenType === ScreenType.LARGE_DESKTOP) {
      size = 0.2;
    } else {
      size = 0.08;
    }
  }
  return size;
};

export default GetSize;