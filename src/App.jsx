import Login from "@/pages/Login/index.js";
import { Routes, Route } from "react-router-dom";
import Quiz from "@/pages/Quiz/index.js";
import { useContext, useEffect, useState } from "react";
import { useQuizQuery } from "@/hooks/quiz/useQuizQuery.js";
import { getRandomNumber } from "@/utils/getRandomNumber.js";
import { useLocalStorage } from "@/hooks/useLocalStorage.js";
import Result from "@/pages/Result/Result.jsx";
import { clearUserAnswers, initialize } from "@/reducers/quizReducer.js";
import QuizContext from "@/contexts/QuizContext.jsx";
import Initial from "@/pages/Quiz/Initial.jsx";
import { useNavigate } from "react-router-dom";
import Container from "@/components/Container.jsx";
import NotFound from "@/pages/NotFound/index.js";

const App = () => {
  const quiz = useLocalStorage("quiz");
  const user = useLocalStorage("user");
  const [state, dispatch] = useContext(QuizContext);
  const [isStarted, setIsStarted] = useState(false);
  const navigate = useNavigate();
  const timeLeft = useLocalStorage("timeLeft");
  const [difficulty, setDifficulty] = useState("easy");

  const quizQueryResult = useQuizQuery(isStarted && !quiz, difficulty);

  console.log("is started", isStarted);

  const handleStart = () => {
    setIsStarted(true);
    clearUserAnswers(state, dispatch);
    quizQueryResult.refetch();
    window.localStorage.removeItem("quiz");
    navigate("/quiz");
  };

  useEffect(() => {
    if (user && quiz) {
      if (timeLeft) setIsStarted(true);
      if (user.currentQuestionIndex === quiz.length - 1) {
        setIsStarted(false);
        window.localStorage.setItem(
          "user",
          JSON.stringify({ ...user, currentQuestionIndex: 0, userAnswers: [] }),
        );

        window.localStorage.removeItem("timeLeft");

        initialize(dispatch, {
          ...user,
          currentQuestionIndex: 0,
          userAnswers: [],
        });
      } else initialize(dispatch, user);
    }
  }, []);

  useEffect(() => {
    if (quizQueryResult.data) {
      const data = quizQueryResult.data;

      const dataWithRandomizedAnswerIndex = [...data].map((item) => {
        const answer_index = getRandomNumber(0, 3);
        const all_answers = [];
        const incorrect_answers = [...item.incorrect_answers];
        for (let i = 0; i < 4; i++) {
          if (i === answer_index) {
            all_answers.push(item.correct_answer);
          } else {
            all_answers.push(incorrect_answers.shift());
          }
        }
        return {
          ...item,
          all_answers,
          answer_index,
        };
      });

      window.localStorage.setItem(
        "quiz",
        JSON.stringify(dataWithRandomizedAnswerIndex),
      );
      window.localStorage.removeItem("timeLeft");
    }
  }, [quizQueryResult.data]);

  if (quizQueryResult.isLoading) {
    return <Container>Loading...</Container>;
  }

  if (quizQueryResult.isError) {
    return (
      <Container>
        <div>Error:</div>
        <div style={{ marginTop: "12px" }}>{quizQueryResult.error.message}</div>
      </Container>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/quiz" element={<Quiz isStarted={isStarted} />} />
      <Route
        path="/initial"
        element={
          <Initial
            handleStart={handleStart}
            isStarted={isStarted}
            setDifficulty={setDifficulty}
          />
        }
      />
      <Route path="/result" element={<Result setIsStarted={setIsStarted} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
