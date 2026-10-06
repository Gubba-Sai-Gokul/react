import { useQuizContext } from "../contexts/QuizContext";

export default function NextButton() {
  const { dispatch, answer, index, noOfQuestions } = useQuizContext();

  if (answer === null) return null;

  if (index < noOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === noOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}
