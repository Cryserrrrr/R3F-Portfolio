import styled from "styled-components"
import useStore from "../store/Store"
import messages from '../utils/Messages'
import { ScreenType } from "../utils/ScreenSize"

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 4rem);
  font-size: 1.5rem;
  padding: 2rem;

  @media (max-width: 1440px) {
    font-size: 2rem;
    padding: 2rem;
    width: calc(100% - 4rem);
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 1rem;
    width: calc(100% - 2rem);
  }

  @media (max-width: 375px) {
    font-size: 0.5rem;
    padding: 0.5rem;
    width: calc(100% - 1rem);
  }
`

const Element = styled.div`
  cursor: pointer;
  transition: color 0.3s ease;
  &.active {
    color: #1f53c7;
  }
`

function NavBar() {

  const setMousePosition = useStore((state) => state.setMousePosition);
  const setHoveredText = useStore((state) => state.setHoveredText);
  const currentPage = useStore((state) => state.currentPage);
  const language = useStore((state) => state.language);
  const screenType = useStore((state) => state.screenType);

  const handleMouseMove = (event: any) => {
    setMousePosition({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    });
  };

  const handleMouseEnter = (text: string) => {
    if (screenType === ScreenType.SMALL_DESKTOP || screenType === ScreenType.LARGE_DESKTOP) {
      setHoveredText(text);
    }
  };

  const scrollToSection = (text: string) => {
    const element = document.getElementById(text);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container onMouseMove={handleMouseMove}>
      {messages[language as keyof typeof messages].navBar.map((text, index) => (
        <Element 
          onMouseEnter={() => handleMouseEnter(text)}
          onMouseLeave={() => setHoveredText(null)}
          key={text}
          className={index === currentPage - 1 ? "active" : ""}
          onClick={() => scrollToSection(messages["en"].navBar[index])}
        >{text}</Element>
      ))}
    </Container>
  )
}

export default NavBar
