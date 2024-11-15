import { create} from "zustand";
import { ScreenType, useScreenSize } from "../utils/ScreenSize";

const useStore = create((set: any) => ({
  mousePosition: { x: 0, y: 0 },
  hoveredText: "",
  screenType: useScreenSize(),
  currentPage: 0,
  prevPage: 0,
  language: "fr",
  setMousePosition: (position: any) => set({ mousePosition: position }),
  setHoveredText: (text: string | null) => set({ hoveredText: text }),
  setScreenType: (screenType: ScreenType) => set({ screenType }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setPrevPage: (page: number) => set({ prevPage: page }),
  setLanguage: (language: string) => set({ language }),
}));

export default useStore;