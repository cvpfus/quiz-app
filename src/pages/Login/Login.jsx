import styled from "styled-components";
import { useField } from "@/hooks/useField.js";
import Button from "@/components/Button.jsx";
import Container from "@/components/Container.jsx";
import { Navigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
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
  const [errorMessage, setErrorMessage] = useState(null);
  const timeoutRef = useRef(null);

  if (user?.username) return <Navigate to="/initial" />;

  const handleLogin = (e) => {
    e.preventDefault();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (usernameField.value === "user" && passwordField.value === "user") {
      setUsername(state, dispatch, "user");
      navigate("/initial");
    }
    if (usernameField.value !== "user") {
      setErrorMessage("Account does not exist in our database.");
    } else if (passwordField.value !== "user") {
      setErrorMessage("Invalid password.");
    }

    timeoutRef.current = setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <Container>
      <h2 style={{ marginBottom: "48px" }}>Welcome to Quiz App</h2>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <InputContainer>
          <label htmlFor="username">Username</label>
          <Input
            {...usernameField}
            id="username"
            autoComplete="off"
            required={true}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Password</label>
          <Input {...passwordField} id="password" required={true} />
        </InputContainer>
        <p style={{ fontSize: "12px", color: "red", height: "12px" }}>
          {errorMessage}
        </p>
        <Button style={{ width: "240px", marginTop: "12px" }}>Login</Button>
      </form>
    </Container>
  );
};

export default Login;
