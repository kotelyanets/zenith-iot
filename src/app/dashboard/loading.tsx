export default function DashboardLoading() {
    return (
        <div className="p-4 pt-16 lg:pt-8 lg:p-8 animate-pulse">
            {/* Header skeleton */}
            <div className="mb-8">
                <div className="h-10 w-48 bg-zinc-800 rounded-lg mb-2" />
                <div className="h-5 w-80 bg-zinc-800/60 rounded-lg" />
            </div>

            {/* Grid skeleton matching bento layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[240px] gap-4 lg:gap-6">
                {/* Energy chart placeholder (spans 3 cols, 2 rows) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 row-span-2 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                    <div className="h-6 w-56 bg-zinc-800 rounded mb-2" />
                    <div className="h-4 w-40 bg-zinc-800/60 rounded mb-8" />
                    <div className="h-[calc(100%-80px)] bg-zinc-800/30 rounded-lg" />
                </div>

                {/* System health placeholder (1 col, 2 rows) */}
                <div className="col-span-1 row-span-2 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex flex-col items-center gap-6">
                    <div className="h-5 w-32 bg-zinc-800 rounded" />
                    <div className="h-6 w-40 bg-zinc-800/60 rounded-full" />
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className="w-20 h-20 rounded-full border-8 border-zinc-800/50" />
                            <div className="h-4 w-20 bg-zinc-800/60 rounded" />
                        </div>
                    ))}
                </div>

                {/* Device map placeholder (2 cols, 2 rows) */}
                <div className="col-span-1 md:col-span-1 lg:col-span-2 row-span-2 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                    <div className="h-6 w-40 bg-zinc-800 rounded mb-2" />
                    <div className="h-4 w-48 bg-zinc-800/60 rounded mb-4" />
                    <div className="h-[calc(100%-80px)] bg-zinc-800/30 rounded-lg" />
                </div>

                {/* Incidents placeholder (2 cols, 2 rows) */}
                <div className="col-span-1 md:col-span-1 lg:col-span-2 row-span-2 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                    <div className="h-6 w-36 bg-zinc-800 rounded mb-4" />
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-4 py-3">
                            <div className="h-4 w-24 bg-zinc-800/60 rounded" />
                            <div className="h-4 w-40 bg-zinc-800/40 rounded flex-1" />
                            <div className="h-5 w-16 bg-zinc-800/50 rounded-full" />
                            <div className="h-4 w-16 bg-zinc-800/30 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
