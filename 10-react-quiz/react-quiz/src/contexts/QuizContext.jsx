import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  next: false,
  highScore: 0,
  timer: 8 * 60,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "failed" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        next: true,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
        next: false,
      };
    case "tick":
      return {
        ...state,
        timer: state.timer - 1,
        status: state.timer <= 0 ? "finished" : state.status,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restartQuiz":
      return {
        ...state,
        index: 0,
        status: "ready",
        answer: null,
        points: 0,
        highScore: 0,
        timer: 8 * 60,
      };
  }
}

function QuizContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, next, highScore, timer } =
    state;
  const noOfQuestions = questions.length;
  const totalPoints = questions.reduce((acc, q) => acc + q.points, 0);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        next,
        highScore,
        timer,
        noOfQuestions,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === null) {
    throw new Error("useQuizContext must be used within a QuizContextProvider");
  }
  return context;
}

/* eslint-disable react-refresh/only-export-components */
export { QuizContextProvider, useQuizContext };
