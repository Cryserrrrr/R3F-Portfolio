import { useEffect } from "react"
import styled from "styled-components"
import NavBar from "../components/navBar"
import LandingPage from "../components/LandingPage"
import About from "../components/About"
import useInView from "../utils/InView"
import useStore from "../store/Store"

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: calc(100% - 10rem);
  padding: 5rem;
  background-color: transparent;

  @media (max-width: 1440px) {
    padding: 2rem;
    width: calc(100% - 10rem);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    width: calc(100% - 5rem);
  }

  @media (max-width: 375px) {
    padding: 0.5rem;
    width: calc(100% - 2rem);
  }
`

function HomePage() {

  const [landingRef, isLandingVisible] = useInView({ threshold: 0.5 }) as [React.RefObject<HTMLDivElement>, boolean];
  const [aboutRef, isAboutVisible] = useInView({ threshold: 0.5 }) as [React.RefObject<HTMLDivElement>, boolean];
  const setCurrentPage = useStore((state: any) => state.setCurrentPage);

  useEffect(() => {
    if (isLandingVisible) {
      setCurrentPage(0);
    } else if (isAboutVisible) {
      setCurrentPage(1);
    }
  }, [isLandingVisible, isAboutVisible]);

  return (
    <Container>
      <NavBar />
      <div ref={landingRef}>
        <LandingPage />
      </div>
      <div ref={aboutRef} id="About">
        <About />
      </div>
    </Container>
  )
}

export default HomePage
