export default function DevicesLoading() {
    return (
        <div className="p-4 pt-16 lg:pt-8 lg:p-8 space-y-8 animate-pulse">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="h-10 w-56 bg-zinc-800 rounded-lg mb-2" />
                    <div className="h-5 w-72 bg-zinc-800/60 rounded-lg" />
                </div>
                <div className="h-10 w-32 bg-zinc-800 rounded-lg" />
            </div>

            {/* Toolbar */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col md:flex-row gap-4">
                <div className="h-10 flex-1 bg-zinc-800/50 rounded-lg" />
                <div className="h-10 w-full md:w-[200px] bg-zinc-800/50 rounded-lg" />
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 h-[200px]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-zinc-800 rounded-lg" />
                            <div className="w-3 h-3 bg-zinc-800 rounded-full" />
                        </div>
                        <div className="h-5 w-40 bg-zinc-800 rounded mb-2" />
                        <div className="h-4 w-28 bg-zinc-800/60 rounded mb-6" />
                        <div className="flex justify-between">
                            <div className="h-6 w-24 bg-zinc-800/50 rounded" />
                            <div className="h-6 w-16 bg-zinc-800/50 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
