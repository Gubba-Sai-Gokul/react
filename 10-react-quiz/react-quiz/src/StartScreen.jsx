import { useQuizContext } from "./contexts/QuizContext";

export default function StartScreen() {
  const {noOfQuestions, dispatch} = useQuizContext();
  
  return (
    <>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{noOfQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </>
  );
}
