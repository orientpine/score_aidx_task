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
      <div className="max-w-3xl w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-taupe/20">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-wine-dark">
              문제 {currentQuestionIndex + 1} / {questions.length}
            </span>
            <span className="text-sm font-medium text-wine-dark">
              {Math.round(progress)}% 완료
            </span>
          </div>
          <div className="w-full bg-taupe/30 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-wine to-forest h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <div className="inline-block px-4 py-2 bg-forest/10 text-forest rounded-full text-sm font-semibold mb-4 border border-forest/20">
            {currentQuestion.category}
          </div>
          
          <h2 className="text-2xl font-bold text-wine mb-4">
            상황 {currentQuestionIndex + 1}
          </h2>
          
          <p className="text-lg text-wine-dark mb-8">
            {currentQuestion.situation}
          </p>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(option.score)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                  selectedOption === option.score
                    ? 'border-wine bg-wine/5'
                    : 'border-taupe/30 hover:border-taupe/50 hover:bg-cream/30'
                }`}
              >
                <div className="flex items-start">
                  <div className={`w-5 h-5 rounded-full border-2 mr-4 mt-0.5 flex items-center justify-center ${
                    selectedOption === option.score
                      ? 'border-wine bg-wine'
                      : 'border-taupe/50'
                  }`}>
                    {selectedOption === option.score && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-wine-dark">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <button
            onClick={() => setShowImagePrompt(!showImagePrompt)}
            className="text-sm text-forest hover:text-wine underline decoration-dotted transition-colors duration-200"
          >
            {showImagePrompt ? '이미지 프롬프트 숨기기' : '이미지 생성 프롬프트 보기'}
          </button>
          
          {showImagePrompt && (
            <div className="mt-4 p-5 bg-cream/50 rounded-xl border border-taupe/20">
              <p className="text-sm text-wine-dark">
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
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              currentQuestionIndex === 0
                ? 'bg-taupe/20 text-taupe/50 cursor-not-allowed'
                : 'bg-taupe/30 text-wine-dark hover:bg-taupe/40'
            }`}
          >
            이전
          </button>
          
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`px-7 py-3 rounded-xl font-semibold transition-all duration-300 ${
              selectedOption === null
                ? 'bg-taupe/20 text-taupe/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-wine to-forest text-cream hover:from-wine-dark hover:to-forest shadow-lg hover:shadow-xl'
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