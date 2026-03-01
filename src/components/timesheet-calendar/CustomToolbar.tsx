import { useState } from "react";
import { ToolbarProps, Views, View, NavigateAction } from "react-big-calendar";

import { Button } from "@/components/common/Button";
import { ButtonGroup } from "@/components/common/ButtonGroup";
import { useTimesheetStore } from "@/store/timesheetStore";
import { getMonthKey } from "@/utils/dateUtils";
import { exportExcelMonth } from "@/services/exportExcelMonth";
import { flattenMonthData } from "@/utils/flattenMonthData";

const VIEW_LABELS: Partial<Record<View | string, string>> = {
  [Views.MONTH]: "Mes",
  [Views.WEEK]: "Semana",
  [Views.DAY]: "Día",
  [Views.AGENDA]: "Agenda",
  work_week: "Sem. laboral",
};

export const CustomToolbar = ({
  view,
  views,
  label,
  onView,
  onNavigate,
  date,
}: ToolbarProps<any, object>) => {
  const getTasksByMonth = useTimesheetStore((s) => s.getTasksByMonth);
  const [activeNav, setActiveNav] = useState<NavigateAction | null>("TODAY");
  const viewList = views as View[];

  const monthKey = getMonthKey(date);
  const tasks = getTasksByMonth(date);
  const excelRow = flattenMonthData(tasks);

  const handleNavigate = (action: NavigateAction) => {
    setActiveNav(action);
    onNavigate(action);
  };

  const handleExportExcel = async () => {
    try {
      await exportExcelMonth(monthKey, excelRow);
      alert("Excel generado en Documentos ✅");
    } catch (err) {
      console.error(err);
      alert("Error al generar el Excel ❌");
    }
  };

  return (
    <div className="flex items-center gap-3 mb-4 flex-wrap">
      {/* Navigation */}
      <ButtonGroup variant="outlined" color="info">
        <Button
          variant={activeNav === "PREV" ? "contained" : "outlined"}
          onClick={() => handleNavigate("PREV")}
          className="px-3"
          title="Anterior"
        >
          ‹
        </Button>
        <Button
          variant={activeNav === "TODAY" ? "contained" : "outlined"}
          onClick={() => handleNavigate("TODAY")}
        >
          Hoy
        </Button>
        <Button
          variant={activeNav === "NEXT" ? "contained" : "outlined"}
          onClick={() => handleNavigate("NEXT")}
          className="px-3"
          title="Siguiente"
        >
          ›
        </Button>
      </ButtonGroup>

      {/* View switcher */}
      <ButtonGroup variant="outlined" color="secondary">
        {viewList.map((v) => (
          <Button
            key={v}
            onClick={() => onView(v)}
            variant={view === v ? "contained" : "outlined"}
          >
            {VIEW_LABELS[v] ?? v}
          </Button>
        ))}
      </ButtonGroup>

      {/* Label – centered */}
      <span className="flex-1 text-center text-base font-semibold text-stone-700 capitalize tracking-tight min-w-32">
        {label}
      </span>

      {/* Export */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleExportExcel}
        disabled={tasks.length === 0}
        title="Exportar a Excel"
      >
        ↓ Exportar
      </Button>
    </div>
  );
};
