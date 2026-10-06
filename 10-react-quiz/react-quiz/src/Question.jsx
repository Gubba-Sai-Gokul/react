import Options from "./component/Options";
import { useQuizContext } from "./contexts/QuizContext";

export default function Question() {
  const { questions, index } = useQuizContext();
  const question = questions[index]

  return (
    <div>
      <h4>{question?.question}</h4>
      <Options question={question} />
    </div>
  );
}
