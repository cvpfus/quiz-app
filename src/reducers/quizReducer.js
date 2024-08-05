import { useLocalStorage } from "@/hooks/useLocalStorage.js";

const quizReducer = (state = {}, action) => {
  switch (action.type) {
    case "APPEND_USER_ANSWERS":
      return {
        ...state,
        userAnswers: state.userAnswers.concat(action.payload),
      };
    case "SET_USER_ANSWERS":
      return {
        ...state,
        userAnswers: action.payload,
      };
    case "SET_USERNAME":
      return {
        ...state,
        username: action.payload,
      };
    case "CLEAR_USER_ANSWERS":
      return { ...state, userAnswers: [] };
    case "SET_CURRENT_QUESTION_IDX":
      return { ...state, currentQuestionIndex: action.payload };
  }
};

export const initialize = (dispatch, user) => {
  dispatch({ type: "SET_USERNAME", payload: user.username });
  dispatch({ type: "SET_USER_ANSWERS", payload: user.userAnswers });
  dispatch({
    type: "SET_CURRENT_QUESTION_IDX",
    payload: user.currentQuestionIndex,
  });
};

export const setCurrentQuestionIdx = (state, dispatch, idx) => {
  dispatch({ type: "SET_CURRENT_QUESTION_IDX", payload: idx });

  window.localStorage.setItem(
    "user",
    JSON.stringify({
      username: state.username,
      currentQuestionIndex: idx,
      userAnswers: state.userAnswers,
    }),
  );
};

export const setUsername = (state, dispatch, data) => {
  dispatch({ type: "SET_USERNAME", payload: data });

  window.localStorage.setItem(
    "user",
    JSON.stringify({
      username: data,
      currentQuestionIndex: state.currentQuestionIndex,
      userAnswers: state.userAnswers,
    }),
  );
};

export const setUserAnswers = (state, dispatch, data) => {
  dispatch({ type: "APPEND_USER_ANSWERS", payload: data });

  window.localStorage.setItem(
    "user",
    JSON.stringify({
      username: state.username,
      currentQuestionIndex: state.currentQuestionIndex,
      userAnswers: state.userAnswers.concat(data),
    }),
  );
};

export const clearUserAnswers = (state, dispatch) => {
  dispatch({ type: "CLEAR_USER_ANSWERS" });
  dispatch({ type: "SET_CURRENT_QUESTION_IDX", payload: 0 });

  window.localStorage.setItem(
    "user",
    JSON.stringify({
      username: state.username,
      userAnswers: [],
      currentQuestionIndex: 0,
    }),
  );
};

export default quizReducer;
