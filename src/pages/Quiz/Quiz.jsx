import Initial from "@/pages/Quiz/Initial.jsx";
import { useContext, useEffect, useState } from "react";
import Container from "@/components/Container.jsx";
import styled from "styled-components";
import { useLocalStorage } from "@/hooks/useLocalStorage.js";
import QuizContext from "@/contexts/QuizContext.jsx";
import {
  clearUserAnswers,
  setCurrentQuestionIdx,
  setUserAnswers,
} from "@/reducers/quizReducer.js";
import { Navigate, useNavigate } from "react-router-dom";
import { getReadableTimeFormat } from "@/utils/getReadableTimeFormat.js";

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
  margin: 72px 0;
  padding: 0 24px;
  text-align: center;
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

const decodeQuestion = (text) => {
  const parser = new DOMParser();
  return parser.parseFromString(`<!doctype html><body>${text}`, "text/html")
    .body.textContent;
};

const Quiz = ({ isStarted, setIsStarted }) => {
  const quiz = useLocalStorage("quiz");
  const user = useLocalStorage("user");
  const timeLeft = useLocalStorage("timeLeft");
  const [state, dispatch] = useContext(QuizContext);
  const navigate = useNavigate();

  const [seconds, setSeconds] = useState(() => {
    if (timeLeft) return timeLeft;
    else return 240;
  });

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        window.localStorage.setItem("timeLeft", JSON.stringify(seconds - 1));
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      window.localStorage.removeItem("timeLeft");
      clearUserAnswers(state, dispatch);
    }
  }, [seconds]);

  if (seconds === 0) {
    setIsStarted(false);
    return <Navigate to="/result" />;
  }

  if (!quiz) return <Container>Loading...</Container>;

  const maxQuestionIndex = quiz.length - 1;
  const currentQuestionIndex = state.currentQuestionIndex;

  const decodedQuestion = decodeQuestion(quiz[currentQuestionIndex].question);

  const handleAnswer = (i) => {
    setCurrentQuestionIdx(state, dispatch, state.userAnswers.length + 1);
    setUserAnswers(state, dispatch, i);

    if (currentQuestionIndex === maxQuestionIndex) {
      navigate("/result");
      setIsStarted(false);
    }
  };

  if (!isStarted) return <Navigate to="/initial" />;

  return (
    <Container style={{ maxWidth: "60dvw" }}>
      <TimeLeft>{getReadableTimeFormat(seconds)}</TimeLeft>
      <TotalAnswered>{user.userAnswers.length + 1}/10</TotalAnswered>
      <Question>{decodedQuestion}</Question>
      <AnswersContainer>
        {quiz[currentQuestionIndex].all_answers.map((item, i) => {
          return (
            <Answer onClick={() => handleAnswer(i)} key={i}>
              {item}
            </Answer>
          );
        })}
      </AnswersContainer>
    </Container>
  );
};

export default Quiz;
