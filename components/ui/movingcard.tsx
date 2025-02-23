export default function MovingBeamCard() {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-gray-900">
        {/* Beam Effect */}
        <div className="absolute inset-0 w-80 h-48 rounded-xl border border-gray-700">
          <div className="absolute inset-0 rounded-xl animate-spin-slow">
            <div className="absolute w-36 h-36 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-50 rounded-full top-[-20%] left-[-20%]"></div>
            <div className="absolute w-36 h-36 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-50 rounded-full bottom-[-20%] right-[-20%]"></div>
          </div>
        </div>
  
        {/* Card */}
        <div className="relative z-10 p-6 bg-gray-800 border border-gray-700 rounded-xl shadow-lg w-80 text-white text-center">
          <h2 className="text-2xl font-bold">Magic Beam Card</h2>
          <p className="mt-2 text-gray-300">This card has a glowing moving beam effect!</p>
        </div>
      </div>
    );
  }
  