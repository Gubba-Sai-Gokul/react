import { useEffect } from "react";
import Header from "./Header";
import MainBlock from "./MainBlock";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./component/NextButton";
import Progress from "./component/Progress";
import FinishScreen from "./component/FinishScreen";
import { useQuizContext } from "./contexts/QuizContext";

export default function App() {
  const context = useQuizContext();

  const { status, timer, dispatch } = context;

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
            <StartScreen />
          </>
        )}
        {status === "failed" && <Error />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <NextButton />
            <div className="timer">
              {Math.floor(timer / 60)} : {timer % 60}
            </div>
          </>
        )}
        {status === "finish" && <FinishScreen />}
      </MainBlock>
    </div>
  );
}
