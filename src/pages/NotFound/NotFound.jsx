import Container from "@/components/Container.jsx";
import Button from "@/components/Button.jsx";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <span>404 Not Found.</span>
      <Button onClick={() => navigate("/")} style={{ marginTop: "12px" }}>
        Home
      </Button>
    </Container>
  );
};

export default NotFound;
