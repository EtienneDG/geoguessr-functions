function _select(rowNumber): Challenge {
    const dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data")
    const rowValues = dataSheet.getRange(rowNumber, 1, 1, Challenge.rowOrganisation.length).getValues()[0]

    const challenge = new Challenge()
    challenge.rowNumber = rowNumber

    for (let [index, value] of Array.from(Challenge.rowOrganisation.entries())) {
        challenge[value] = rowValues[index] 
    }
    return challenge
}
