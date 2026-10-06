import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainBlock from "./MainBlock";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./component/NextButton";
import Progress from "./component/Progress";
import FinishScreen from "./component/FinishScreen";

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

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, next, highScore, timer } =
    state;
  const noOfQuestions = questions.length;
  const totalPoints = questions.reduce((acc, q) => acc + q.points, 0);

  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        if (!response.ok) {
          throw new Error("Response was not okay");
        }
        const data = await response.json();

        dispatch({ type: "dataReceived", payload: data });
      } catch (e) {
        dispatch({ type: "dataFailed" });
        console.error(e.message);
      }
    }

    getQuestions();
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      dispatch({ type: "finish" });
      return;
    }

    const timeout = setTimeout(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timer]);

  return (
    <div className="app">
      <Header />
      <MainBlock>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <>
            <StartScreen noOfQuestions={noOfQuestions} dispatch={dispatch} />
          </>
        )}
        {status === "failed" && <Error />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              noOfQuestions={noOfQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              next={next}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              noOfQuestions={noOfQuestions}
            />
            <div className="timer">
              {Math.floor(timer / 60)} : {timer % 60}
            </div>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </MainBlock>
    </div>
  );
}
