import { useState, useEffect } from 'react'

const Test = ({ questions, answers, onAnswer, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showImagePrompt, setShowImagePrompt] = useState(false)
  
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  
  const handleNext = () => {
    if (selectedOption !== null) {
      onAnswer(currentQuestion.id, selectedOption)
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedOption(null)
        setShowImagePrompt(false)
      } else {
        onComplete()
      }
    }
  }
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      const prevAnswer = answers.find(a => a.questionId === questions[currentQuestionIndex - 1].id)
      setSelectedOption(prevAnswer ? prevAnswer.score : null)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              문제 {currentQuestionIndex + 1} / {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% 완료
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
            {currentQuestion.category}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            상황 {currentQuestionIndex + 1}
          </h2>
          
          <p className="text-lg text-gray-700 mb-6">
            {currentQuestion.situation}
          </p>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(option.score)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedOption === option.score
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 mt-0.5 flex items-center justify-center ${
                    selectedOption === option.score
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedOption === option.score && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-700">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <button
            onClick={() => setShowImagePrompt(!showImagePrompt)}
            className="text-sm text-indigo-600 hover:text-indigo-700 underline"
          >
            {showImagePrompt ? '이미지 프롬프트 숨기기' : '이미지 생성 프롬프트 보기'}
          </button>
          
          {showImagePrompt && (
            <div className="mt-3 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">이미지 생성 프롬프트:</span><br />
                {currentQuestion.imagePrompt}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentQuestionIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            이전
          </button>
          
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              selectedOption === null
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700'
            }`}
          >
            {currentQuestionIndex === questions.length - 1 ? '결과 확인' : '다음'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Test