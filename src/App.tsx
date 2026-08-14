import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen bg-[#FCFBF7] text-stone-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl border-2 border-stone-800 shadow-[4px_4px_0px_0px_rgba(41,37,36,1)] p-6 space-y-5 text-center">
        <header className="space-y-1">
          <div className="inline-block px-3 py-1 bg-amber-100 border border-stone-800 rounded-full text-xs font-bold text-amber-900 tracking-wide uppercase">
            Setup Berhasil
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            漢字ごと
          </h1>
          <p className="text-sm font-medium text-stone-500">
            KanjiGoto App • Marugoto Drill
          </p>
        </header>

        <section className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-left space-y-2 text-xs text-stone-600">
          <div className="font-semibold text-stone-800">Stack & Environment:</div>
          <ul className="list-disc list-inside space-y-1">
            <li>React 19 + TypeScript (Vite)</li>
            <li>Tailwind CSS v4 Active</li>
            <li>Folder structure configured</li>
          </ul>
        </section>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setCount((prev) => prev + 1)}
            className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(41,37,36,1)] text-stone-900 font-bold rounded-2xl border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(41,37,36,1)] transition-all cursor-pointer"
          >
            Klik Uji State: {count}
          </button>
        </div>
      </div>
    </main>
  )
}
