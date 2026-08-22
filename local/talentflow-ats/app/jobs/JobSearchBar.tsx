import { Search } from "lucide-react";

export default function JobSearchBar({ query }: { query: string }) {
  return (
    <form action="/jobs" method="get" className="mt-12">
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 max-w-2xl">
        <div className="flex-grow">
          <label htmlFor="q" className="label">
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="q"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Title or description"
              className="w-full bg-transparent border-0 border-b border-line rounded-none py-3 pl-7 pr-2 text-base text-ink placeholder:text-[#a39e96] focus:outline-none focus:border-ink"
            />
          </div>
        </div>
        <button type="submit" className="btn-primary sm:mb-1">
          Search
        </button>
      </div>
    </form>
  );
}
