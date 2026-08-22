export default function JobsLoading() {
  return (
    <div className="page-shell py-16 sm:py-24">
      <div className="h-3 w-24 bg-line" />
      <div className="mt-6 h-10 w-64 bg-line" />
      <div className="mt-20 space-y-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-px bg-line" />
        ))}
      </div>
    </div>
  );
}
