use rust_xlsxwriter::{Format, FormatAlign, FormatBorder, Workbook};
use std::path::PathBuf;
use tauri::{AppHandle, Manager};

use crate::models::month_report::MonthReport;

const COL_LABEL: u16 = 1; // B
const COL_DETAIL: u16 = 2; // C
const COL_HOURS: u16 = 3; // D
const PROJECT: &str = "Migración del Sistema Integrado de Pensiones"; // E

pub fn generate_month_excel(app: &AppHandle, month_report: MonthReport) -> Result<(), String> {
    // 📁 Documents
    let mut path: PathBuf = app.path().document_dir().map_err(|e| e.to_string())?;

    path.push(format!("tasks-{}.xlsx", month_report.month));

    let mut workbook = Workbook::new();
    let worksheet = workbook.add_worksheet();

    // ===== FORMATOS (PLANTILLA) =====

    let label_format = Format::new().set_bold().set_border(FormatBorder::Thin);

    let header_format = Format::new()
        .set_bold()
        .set_border(FormatBorder::Thin)
        .set_align(FormatAlign::Center)
        .set_text_wrap();

    let row_format = Format::new().set_border(FormatBorder::Thin).set_text_wrap();

    let hours_format = Format::new()
        .set_border(FormatBorder::Thin)
        .set_align(FormatAlign::Center)
        .set_text_wrap();

    let total_format = Format::new()
        .set_bold()
        .set_border(FormatBorder::Thin)
        .set_align(FormatAlign::Center)
        .set_text_wrap();

    // ===== FILAS FIJAS =====
    worksheet
        .write_with_format(1, COL_LABEL, "Nombre del Consultor", &label_format)
        .map_err(|e| e.to_string())?;
    worksheet
        .write_with_format(1, COL_DETAIL, "Luis Rodríguez", &row_format)
        .map_err(|e| e.to_string())?;
    worksheet
        .write_with_format(1, COL_DETAIL + 1, "", &row_format)
        .map_err(|e| e.to_string())?;

    worksheet
        .write_with_format(2, COL_LABEL, "Modalidad de Ejecución", &label_format)
        .map_err(|e| e.to_string())?;
    worksheet
        .write_with_format(2, COL_DETAIL, "Días de Servicio", &row_format)
        .map_err(|e| e.to_string())?;
    worksheet
        .write_with_format(2, COL_DETAIL + 1, "", &row_format)
        .map_err(|e| e.to_string())?;

    // ===== HEADER TABLA =====
    worksheet
        .write_with_format(3, COL_LABEL, "Tipo de Servicio", &header_format)
        .map_err(|e| e.to_string())?;
    worksheet
        .write_with_format(3, COL_DETAIL, "Detalle", &header_format)
        .map_err(|e| e.to_string())?;
    worksheet
        .write_with_format(3, COL_HOURS, "Tiempo Invertido (Horas)", &header_format)
        .map_err(|e| e.to_string())?;

    // ===== DETALLE =====
    let start_detail_row = 4;

    for (i, row) in month_report.rows.iter().enumerate() {
        let r = start_detail_row + i as u32;
        let title = format!("{} - {}", row.date, row.title);

        worksheet
            .write_with_format(
                r,
                COL_LABEL,
                if i == 0 { PROJECT } else { "" },
                &Format::new()
                    .set_border_left(FormatBorder::Thin)
                    .set_border_right(FormatBorder::Thin)
                    .set_text_wrap(),
            )
            .map_err(|e| e.to_string())?;
        worksheet
            .write_with_format(r, COL_DETAIL, title, &row_format)
            .map_err(|e| e.to_string())?;
        worksheet
            .write_number_with_format(r, COL_HOURS, row.hours as f64, &hours_format)
            .map_err(|e| e.to_string())?;
    }

    // ===== TOTAL =====
    let total_row = start_detail_row + month_report.rows.len() as u32;

    worksheet
        .write_with_format(
            total_row,
            COL_LABEL,
            "Total de horas",
            &Format::new().set_border(FormatBorder::Thin),
        )
        .map_err(|e| e.to_string())?;
    worksheet
        .write_with_format(
            total_row,
            COL_LABEL + 1,
            "",
            &Format::new().set_border(FormatBorder::Thin),
        )
        .map_err(|e| e.to_string())?;
    worksheet
        .write_number_with_format(
            total_row,
            COL_HOURS,
            month_report.total_hours as f64,
            &total_format,
        )
        .map_err(|e| e.to_string())?;

    // ===== OBSERVACIONES (SOLO LABEL) =====
    let obs_row = total_row + 1;
    worksheet
        .write_with_format(
            obs_row,
            COL_LABEL,
            "Observaciones",
            &Format::new().set_border(FormatBorder::Thin),
        )
        .map_err(|e| e.to_string())?;
    worksheet
        .write_with_format(
            obs_row,
            COL_LABEL + 1,
            "",
            &Format::new().set_border(FormatBorder::Thin),
        )
        .map_err(|e| e.to_string())?;
    worksheet
        .write_with_format(
            obs_row,
            COL_LABEL + 2,
            "",
            &Format::new().set_border(FormatBorder::Thin),
        )
        .map_err(|e| e.to_string())?;

    // ===== ANCHOS =====
    worksheet
        .set_column_width(COL_LABEL, 25)
        .map_err(|e| e.to_string())?;
    worksheet
        .set_column_width(COL_DETAIL, 65)
        .map_err(|e| e.to_string())?;
    worksheet
        .set_column_width(COL_HOURS, 22)
        .map_err(|e| e.to_string())?;

    // ===== SAVE =====

    workbook.save(path).map_err(|e| e.to_string())
}
