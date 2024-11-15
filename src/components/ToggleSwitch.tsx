import styled from "styled-components";

interface ToggleSwitchProps {
  ischecked: boolean;
  onChange: () => void;
  labelLeft: string;
  labelRight: string;
}

interface ToggleLabelProps {
  $ischecked: boolean;
}

const ToggleContainer = styled.div`
  position: relative;
  width: 100px;
  height: 40px;
  display: inline-block;

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

const ToggleInput = styled.input`
  display: none;
`;

const ToggleLabel = styled.label<ToggleLabelProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    width: 50%;
    height: 100%;
    background-color: #fff;
    top: 0;
    left: ${(props) => (props.$ischecked ? "50%" : "0")};
    transition: left 0.3s ease-in-out, background-color 0.3s ease-in-out;
  }
`;

const LabelText = styled.span`
  position: absolute;
  width: 50%;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  pointer-events: none;

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }
`;

const ToggleSwitch = ({ ischecked, onChange, labelLeft, labelRight }: ToggleSwitchProps) => {
  return (
    <ToggleContainer>
      <ToggleInput
        type="checkbox"
        id="toggle"
        checked={ischecked}
        onChange={onChange}
      />
      <ToggleLabel htmlFor="toggle" $ischecked={ischecked}>
        <LabelText className="left">{labelLeft}</LabelText>
        <LabelText className="right">{labelRight}</LabelText>
      </ToggleLabel>
    </ToggleContainer>
  );
};

export default ToggleSwitch;
