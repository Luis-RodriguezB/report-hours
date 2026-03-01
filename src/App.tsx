import { TimesheetWrapper } from "@/components/TimesheetWrapper";

import "./App.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f7f4]">
      <header className="flex items-center px-6 py-3.5 bg-white border-b border-stone-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
            <span className="text-indigo-700 text-sm font-bold select-none">R</span>
          </div>
          <div>
            <h1 className="text-[0.95rem] font-semibold text-stone-800 leading-tight">
              Registro de Horas
            </h1>
            <p className="text-[0.7rem] text-stone-400 leading-tight">
              Gestión de tiempo y tareas
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-5 sm:p-6">
        <TimesheetWrapper />
      </main>
    </div>
  );
}

export default App;
