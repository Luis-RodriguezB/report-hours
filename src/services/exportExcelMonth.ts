import { invoke } from "@tauri-apps/api/core";

import { ExcelRow } from "@/interfaces/ExcelRow";

interface MonthReport {
  month: string;
  rows: ExcelRow[];
  total_hours: number;
}

export const exportExcelMonth = async (month: string, rows: ExcelRow[]) => {
  const monthReport: MonthReport = {
    month,
    rows,
    total_hours: rows.reduce((total, row) => total + row.hours, 0),
  };

  await invoke("export_month_excel", {
    monthReport,
  });
};
