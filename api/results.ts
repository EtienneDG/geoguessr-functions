function hasPlayed(token: string): boolean {
    const url = `https://www.geoguessr.com/api/v3/results/scores/${token}/0/1?friends`
    // no results available amongst friends, means player has not played the challenge yet
    return !!_getChallengeResults(url).length
}

function getPlayerResult(token: string): ChallengeResult | null {
    // TODO: handle large friends list
    const url = `https://www.geoguessr.com/api/v3/results/scores/${token}/0/50?friends`
    const results = _getChallengeResults(url)

    if (!results.length) {
        return null
    }

    return results.filter((result: ChallengeResult) => { return result.userId === getConfigValue("userId") })[0]
}

function getRank(challenge: Challenge): number {

    if (!challenge.numberOfParticipants || !challenge.score) {
        throw new Error(("Missing data for position computation"))
    }

    let turns = 0
    let position = null
    let min = 0
    let max = challenge.numberOfParticipants
    const userId = getConfigValue("userId")

    while (!position) {
        if (turns > 12) {
            throw new Error("Something went wrong, breaking to avoid infinite loop")
        }
        turns++
        
        const intervalSize = Math.floor((max - min) / 2)
        // middle of the interval
        const offset = min + intervalSize
        // to speed up the end of the binary search
        const pageSize = intervalSize <= 50 ? 50 : 1
        const url = `https://www.geoguessr.com/api/v3/results/scores/${challenge.token}/${offset}/${pageSize}`
        const results = _getChallengeResults(url)

        // Seems like : when people don't finish the challenge, they are counted as participants
        // but do not in show up the results pages.
        if (!results.length) {
            max = offset
            continue
        }

        const maxScore = results[0].totalScore
        const minScore = results[results.length - 1].totalScore

        // in the page of results
        if(results.find(r => r.userId === userId)) {
            const index = results.findIndex(r => r.userId === userId)
            position = index + offset + 1
        }
        // outside of the page of results
        else if (challenge.score < minScore) {
            min = offset
        }
        else if (maxScore < challenge.score) {
            max = offset
        }
        // player is tied with the player at `offset` position we use total distance
        else {
            if (challenge.distance < results[0].distance) {
                max = offset
            }
            else if (challenge.distance > results[0].distance) {
                min = offset
            }
        }
    }
    return position
}

function _getChallengeResults(url: string): ChallengeResult[] | [] {
    try {
        const json = _apiCall(url)
        return json.map(result => new ChallengeResult(result))
    }
    catch (error) {
        Logger.log(error)
        return []
    }
}
