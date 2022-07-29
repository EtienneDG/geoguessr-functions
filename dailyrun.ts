function dailyRun() {
    const locale = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetLocale()
    const today = new Date()
    // easier for filtering in charts and tables
    today.setHours(0, 0, 0, 0)

    const dateRange = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("date")
    const tf = dateRange.createTextFinder(today.toLocaleDateString(locale.replace("_", "-")))
    const match = tf.findNext()

    // get last filled row
    let lastRowNumber = dateRange.getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow()
    let previousChallengeRowNumber = lastRowNumber

    // create today's row
    if (!match) {
        const todaysChallenge = new Challenge()
        todaysChallenge.date = today
        todaysChallenge.token = getTodaysToken()
        todaysChallenge.rowNumber = lastRowNumber + 1
        todaysChallenge.synched = false
        updateRow(todaysChallenge)
    } else {
        // today is the last row, previous challenge is the one before that
        previousChallengeRowNumber--
    }

    // update lastRow
    const previousChallenge = _select(previousChallengeRowNumber)
    previousChallenge.numberOfParticipants = getNumberOfParticipants(previousChallenge.token)

    if (hasPlayed(previousChallenge.token)) {
        const result = getPlayerResult(previousChallenge.token)
        previousChallenge.enrich(result)
        previousChallenge.position = getRank(previousChallenge)
    }

    previousChallenge.synched = true
    updateRow(previousChallenge)
}
