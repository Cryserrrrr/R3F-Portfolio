import styled from "styled-components";
import useStore from "../store/Store";
import { ScreenType } from "../utils/ScreenSize";
const ContentDisplay = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  overflow-x: auto;
  white-space: nowrap;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const Content = styled.div`
  width: 200px;
  height: 200px;
  background-color: #1f53c7;
  border-radius: 1rem;
  flex-shrink: 0;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

function Slider() {
  const setHoveredText = useStore((state: { setHoveredText: (text: string | null) => void }) => state.setHoveredText); 
  const screenType = useStore((state: any) => state.screenType);

  const handleMouseEnter = (text: string) => {
    if (screenType !== ScreenType.MOBILE && screenType !== ScreenType.TABLET) {
      setHoveredText(text);
    }
  };

  const handleMouseLeave = () => {
    if (screenType !== ScreenType.MOBILE && screenType !== ScreenType.TABLET) {
      setHoveredText(null);
    }
  };

  const handleClick = (text: string) => {
    if (screenType === ScreenType.MOBILE || screenType === ScreenType.TABLET) {
      setHoveredText(text);
    }
  };

  return (
    <ContentDisplay onMouseLeave={handleMouseLeave}>
      <Content onMouseEnter={() => handleMouseEnter("Project 1")} onClick={() => handleClick("Project 1")}/>
      <Content onMouseEnter={() => handleMouseEnter("Project 2")} onClick={() => handleClick("Project 2")}/>
      <Content onMouseEnter={() => handleMouseEnter("Project 3")} onClick={() => handleClick("Project 3")}/>
      <Content onMouseEnter={() => handleMouseEnter("Project 4")} onClick={() => handleClick("Project 4")}/>
      <Content onMouseEnter={() => handleMouseEnter("Project 5")} onClick={() => handleClick("Project 5")}/>
      <Content onMouseEnter={() => handleMouseEnter("Project 6")} onClick={() => handleClick("Project 6")}/>
      <Content onMouseEnter={() => handleMouseEnter("Project 7")} onClick={() => handleClick("Project 7")}/>
      <Content onMouseEnter={() => handleMouseEnter("Project 8")} onClick={() => handleClick("Project 8")}/>
      <Content onMouseEnter={() => handleMouseEnter("Project 9")} onClick={() => handleClick("Project 9")}/>
      <Content onMouseEnter={() => handleMouseEnter("Project 10")} onClick={() => handleClick("Project 10")}/>
      <Content onMouseEnter={() => handleMouseEnter("Project 11")} onClick={() => handleClick("Project 11")}/>
    </ContentDisplay>
  );
}

export default Slider;
