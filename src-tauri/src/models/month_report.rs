use serde::Deserialize;

use crate::models::calendar::ExcelRow;

#[derive(Deserialize)]

pub struct MonthReport {
    pub month: String,
    pub rows: Vec<ExcelRow>,
    pub total_hours: u32,
}
