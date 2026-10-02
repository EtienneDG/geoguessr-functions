function buildUrl(token, friendsOnly) {
    return `https://www.geoguessr.com/api/v3/results/highscores/${token}?friends=${friendsOnly}&limit=50`
}

function hasPlayed(token) {
    const url = buildUrl(token, true)
    // no results available amongst friends, means player has not played the challenge yet
    return !!_getChallengeResults(url).length
}

function getPlayerResult(token, date) {
    return isLegacyChallenge(date) ? _getLegacyResults(token) : _getResults(date)
}

function _getResults(date) {
    const formattedDate = formatToApiChallengeDate(date)
    const url = `https://www.geoguessr.com/api/v3/challenges/daily-challenges/leaderboard/me?dateStr=${formattedDate}`
    try {
        const entries = _apiCall(url).entries
        return new ChallengeResult(entries[0])
    } catch (error) {
        Logger.log(error)
        return []
    }
}

function _getLegacyResults(token) {
    // TODO: handle large friends list
    const url = buildUrl(token, true)
    const results = _getChallengeResults(url)

    if (!results?.length) {
        return null
    }

    return results.filter((result) => { return result.userId === getConfigValue("userId") })[0]
}

function _getChallengeResults(url) {
    try {
        const items = _apiCall(url).items
        return items.map(result => new ChallengeResult(result))
    }
    catch (error) {
        Logger.log(error)
        return []
    }
}
