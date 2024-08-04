import styled from "styled-components";
import { useField } from "@/hooks/useField.js";
import Button from "@/components/Button.jsx";
import Container from "@/components/Container.jsx";
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

  const navigate = useNavigate();

  const handleLogin = () => {
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
