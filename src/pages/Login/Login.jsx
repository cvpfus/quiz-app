import styled from "styled-components";
import { useField } from "@/hooks/useField.js";
import Button from "@/components/Button.jsx";
import Container from "@/components/Container.jsx";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import QuizContext from "@/contexts/QuizContext.jsx";
import { setUsername } from "@/reducers/quizReducer.js";
import { useLocalStorage } from "@/hooks/useLocalStorage.js";
import { useNavigate } from "react-router-dom";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: space-between;
  padding: 12px;
`;

const Input = styled.input`
  width: 240px;
  height: 36px;
  padding: 12px;
`;

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const { resetValue: resetUsername, ...usernameField } = useField("text");
  // eslint-disable-next-line no-unused-vars
  const { resetValue: resetPassword, ...passwordField } = useField("password");
  const [state, dispatch] = useContext(QuizContext);
  const user = useLocalStorage("user");
  const navigate = useNavigate();

  if (user?.username) return <Navigate to="/initial" />;

  const handleLogin = () => {
    setUsername(state, dispatch, "test");
    navigate("/quiz");
  };

  return (
    <Container>
      <h2 style={{ marginBottom: "48px" }}>Welcome to Quiz App</h2>
      <InputContainer>
        <label htmlFor="username">Username</label>
        <Input {...usernameField} id="username" autoComplete="off" />
      </InputContainer>
      <InputContainer>
        <label htmlFor="password">Password</label>
        <Input {...passwordField} id="password" />
      </InputContainer>
      <Button
        style={{ width: "240px", marginTop: "12px" }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Container>
  );
};

export default Login;
