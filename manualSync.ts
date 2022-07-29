function manualSync() {
    const values = SpreadsheetApp.getActiveSpreadsheet().getRangeByName("synched").getValues()

    let unsynchedRows = []
    values.map((value, index) => {
        if (value[0] === false) {
            unsynchedRows.push(index + 1)
        }
    })

    // get last unsyched row (limit to 10 to avoid exceeding quotas)
    unsynchedRows = unsynchedRows.reverse().slice(0, 10)

    for (let rowNumber of unsynchedRows) {
        let start = Date.now();
        const challenge = _select(rowNumber)
        Logger.log(`_select: ${rowNumber}, duration : ${Date.now() - start}ms`);
        
        if (hasPlayed(challenge.token)) {
            challenge.numberOfParticipants = getNumberOfParticipants(challenge.token)
            const result = getPlayerResult(challenge.token)
            challenge.enrich(result)
            start = Date.now()
            challenge.position = getRank(challenge)
            Logger.log(`getRank, duration : ${Date.now() - start}ms`);
        }

        challenge.synched = true
        updateRow(challenge)
    }

}
