import './App.css'
import { useState, useEffect, useRef } from 'react'
import useStore from './store/Store'
import Experience from './containers/Experience'
import HomePage from './containers/HomePage'
import LoadingPage from './containers/LoadingPage'
import bass from '/sounds/bass.mp3'
import woosh from '/sounds/woosh.mp3'
import ToggleSoundLayer from './components/ToggleSoundLayer'

function App() {
  const setLanguage = useStore((state) => state.setLanguage)
  
  const [isLoading, setIsLoading] = useState(true)
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const bassAudioRef = useRef(new Audio(bass));
  const wooshAudioRef = useRef(new Audio(woosh));

  useEffect(() => {
    const language = navigator.language.split('-')[0];
    setLanguage(language === 'fr' ? 'fr' : 'en');

    const sounds = [bassAudioRef.current, wooshAudioRef.current];
    const loadAudio = (audio: HTMLAudioElement) => {
      return new Promise<void>((resolve, reject) => {
        audio.preload = 'auto';

        const handleCanPlayThrough = () => {
          resolve();
        };

        const handleError = () => {
          console.error(audio.src);
          reject();
        };

        audio.addEventListener('canplaythrough', handleCanPlayThrough);
        audio.addEventListener('error', handleError);

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
    const bassAudio = bassAudioRef.current;
    bassAudio.volume = 0;
    bassAudio.loop = true;
    bassAudio.play();

    const fadeDuration = 3000;
    const intervalTime = 50;
    const maxVolume = 0.1;
    const increment = maxVolume / (fadeDuration / intervalTime);

    const fadeIn = setInterval(() => {
      if (bassAudio.volume < maxVolume) {
        bassAudio.volume = Math.min(bassAudio.volume + increment, maxVolume);
      } else {
        clearInterval(fadeIn);
      }
    }, intervalTime);
  };

  const playWooshSound = () => {
    const wooshAudio = wooshAudioRef.current;
    if (soundOn && !isLoading) {
      wooshAudio.volume = 0.2;
      wooshAudio.play();
    }
  };

  const stopAllSounds = () => {
    const bassAudio = bassAudioRef.current;
    const wooshAudio = wooshAudioRef.current;

    bassAudio.pause();
    bassAudio.currentTime = 0;

    wooshAudio.pause();
    wooshAudio.currentTime = 0;
  };

  useEffect(() => {
    if (!isLoading && soundOn) {
      playBassSound();
    }
  }, [isLoading, soundOn]);

  useEffect(() => {
    if (!soundOn) {
      stopAllSounds();
    } else {
      playBassSound();
    }
  }, [soundOn]);

  return (
    <>
      {isLoading ? 
        <LoadingPage setIsLoading={setIsLoading} soundLoaded={soundLoaded} setSoundOn={setSoundOn} soundOn={soundOn}/> : 
        <>
          <ToggleSoundLayer soundOn={soundOn} setSoundOn={setSoundOn} />
          <HomePage />
        </>
      }
      <Experience playWooshSound={playWooshSound} />
    </>
  )
}

export default App
