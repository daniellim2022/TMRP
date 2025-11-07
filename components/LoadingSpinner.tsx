
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400"></div>
      <p className="text-cyan-300 text-lg">퀴즈를 생성 중입니다...</p>
    </div>
  );
};

export default LoadingSpinner;
