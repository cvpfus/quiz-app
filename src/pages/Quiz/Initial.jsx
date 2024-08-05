import Container from "@/components/Container.jsx";
import Button from "@/components/Button.jsx";
import { useNavigate } from "react-router-dom";

const Initial = ({ handleStart, isStarted }) => {
  const navigate = useNavigate();
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
  return (
    <Container>
      <div>Quiz Rules (TODO)</div>
      <div>1. aaaaaaa</div>
      <div>2. bbbbbbb</div>
      <div>3. ccccccc</div>
      <Button style={{ marginTop: "24px" }} onClick={handleStart}>
        Start
      </Button>
    </Container>
  );
};

export default Initial;
