function updateRow(row: Challenge) {
    const start = Date.now();

    _addCheckbox(row.rowNumber)

    const values = row.asValues()
    const dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data")
    const range = dataSheet.getRange(
        row.rowNumber,
        1, // column 'A'
        1, // one row only 
        values.length // as many columns as values
        )
    range.setValues([values])
    Logger.log(`_update: ${row.rowNumber}, duration : ${Date.now() - start}ms`);
}

function _addCheckbox(rowNumber) {
    const cell = [rowNumber, SpreadsheetApp.getActiveSpreadsheet().getRangeByName("synched").getColumn()]
    const dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data")
    dataSheet.getRange(cell[0], cell[1]).insertCheckboxes()
}
