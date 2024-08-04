import Container from "@/components/Container.jsx";
import Button from "@/components/Button.jsx";

const Initial = ({ handleStart }) => {
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
