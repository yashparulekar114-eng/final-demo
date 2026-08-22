export default function JobsLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="h-8 w-40 bg-slate-200 rounded-lg animate-pulse" />
        <div className="mt-4 h-10 w-72 bg-slate-200 rounded-lg animate-pulse" />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl border border-slate-200 bg-white animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
