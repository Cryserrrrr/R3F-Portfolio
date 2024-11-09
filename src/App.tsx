import './App.css'
import Experience from './containers/Experience'
import HomePage from './containers/HomePage'
import { useScreenSize } from './utils/ScreenSize'
import useStore from './store/Store'

function App() {
  const setScreenType = useStore((state) => state.setScreenType)
  
  window.addEventListener('resize', () => {
    setScreenType(useScreenSize())
  })

  return (
    <>
      <Experience />
      <HomePage />
    </>
  )
}

export default App
