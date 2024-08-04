const quizReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_QUIZ":
      return { ...state, quiz: action.payload };
  }
};

export const setQuiz = (dispatch, data) => {
  dispatch({ type: "SET_QUIZ", payload: data });
};

export default quizReducer;
