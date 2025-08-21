import { useState, useEffect } from 'react'
import Home from './components/Home'
import Test from './components/Test'
import Result from './components/Result'
import questionsData from './data/questions.json'

function App() {
  const [screen, setScreen] = useState('home')
  const [questions, setQuestions] = useState(questionsData)
  const [answers, setAnswers] = useState([])
  const [testResult, setTestResult] = useState(null)

  const startTest = () => {
    setAnswers([])
    setScreen('test')
  }

  const submitAnswer = (questionId, score) => {
    setAnswers([...answers, { questionId, score }])
  }

  const completeTest = () => {
    const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0)
    const result = questions.results.ranges.find(
      range => totalScore >= range.min && totalScore <= range.max
    )
    setTestResult({ score: totalScore, ...result })
    setScreen('result')
  }

  const restartTest = () => {
    setAnswers([])
    setTestResult(null)
    setScreen('home')
  }

  if (!questions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {screen === 'home' && (
        <Home 
          title={questions.title}
          description={questions.description}
          onStart={startTest}
        />
      )}
      {screen === 'test' && (
        <Test
          questions={questions.questions}
          answers={answers}
          onAnswer={submitAnswer}
          onComplete={completeTest}
        />
      )}
      {screen === 'result' && (
        <Result
          result={testResult}
          onRestart={restartTest}
        />
      )}
    </div>
  )
}

export default App