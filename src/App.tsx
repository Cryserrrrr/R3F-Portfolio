import './App.css'
import { useState, useEffect } from 'react'
import { useScreenSize } from './utils/ScreenSize'
import useStore from './store/Store'
import Experience from './containers/Experience'
import HomePage from './containers/HomePage'
import LoadingPage from './containers/LoadingPage'
import bass from '/sounds/bass.mp3'
import woosh from '/sounds/woosh.mp3'

function App() {
  const setScreenType = useStore((state) => state.setScreenType)
  const setLanguage = useStore((state) => state.setLanguage)
  
  const [isLoading, setIsLoading] = useState(true)
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  
  window.addEventListener('resize', () => {
    setScreenType(useScreenSize())
  })

  useEffect(() => {
    // Détection de la langue du navigateur
    const language = navigator.language.split('-')[0];
    setLanguage(language === 'fr' ? 'fr' : 'en');

    const sounds = [bass, woosh];
    // Charger tous les sons
    const loadAudio = (src: string) => {
      return new Promise((resolve, reject) => {
        const audio = new Audio(src);
        audio.preload = 'auto';

        // Quand le son est complètement chargé
        const handleCanPlayThrough = () => {
          resolve(void 0);
        };

        // Gestion des erreurs
        const handleError = () => {
          console.error(src);
          reject();
        };

        audio.addEventListener('canplaythrough', handleCanPlayThrough);
        audio.addEventListener('error', handleError);

        // Nettoyage
        return () => {
          audio.removeEventListener('canplaythrough', handleCanPlayThrough);
          audio.removeEventListener('error', handleError);
        };
      });
    };

    Promise.all(sounds.map(loadAudio))
      .then(() => {
          setSoundLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const playBassSound = () => {
    const audio = new Audio(bass);
    audio.volume = 0; // Démarrer avec un volume à 0
    audio.loop = true;
    audio.play();
  
    // Durée du fade-in en millisecondes
    const fadeDuration = 3000; // 3 secondes
    const intervalTime = 50; // Intervalle de temps entre chaque incrément (ms)
    const maxVolume = 0.1; // Volume final
    const increment = maxVolume / (fadeDuration / intervalTime); // Augmentation par étape
  
    const fadeIn = setInterval(() => {
      if (audio.volume < maxVolume) {
        audio.volume = Math.min(audio.volume + increment, maxVolume);
      } else {
        clearInterval(fadeIn); // Arrêter le fade-in une fois le volume maximum atteint
      }
    }, intervalTime);
  };
  

  const playWooshSound = () => {
    if (soundOn) {
      const audio = new Audio(woosh);
      audio.volume = 0.2;
      audio.play();
    }
  };

  useEffect(() => {
    if (!isLoading && soundOn) {
      playBassSound();
    }
  }, [isLoading, soundOn]);

  return (
    <>
      {isLoading ? 
        <LoadingPage setIsLoading={setIsLoading} soundLoaded={soundLoaded} setSoundOn={setSoundOn} soundOn={soundOn}/> : 
        <HomePage />
      }
      <Experience playWooshSound={() => playWooshSound()} />
    </>
  )
}

export default App
