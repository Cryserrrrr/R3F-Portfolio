import styled from "styled-components";
import useStore from "../store/Store";
import { ScreenType } from "../utils/ScreenSize";
import { WorkItem } from "../utils/Work";
import { useState, useEffect, useRef } from "react";

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
  border: 2px solid #fff;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
`;

const HoverLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #fff;
  position: absolute;
  bottom: 50%;
  left: 0;
`;

function Slider({ work }: { work: WorkItem[] }) {
  const setHoveredText = useStore((state: { setHoveredText: (text: string | null) => void }) => state.setHoveredText);
  const screenType = useStore((state: any) => state.screenType);

  const [isHovered, setIsHovered] = useState<string | null>(null);

  const contentRefs = useRef<HTMLDivElement[]>([]);

  const handleMouseEnter = (text: string) => {
    if (screenType !== ScreenType.MOBILE && screenType !== ScreenType.TABLET) {
      setHoveredText(text);
      setIsHovered(text);
    }
  };

  const handleMouseLeave = () => {
    if (screenType !== ScreenType.MOBILE && screenType !== ScreenType.TABLET) {
      setHoveredText(null);
      setIsHovered(null);
    }
  };

  const handleClick = (text: string) => {
    if (screenType === ScreenType.MOBILE || screenType === ScreenType.TABLET) {
      setHoveredText(text);
      setIsHovered(text);
    }
  };

  const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
    const clickedInside = contentRefs.current.some((ref) => ref && ref.contains(event.target as Node));

    if (!clickedInside) {
      setHoveredText(null);
      setIsHovered(null);
    }
  };

  useEffect(() => {
    if (screenType === ScreenType.MOBILE || screenType === ScreenType.TABLET) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [screenType]);

  return (
    <ContentDisplay>
      {work.map((item, index) => (
        <Content
          ref={(el) => {
            if (el) contentRefs.current[index] = el;
          }}
          onMouseEnter={() => handleMouseEnter(item.title)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(item.title)}
          key={index}
        >
          <Image src={item.image} alt={item.title} />
          {isHovered === item.title && (
            <>
              <HoverLayer>
                {item.link && <Text onClick={() => window.open(item.link as string, "_blank")}>Live</Text>}
                {item.github && <Text onClick={() => window.open(item.github as string, "_blank")}>Github</Text>}
              </HoverLayer>
              {item.link && item.github && <Separator />}
            </>
          )}
        </Content>
      ))}
    </ContentDisplay>
  );
}

export default Slider;
