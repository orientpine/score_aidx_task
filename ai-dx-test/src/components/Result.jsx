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
        
        <div className="border-t border-taupe/20 pt-8">
          <h3 className="text-lg font-semibold text-forest mb-5">
            결과 공유하기
          </h3>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={() => shareOnSocial('twitter')}
              className="flex-1 min-w-[100px] px-4 py-3 bg-wine text-cream rounded-xl hover:bg-wine-dark transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Twitter
            </button>
            <button
              onClick={() => shareOnSocial('linkedin')}
              className="flex-1 min-w-[100px] px-4 py-3 bg-forest text-cream rounded-xl hover:bg-wine-dark transition-all duration-300 shadow-md hover:shadow-lg"
            >
              LinkedIn
            </button>
            <button
              onClick={() => shareOnSocial('facebook')}
              className="flex-1 min-w-[100px] px-4 py-3 bg-wine-dark text-cream rounded-xl hover:bg-forest transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Facebook
            </button>
          </div>
          
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-4 py-3 border border-taupe/30 rounded-xl bg-cream/30 text-sm text-wine-dark"
            />
            <button
              onClick={copyToClipboard}
              className="px-5 py-3 bg-taupe/30 text-wine-dark rounded-xl hover:bg-taupe/40 transition-all duration-300 font-medium"
            >
              {isCopied ? '복사됨!' : '링크 복사'}
            </button>
          </div>
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