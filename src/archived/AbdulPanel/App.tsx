import RecommendationsPanel from './components/RecommendationsPanel';
import { mockRecommendationsData } from './data/mockData';
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative min-h-screen py-12 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10 sm:mb-12 text-center">
            <div 
              className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 shadow-2xl mb-5 sm:mb-6 transform hover:scale-105 transition-transform duration-300 focus-within:scale-105 focus-within:ring-4 focus-within:ring-primary-500/30 focus-within:outline-none"
              aria-hidden="true"
              tabIndex={0}
            >
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">
              AI Recommendations Panel
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 font-medium">
              Advanced clinical decision support interface
            </p>
          </header>
          
          <main>
            <RecommendationsPanel
              summary={mockRecommendationsData.summary}
              recommendations={mockRecommendationsData.recommendations}
              flags={mockRecommendationsData.flags}
            />
          </main>
        </div>
      </div>
    </div>
  )
}

export default App

