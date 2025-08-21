const Home = ({ title, description, onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {description}
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              테스트 안내
            </h2>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">✓</span>
                총 10개의 상황별 문제가 제시됩니다
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">✓</span>
                각 상황에서 더 적합한 선택지를 고르세요
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">✓</span>
                약 5분 정도 소요됩니다
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">✓</span>
                결과는 즉시 확인 가능하며 공유할 수 있습니다
              </li>
            </ul>
          </div>
          
          <button
            onClick={onStart}
            className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold py-4 px-8 rounded-xl text-lg hover:from-indigo-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            테스트 시작하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home