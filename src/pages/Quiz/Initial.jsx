import Container from "@/components/Container.jsx";
import Button from "@/components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { DIFFICULTIES } from "@/constants/index.js";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage.js";

const Initial = ({ handleStart, isStarted, setDifficulty }) => {
  const navigate = useNavigate();
  const user = useLocalStorage("user");
  const [difficultyIndex, setDifficultyIndex] = useState(null);
  const handleResume = () => {
    navigate("/quiz");
  };

  if (isStarted) {
    return (
      <Container>
        <div style={{ marginBottom: "24px" }}>You have an ongoing quiz.</div>
        <Button onClick={handleResume}>Resume</Button>
      </Container>
    );
  }

  const handleDifficulty = (i) => {
    setDifficultyIndex(i);
    setDifficulty(DIFFICULTIES[i]);
  };

  const defaultStyle = { backgroundColor: "white", border: "2px solid black" };
  const selectedStyle = {
    backgroundColor: "var(--secondary)",
    border: "2px solid var(--secondary)",
    color: "white",
  };

  return (
    <Container style={{ justifyContent: "start", paddingTop: "48px" }}>
      <h2 style={{ marginBottom: "24px" }}>Hello, {user.username}!</h2>
      <h3 style={{ marginBottom: "12px" }}>About this Quiz</h3>
      <div>
        <div>1. Time limit is 2 minutes.</div>
        <div>2. This quiz is a multiple choice quiz.</div>
        <div>3. There are 10 random questions (not categorized).</div>
        <div>4. Before you begin, select the difficulty below.</div>
      </div>

      <h3 style={{ marginTop: "24px", marginBottom: "12px" }}>Difficulty</h3>
      <div style={{ display: "flex", gap: "12px" }}>
        {DIFFICULTIES.map((difficulty, i) => {
          return (
            <Button
              style={difficultyIndex === i ? selectedStyle : defaultStyle}
              key={i}
              onClick={() => handleDifficulty(i)}
            >
              {difficulty}
            </Button>
          );
        })}
      </div>

      <Button style={{ marginTop: "12px" }} onClick={handleStart}>
        Start
      </Button>
    </Container>
  );
};

export default Initial;
