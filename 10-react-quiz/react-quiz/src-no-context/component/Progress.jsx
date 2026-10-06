export default function Progress({
  index,
  noOfQuestions,
  points,
  totalPoints,
  answer
}) {
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
