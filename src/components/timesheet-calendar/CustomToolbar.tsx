import { useState } from "react";
import { ToolbarProps, Views, View, NavigateAction } from "react-big-calendar";

import { Button } from "@/components/common/Button";
import { ButtonGroup } from "@/components/common/ButtonGroup";
import { useTimesheetStore } from "@/store/timesheetStore";
import { getMonthKey } from "@/utils/dateUtils";
import { exportExcelMonth } from "@/services/exportExcelMonth";
import { flattenMonthData } from "@/utils/flattenMonthData";

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
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-3">
        <ButtonGroup variant="outlined" color="info">
          <Button
            variant={activeNav === "PREV" ? "contained" : "outlined"}
            onClick={() => handleNavigate("PREV")}
          >
            Anterior
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
          >
            Siguiente
          </Button>
        </ButtonGroup>

        <ButtonGroup variant="outlined" color="info">
          {viewList.map((v) => (
            <Button
              key={v}
              onClick={() => onView(v)}
              variant={view === v ? "contained" : "outlined"}
            >
              {v === Views.MONTH && "Mes"}
              {v === Views.WEEK && "Semana"}
              {v === Views.DAY && "Día"}
              {v === Views.AGENDA && "Agenda"}
              {v === "work_week" && "Semana laboral"}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <span className="text-xl font-bold capitalize flex-1 text-center">
        {label}
      </span>

      <div className="flex gap-3">
        <Button
          variant="outlined"
          color="info"
          onClick={handleExportExcel}
          disabled={tasks.length === 0}
        >
          Exportar
        </Button>
      </div>
    </div>
  );
};
