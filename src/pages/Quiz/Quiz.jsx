import Initial from "@/pages/Quiz/Initial.jsx";
import { useState } from "react";
import Container from "@/components/Container.jsx";
import styled from "styled-components";
import { useLocalStorage } from "@/hooks/useLocalStorage.js";

const BaseQuizInfo = styled.span`
  background-color: var(--secondary);
  color: white;
  position: absolute;
  user-select: none;
  padding: 4px;
  border-radius: 4px;
`;

const TimeLeft = styled(BaseQuizInfo)`
  top: 24px;
  left: 24px;
`;

const TotalAnswered = styled(BaseQuizInfo)`
  top: 24px;
  right: 24px;
`;

const Question = styled.h2`
  padding: 0 24px;
  margin-bottom: 72px;
`;

const AnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 60dvw;
  gap: 24px;
`;

const Answer = styled.button`
  margin: 0 24px;
  padding: 24px;
  background-color: var(--secondary);
  color: white;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;

const Quiz = () => {
  const [isStarted, setIsStarted] = useState(false);
  const quiz = useLocalStorage("quiz");
  const [index, setIndex] = useState(0);

  if (!quiz) return <div>Loading...</div>;

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleAnswer = () => {};

  if (!isStarted) return <Initial handleStart={handleStart} />;

  return (
    <Container style={{ maxWidth: "60dvw" }}>
      <TimeLeft>10:00 left</TimeLeft>
      <TotalAnswered>10/10</TotalAnswered>
      <Question>In computing, what does MIDI stand for?</Question>
      <AnswersContainer>
        <Answer>Musical Instrument Digital Interface</Answer>
        <Answer>Musical Interface of Digital Instruments</Answer>
        <Answer>
          Modular Interfaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaceaa
        </Answer>
        <Answer>Musical Instrument Data Interface</Answer>
      </AnswersContainer>
    </Container>
  );
};

export default Quiz;
