import { useState, useEffect } from 'react'

const Result = ({ result, onRestart }) => {
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)
  
  useEffect(() => {
    saveToSheetBest()
  }, [result])
  
  const saveToSheetBest = async () => {
    setIsSaving(true)
    setSaveError(null)
    
    try {
      const sheetBestUrl = import.meta.env.VITE_SHEET_BEST_URL || 'https://sheet.best/api/sheets/YOUR_SHEET_ID'
      
      const data = {
        timestamp: new Date().toISOString(),
        score: result.score,
        level: result.level,
        title: result.title,
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct'
      }
      
      const response = await fetch(sheetBestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      
      if (!response.ok) {
        throw new Error('Failed to save result')
      }
    } catch (error) {
      console.error('Error saving to Sheet.best:', error)
      setSaveError('결과 저장에 실패했습니다. 하지만 결과는 확인 가능합니다.')
    } finally {
      setIsSaving(false)
    }
  }
  
  const getScoreColor = () => {
    if (result.score >= 80) return 'from-forest to-wine'
    if (result.score >= 60) return 'from-wine to-wine-dark'
    if (result.score >= 30) return 'from-taupe to-wine'
    return 'from-wine-dark to-taupe'
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-taupe/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-wine mb-6">
            테스트 결과
          </h1>
          
          {isSaving && (
            <div className="text-sm text-taupe mb-2">결과 저장 중...</div>
          )}
          
          {saveError && (
            <div className="text-sm text-wine mb-2">{saveError}</div>
          )}
          
          <div className="relative inline-block">
            <div className={`text-6xl font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent`}>
              {result.score}점
            </div>
            <div className="text-lg text-wine-dark mt-3">
              총 100점 만점
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-cream/50 to-taupe/10 rounded-2xl p-7 mb-8 border border-taupe/20">
          <div className="text-center mb-4">
            <span className="inline-block px-5 py-2 bg-wine text-cream rounded-full text-sm font-bold tracking-wide">
              {result.level}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-forest text-center mb-4">
            {result.title}
          </h2>
          
          <p className="text-wine-dark text-center leading-relaxed">
            {result.description}
          </p>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-forest mb-4">
            추천 개선 방안
          </h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="text-wine mr-3 text-lg">•</span>
                <span className="text-wine-dark">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <button
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-wine to-forest text-cream font-bold py-4 px-6 rounded-2xl hover:from-wine-dark hover:to-forest transition-all duration-300 shadow-xl hover:shadow-2xl"
        >
          다시 테스트하기
        </button>
      </div>
    </div>
  )
}

export default Result