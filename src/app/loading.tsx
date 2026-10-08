export default function Loading() {
  return (
    <section className="min-h-[60vh] flex items-center">
      <div className="container-editorial py-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-block w-3 h-3 border border-[var(--ink)] border-t-transparent rounded-full animate-spin"
              aria-hidden
            />
            <span className="eyebrow">Loading</span>
          </div>
          <div className="space-y-4">
            <div className="h-10 w-2/3 bg-[var(--rule)] rounded-sm animate-pulse" />
            <div className="h-4 w-full bg-[var(--rule)] rounded-sm animate-pulse" />
            <div className="h-4 w-5/6 bg-[var(--rule)] rounded-sm animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
