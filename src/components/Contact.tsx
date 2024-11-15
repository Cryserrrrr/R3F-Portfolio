import styled from "styled-components";
import useStore from "../store/Store";
import emailjs from "emailjs-com";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import messages from "../utils/Messages";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
type Error = {
  email: boolean;
  name: boolean;
  subject: boolean;
  message: boolean;
};

type FormData = {
  email: string;
  name: string;
  subject: string;
  message: string;
};

interface ErrorProps {
  $error: boolean;
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  @media (max-width: 768px) {
    height: calc(var(--vh, 1vh) * 100);
  }
`;

const SubContainer = styled(motion.div)`
  padding-bottom: 5rem;
  width: 50%;

  @media (max-width: 1440px) {
    padding-bottom: 5rem;
    width: 60%;
  }

  @media (max-width: 768px) {
    padding-bottom: 2rem;
    width: 80%;
  }

  @media (max-width: 375px) {
    padding-bottom: 1rem;
    width: 90%;
  }
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Input = styled.input<ErrorProps>`
  width: 45%;
  height: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem;
  height: 2rem;
  font-family: "Yapari", sans-serif;
  outline: none;
  border: ${props => props.$error ? "2px solid #f00" : "2px solid #fff"};
  background-color: transparent;
  font-size: 1rem;
  color: #fff;

  &::placeholder {
    color: #fff;
  }

  @media (max-width: 768px) {
    width: 90%;
    margin-top: 1rem;
  }
`;

const LargeInput = styled(Input)`
  width: 98%;
  margin-top: 1rem;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Textarea = styled.textarea<ErrorProps>`
  width: 100%;
  height: 100px;
  border-radius: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem;
  font-family: "Yapari", sans-serif;
  outline: none;
  border: ${props => props.$error ? "2px solid #f00" : "2px solid #fff"};
  background-color: transparent;
  font-size: 1rem;
  resize: none;
  color: #fff;
  box-sizing: border-box;

  &::placeholder {
    color: #fff;
  }
`;

const Button = styled.button`
  width: 20%;
  height: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-top: 1rem;
  font-family: "Pavelt", sans-serif;
  outline: none;
  border: 0;
  font-size: 1rem;
  background-color: #fff;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 50%
  }
`;

function Contact() {
  const setHoveredText = useStore((state) => state.setHoveredText);
  const language = useStore((state) => state.language);

  const [error, setError] = useState<Error>({
    email: false,
    name: false,
    subject: false,
    message: false
  });
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_PUBLIC_KEY as string);
  }, []);

  const handleFocus = (text: string) => {
    setHoveredText(text);
  };

  const onBlur = () => {
    setHoveredText("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setError({ ...error, [name]: false });
    setFormData({ ...formData, [name]: value });
  };

  const checkEmail = (name: string, value: string): boolean => {
    if (name === "email" && !value.includes("@")) {
      return true;
    }
    return false;
  };

  const checkEmpty = (value: string): boolean => {
    if (value === "") {
      return true;
    }
    return false;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailError = checkEmail("email", formData.email);
    const nameError = checkEmpty(formData.name);
    const subjectError = checkEmpty(formData.subject);
    const messageError = checkEmpty(formData.message);

    setError({
      email: emailError,
      name: nameError,
      subject: subjectError,
      message: messageError
    });
    if (emailError || nameError || subjectError || messageError) return;

    setIsLoading(true);

    emailjs.send(
      import.meta.env.VITE_SERVICE_ID as string,
      import.meta.env.VITE_TEMPLATE_ID as string,
      formData
    )
    .then(() => {
      setHoveredText("Email sent");
      setIsLoading(false);
    })
    .catch(() => {
      setHoveredText("Error");
      setIsLoading(false);
    });
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Container>
      <SubContainer
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <Input 
              type="email" 
              name="email"
              placeholder={messages[language as keyof typeof messages].email}
              onFocus={() => handleFocus(messages[language as keyof typeof messages].email)}
              onChange={handleChange}
              value={formData.email}
              $error={error.email}
              onBlur={onBlur}
            />
            <Input 
              type="text" 
              name="name"
              placeholder={messages[language as keyof typeof messages].name}
              onFocus={() => handleFocus(messages[language as keyof typeof messages].name)}
              onChange={handleChange}
              value={formData.name}
              $error={error.name}
              onBlur={onBlur}
            />
          </InputContainer>
          <LargeInput 
            type="text" 
            name="subject"
            placeholder={messages[language as keyof typeof messages].subject}
            onFocus={() => handleFocus(messages[language as keyof typeof messages].subject)}
            onChange={handleChange}
            value={formData.subject}
            $error={error.subject}
            onBlur={onBlur}
          />
          <Textarea 
            name="message"
            placeholder={messages[language as keyof typeof messages].message}
            onFocus={() => handleFocus(messages[language as keyof typeof messages].message)}
            onChange={handleChange}
            value={formData.message}
            $error={error.message}
            onBlur={onBlur}
          />
          {isLoading ? <Loading /> : <Button type="submit">{messages[language as keyof typeof messages].send}</Button>}
        </Form>
      </SubContainer>
    </Container>
  );
}

export default Contact;
