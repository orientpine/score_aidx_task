import { useState, useEffect } from "react";
import Home from "./components/Home";
import Test from "./components/Test";
import Result from "./components/Result";

function App() {
  const [screen, setScreen] = useState("home");
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error loading questions:", err));
  }, []);

  const startTest = () => {
    setAnswers([]);
    setScreen("test");
  };

  const submitAnswer = (questionId, score) => {
    setAnswers([...answers, { questionId, score }]);
  };

  const completeTest = () => {
    const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
    const result = questions.results.ranges.find(
      (range) => totalScore >= range.min && totalScore <= range.max,
    );
    setTestResult({ score: totalScore, ...result });
    setScreen("result");
  };

  const restartTest = () => {
    setAnswers([]);
    setTestResult(null);
    setScreen("home");
  };

  if (!questions) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-xl text-wine-dark">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {screen === "home" && (
        <Home
          title={questions.title}
          description={questions.description}
          onStart={startTest}
        />
      )}
      {screen === "test" && (
        <Test
          questions={questions.questions}
          answers={answers}
          onAnswer={submitAnswer}
          onComplete={completeTest}
        />
      )}
      {screen === "result" && (
        <Result result={testResult} onRestart={restartTest} />
      )}
    </div>
  );
}

export default App;
