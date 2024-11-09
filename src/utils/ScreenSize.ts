export enum ScreenType {
  MOBILE = 'mobile',
  TABLET = 'tablet', 
  SMALL_DESKTOP = 'small-desktop',
  LARGE_DESKTOP = 'large-desktop'
}

export const useScreenSize = () => {

  const handleResize = () => {
    const width = window.innerWidth;
    let newScreenType: ScreenType;
    
    if (width < 768) {
      newScreenType = ScreenType.MOBILE;
    } else if (width >= 768 && width < 1024) {
      newScreenType = ScreenType.TABLET;
    } else if (width >= 1024 && width < 1440) {
      newScreenType = ScreenType.SMALL_DESKTOP;
    } else {
      newScreenType = ScreenType.LARGE_DESKTOP;
    }

    return newScreenType;
  };

  const setViewportHeight = () => {
    // On définit une variable CSS personnalisée "--vh" avec la hauteur visible de l'écran.
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  };
  
  // Initial check
  const screenType = handleResize();
  
  if (screenType === ScreenType.TABLET || screenType === ScreenType.MOBILE) {
    setViewportHeight();
  }

  // Add event listener
  window.addEventListener('resize', handleResize);

  // Cleanup
  return screenType;
};
