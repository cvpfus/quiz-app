import Container from "@/components/Container.jsx";
import { useLocalStorage } from "@/hooks/useLocalStorage.js";
import styled from "styled-components";
import { useEffect } from "react";
import { clearUserAnswers } from "@/reducers/quizReducer.js";

const Table = styled.table`
  margin-top: 24px;
  &,
  td {
    padding: 6px;
    border: 1px solid black;
    border-collapse: collapse;
  }
`;

const Result = () => {
  const user = useLocalStorage("user");
  const quiz = useLocalStorage("quiz");

  if (!user || !quiz) {
    return (
      <Container>
        <h1>Something went wrong..</h1>
      </Container>
    );
  }

  const totalCorrectAnswers = user.userAnswers.reduce((acc, curr, i) => {
    if (quiz[i].answer_index === curr) return acc + 1;
    else return acc;
  }, 0);

  return (
    <Container>
      <h1 style={{ marginBottom: "12px" }}>Your Final Score</h1>
      <h1>{totalCorrectAnswers * 10}</h1>
      <Table>
        <tbody>
          <tr>
            <td>Total answered</td>
            <td>{user.userAnswers.length}</td>
          </tr>
          <tr>
            <td>Total correct answers</td>
            <td>{totalCorrectAnswers}</td>
          </tr>
          <tr>
            <td>Total wrong answers</td>
            <td>{quiz.length - totalCorrectAnswers}</td>
          </tr>
        </tbody>
      </Table>

      <h3 style={{ marginTop: "24px" }}>Start new Quiz?</h3>
    </Container>
  );
};

export default Result;
