import { useEffect } from "react"
import styled from "styled-components"

import NavBar from "../components/navBar"
import LandingPage from "../components/LandingPage"
import About from "../components/About"
import Work from "../components/Work"
import Skills from "../components/Skills"
import Contact from "../components/Contact"

import useInView from "../utils/InView"
import useStore from "../store/Store"

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: calc(100% - 4rem);
  padding: 2rem;
  background-color: transparent;

  @media (max-width: 1440px) {
    padding: 2rem;
    width: calc(100% - 4rem);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    width: calc(100% - 2rem);
  }

  @media (max-width: 375px) {
    padding: 0.5rem;
    width: calc(100% - 1rem);
  }
`

function HomePage() {

  const [landingRef, isLandingVisible] = useInView({ threshold: 0.5 }) as [React.RefObject<HTMLDivElement>, boolean];
  const [aboutRef, isAboutVisible] = useInView({ threshold: 0.5 }) as [React.RefObject<HTMLDivElement>, boolean];
  const [workRef, isWorkVisible] = useInView({ threshold: 0.5 }) as [React.RefObject<HTMLDivElement>, boolean];
  const [skillsRef, isSkillsVisible] = useInView({ threshold: 0.5 }) as [React.RefObject<HTMLDivElement>, boolean];
  const [contactRef, isContactVisible] = useInView({ threshold: 0.5 }) as [React.RefObject<HTMLDivElement>, boolean];
  const setCurrentPage = useStore((state: any) => state.setCurrentPage);
  const setHoveredText = useStore((state: any) => state.setHoveredText);
  const currentPage = useStore((state: any) => state.currentPage);

  useEffect(() => {
    if (isLandingVisible) {
      setCurrentPage(0);
    } else if (isAboutVisible) {
      setCurrentPage(1);
    } else if (isWorkVisible) {
      setCurrentPage(2);
    } else if (isSkillsVisible) {
      setCurrentPage(3);
    } else if (isContactVisible) {
      setCurrentPage(4);
    }
  }, [isLandingVisible, isAboutVisible, isWorkVisible, isContactVisible]);

  useEffect(() => {
    setHoveredText(null);
  }, [currentPage]);

  return (
    <Container>
      <NavBar />
      <div ref={landingRef}>
        <LandingPage />
      </div>
      <div ref={aboutRef} id="About">
        <About />
      </div>
      <div ref={workRef} id="Work">
        <Work />
      </div>
      <div ref={skillsRef} id="Skills">
        <Skills />
      </div>
      <div ref={contactRef} id="Contact">
        <Contact />
      </div>
    </Container>
  )
}

export default HomePage
