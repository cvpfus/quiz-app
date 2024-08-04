import { createContext, useReducer } from "react";
import quizReducer from "@/reducers/quizReducer.js";

const QuizContext = createContext(null);

export const QuizContextProvider = ({ children }) => {
  const [quiz, dispatchQuiz] = useReducer(quizReducer, {
    quiz: null,
  });

  return (
    <QuizContext.Provider value={[quiz, dispatchQuiz]}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
