
import React, { useState, useCallback } from 'react';
import { QuizQuestion, GameState, Feedback, FeedbackType } from './types';
import fetchQuizData from './services/geminiService';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Initial);
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<Feedback>({ type: FeedbackType.None, message: '' });
  const [error, setError] = useState<string | null>(null);

  const startGame = useCallback(async () => {
    setGameState(GameState.Loading);
    setError(null);
    setFeedback({ type: FeedbackType.None, message: '' });
    try {
      const data = await fetchQuizData();
      setQuizData(data);
      setCurrentQuestionIndex(0);
      setScore(0);
      setUserAnswer('');
      setGameState(GameState.Playing);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      setGameState(GameState.Initial);
    }
  }, []);

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.type !== FeedbackType.None) return;

    const correctAnswer = quizData[currentQuestionIndex].word;
    if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback({ type: FeedbackType.Correct, message: '정답입니다!' });
      setScore(prev => prev + 1);
    } else {
      setFeedback({ type: FeedbackType.Incorrect, message: `오답입니다. 정답: ${correctAnswer}` });
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setFeedback({ type: FeedbackType.None, message: '' });
    } else {
      setGameState(GameState.Finished);
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.Loading:
        return <LoadingSpinner />;
      case GameState.Playing:
        const currentQuestion = quizData[currentQuestionIndex];
        return (
          <div className="w-full max-w-2xl text-center">
            <div className="mb-4 text-slate-400">
              문제 {currentQuestionIndex + 1} / {quizData.length}
              <span className="ml-4 font-bold text-cyan-400">점수: {score}</span>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
              <p className="text-lg text-slate-300 mb-2">다음이 설명하는 단어는 무엇일까요?</p>
              <h2 className="text-3xl font-bold mb-6 text-white min-h-[80px] flex items-center justify-center">{currentQuestion.definition}</h2>
              <form onSubmit={handleAnswerSubmit}>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="정답을 입력하세요"
                  disabled={feedback.type !== FeedbackType.None}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
                />
                 {feedback.type === FeedbackType.None ? (
                    <button type="submit" className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105">
                    제출
                    </button>
                ) : (
                    <button type="button" onClick={handleNextQuestion} className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105">
                    {currentQuestionIndex < quizData.length - 1 ? '다음 문제' : '결과 보기'}
                    </button>
                )}
              </form>
            </div>
            {feedback.type !== FeedbackType.None && (
                <div className={`mt-6 p-4 rounded-lg text-lg font-semibold ${
                    feedback.type === FeedbackType.Correct ? 'bg-green-500/20 text-green-300 border border-green-500' : 'bg-red-500/20 text-red-300 border border-red-500'
                }`}>
                    {feedback.message}
                </div>
            )}
          </div>
        );
    case GameState.Finished:
        return (
            <div className="text-center bg-slate-800 p-10 rounded-xl shadow-lg border border-slate-700">
                <h2 className="text-4xl font-bold mb-4 text-cyan-400">퀴즈 완료!</h2>
                <p className="text-2xl mb-6 text-slate-300">최종 점수는 <span className="font-bold text-white">{score}</span> / {quizData.length} 점입니다.</p>
                <button onClick={startGame} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 text-lg">
                    새로운 퀴즈 시작하기
                </button>
            </div>
        );
      case GameState.Initial:
      default:
        return (
          <div className="text-center">
            <h1 className="text-5xl font-extrabold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Gemini 단어 퀴즈</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-prose mx-auto">Gemini AI가 실시간으로 생성하는 단어 퀴즈에 도전해보세요! 정의를 읽고 어떤 단어인지 맞춰보세요.</p>
            {error && <p className="text-red-400 bg-red-500/10 p-3 rounded-md mb-4">{error}</p>}
            <button onClick={startGame} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg text-xl">
              퀴즈 시작하기
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <main className="w-full flex items-center justify-center">
        {renderContent()}
      </main>
      <footer className="absolute bottom-4 text-slate-500 text-sm">
        Powered by Google Gemini
      </footer>
    </div>
  );
};

export default App;
