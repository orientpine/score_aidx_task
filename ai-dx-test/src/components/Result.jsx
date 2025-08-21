import { useState, useEffect } from 'react'

const Result = ({ result, onRestart }) => {
  const [shareUrl, setShareUrl] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)
  
  useEffect(() => {
    const url = `${window.location.origin}?score=${result.score}&level=${encodeURIComponent(result.level)}`
    setShareUrl(url)
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
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }
  
  const shareOnSocial = (platform) => {
    const text = `나의 AI/DX 역량 점수는 ${result.score}점! "${result.title}" 레벨입니다.`
    const encodedText = encodeURIComponent(text)
    const encodedUrl = encodeURIComponent(shareUrl)
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    }
    
    window.open(urls[platform], '_blank', 'width=600,height=400')
  }
  
  const getScoreColor = () => {
    if (result.score >= 80) return 'from-green-500 to-emerald-600'
    if (result.score >= 60) return 'from-blue-500 to-indigo-600'
    if (result.score >= 30) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-pink-600'
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            테스트 결과
          </h1>
          
          {isSaving && (
            <div className="text-sm text-gray-500 mb-2">결과 저장 중...</div>
          )}
          
          {saveError && (
            <div className="text-sm text-red-500 mb-2">{saveError}</div>
          )}
          
          <div className="relative inline-block">
            <div className={`text-6xl font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent`}>
              {result.score}점
            </div>
            <div className="text-lg text-gray-600 mt-2">
              총 100점 만점
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 mb-6">
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-2 bg-indigo-500 text-white rounded-full text-sm font-semibold">
              {result.level}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">
            {result.title}
          </h2>
          
          <p className="text-gray-700 text-center">
            {result.description}
          </p>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            추천 개선 방안
          </h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            결과 공유하기
          </h3>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={() => shareOnSocial('twitter')}
              className="flex-1 min-w-[100px] px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              Twitter
            </button>
            <button
              onClick={() => shareOnSocial('linkedin')}
              className="flex-1 min-w-[100px] px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              LinkedIn
            </button>
            <button
              onClick={() => shareOnSocial('facebook')}
              className="flex-1 min-w-[100px] px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Facebook
            </button>
          </div>
          
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              {isCopied ? '복사됨!' : '링크 복사'}
            </button>
          </div>
        </div>
        
        <button
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-600 hover:to-blue-700 transition-all duration-200"
        >
          다시 테스트하기
        </button>
      </div>
    </div>
  )
}

export default Result