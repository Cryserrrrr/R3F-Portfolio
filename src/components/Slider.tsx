import styled from "styled-components";
import useStore from "../store/Store";

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

  const handleMouseEnter = (text: string) => {
    setHoveredText(text);
  };

  const handleMouseLeave = () => {
    setHoveredText(null);
  };

  return (
    <ContentDisplay onMouseLeave={handleMouseLeave}>
      <Content onMouseEnter={() => handleMouseEnter("Project 1")} />
      <Content onMouseEnter={() => handleMouseEnter("Project 2")} />
      <Content onMouseEnter={() => handleMouseEnter("Project 3")} />
      <Content onMouseEnter={() => handleMouseEnter("Project 4")} />
      <Content onMouseEnter={() => handleMouseEnter("Project 5")} />
      <Content onMouseEnter={() => handleMouseEnter("Project 6")} />
      <Content onMouseEnter={() => handleMouseEnter("Project 7")} />
      <Content onMouseEnter={() => handleMouseEnter("Project 8")} />
      <Content onMouseEnter={() => handleMouseEnter("Project 9")} />
      <Content onMouseEnter={() => handleMouseEnter("Project 10")} />
      <Content onMouseEnter={() => handleMouseEnter("Project 11")} />
    </ContentDisplay>
  );
}

export default Slider;
