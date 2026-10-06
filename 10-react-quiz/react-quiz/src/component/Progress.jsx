import { useQuizContext } from "../contexts/QuizContext";

export default function Progress() {
  const {index, noOfQuestions, points, totalPoints, answer} = useQuizContext();
  
  return (
    <header className="progress">
      <progress max={noOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / <strong>{noOfQuestions}</strong>
      </p>
      <p>
        <strong>{points}</strong> / <strong>{totalPoints}</strong>
      </p>
    </header>
  );
}
