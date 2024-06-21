

const TypingAnimation = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-1 h-1 rounded-full bg-white animate-pulse"></div>
      <div className="w-1 h-1 rounded-full bg-white animate-pulse delay-75"></div>
      <div className="w-1 h-1 rounded-full bg-white animate-pulse delay-150"></div>
    </div>
  );
}

export default TypingAnimation