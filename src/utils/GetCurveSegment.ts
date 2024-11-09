import { ScreenType } from "./ScreenSize";

const GetCurveSegment = (screenType: ScreenType, currentPage: number, hoveredText: string) => {
  let curveSegment = 3;
  if (currentPage === 1 && !hoveredText) {
    if (screenType === ScreenType.SMALL_DESKTOP || screenType === ScreenType.LARGE_DESKTOP) {
      curveSegment = 8;
    } else {
      curveSegment = 1;
    }
  } else {
    if (screenType === ScreenType.SMALL_DESKTOP || screenType === ScreenType.LARGE_DESKTOP) {
      curveSegment = 12;
    } else {
      curveSegment = 3;
    }
  }
  return curveSegment;
}

export default GetCurveSegment;
