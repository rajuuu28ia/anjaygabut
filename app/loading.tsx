export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black w-screen h-screen overflow-hidden">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Welcome</h2>
        <p className="text-gray-400 text-lg">Loading your experience...</p>
        <div className="w-48 h-1 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 rounded-full mx-auto mt-6 animate-pulse"></div>
      </div>
    </div>
  );
}
