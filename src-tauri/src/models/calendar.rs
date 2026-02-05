use serde::Deserialize;

#[derive(Deserialize)]
pub struct ExcelRow {
    pub date: String,
    pub title: String,
    pub hours: u32,
}
