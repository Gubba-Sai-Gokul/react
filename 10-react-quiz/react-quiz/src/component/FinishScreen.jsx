import { useQuizContext } from "../contexts/QuizContext";

export default function FinishScreen() {
  const {
    points,
    totalPoints: maxPossiblePoints,
    highScore,
    dispatch,
  } = useQuizContext();

  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restartQuiz" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
