const Home = ({ title, description, onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-taupe/20">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-wine mb-6">
            {title}
          </h1>
          <p className="text-lg text-wine-dark mb-10">
            {description}
          </p>
          
          <div className="bg-gradient-to-br from-cream/50 to-taupe/10 rounded-2xl p-6 mb-10 border border-taupe/20">
            <h2 className="text-xl font-semibold text-forest mb-4">
              테스트 안내
            </h2>
            <ul className="text-left text-wine-dark space-y-3">
              <li className="flex items-start">
                <span className="text-wine mr-3 text-lg">✓</span>
                총 10개의 상황별 문제가 제시됩니다
              </li>
              <li className="flex items-start">
                <span className="text-wine mr-3 text-lg">✓</span>
                각 상황에서 더 적합한 선택지를 고르세요
              </li>
              <li className="flex items-start">
                <span className="text-wine mr-3 text-lg">✓</span>
                약 5분 정도 소요됩니다
              </li>
              <li className="flex items-start">
                <span className="text-wine mr-3 text-lg">✓</span>
                결과는 즉시 확인 가능하며 공유할 수 있습니다
              </li>
            </ul>
          </div>
          
          <button
            onClick={onStart}
            className="bg-gradient-to-r from-wine to-wine-dark text-cream font-semibold py-4 px-10 rounded-2xl text-lg hover:from-wine-dark hover:to-forest transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            테스트 시작하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home