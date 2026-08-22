import { Search } from "lucide-react";

export default function JobSearchBar({ query }: { query: string }) {
  return (
    <form action="/jobs" method="get" className="mt-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="q" className="sr-only">
          Search jobs
        </label>
        <div className="relative flex-grow">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search by title or description..."
            className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
        >
          <Search className="h-4 w-4 sm:hidden" />
          Search
        </button>
      </div>
    </form>
  );
}
