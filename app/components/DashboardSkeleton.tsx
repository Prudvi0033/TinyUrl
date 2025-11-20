export function DashboardSkeleton() {
  return (
    <div className="bg-neutral-950 min-h-screen">
      {/* HEADER SKELETON */}
      <header className="w-full fixed top-0 left-0 right-0 bg-neutral-950 ">
        <div className="max-w-3xl border-b border-neutral-800 mx-auto px-6 py-6 flex items-center justify-between animate-pulse">
          {/* user section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-800" />

            <div className="flex flex-col gap-1">
              <div className="h-3 w-32 bg-neutral-800 rounded" />
              <div className="h-3 w-40 bg-neutral-800 rounded" />
            </div>
          </div>

          {/* buttons */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-24 bg-neutral-800 rounded" />
            <div className="h-8 w-20 bg-neutral-800 rounded" />
          </div>
        </div>
      </header>

      {/* LIST SKELETON */}
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-10 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg mb-4"
          >
            <div className="h-4 w-40 bg-neutral-800 rounded mb-3" />
            <div className="h-3 w-64 bg-neutral-800 rounded mb-2" />
            <div className="h-3 w-48 bg-neutral-800 rounded mb-4" />

            <div className="flex justify-between items-center">
              <div className="h-3 w-40 bg-neutral-800 rounded" />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
