import Login from "@/pages/Login/index.js";
import { Routes, Route } from "react-router-dom";
import Quiz from "@/pages/Quiz/index.js";
import { useEffect } from "react";
import { useQuizQuery } from "@/hooks/quiz/useQuizQuery.js";
import { getRandomNumber } from "@/utils/getRandomNumber.js";
import { useLocalStorage } from "@/hooks/useLocalStorage.js";

const App = () => {
  const quiz = useLocalStorage("quiz");

  const quizQueryResult = useQuizQuery(!quiz);

  useEffect(() => {
    if (quizQueryResult.data) {
      const data = quizQueryResult.data;

      const dataWithRandomizedAnswerIndex = [...data].map((item) => {
        return { ...item, answerIndex: getRandomNumber(0, 3) };
      });

      window.localStorage.setItem(
        "quiz",
        JSON.stringify(dataWithRandomizedAnswerIndex),
      );
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
};

export default App;
