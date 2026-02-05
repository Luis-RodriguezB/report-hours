use crate::models::month_report::MonthReport;
use crate::services::excel;
use tauri::AppHandle;

#[tauri::command]
pub fn export_month_excel(app: AppHandle, month_report: MonthReport) -> Result<(), String> {
    if month_report.rows.is_empty() {
        return Err("No hay datos para exportar".into());
    }

    excel::generate_month_excel(&app, month_report)
}
