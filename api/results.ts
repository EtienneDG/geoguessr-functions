function buildUrl(token: string, friendsOnly: boolean): string {
    return `https://www.geoguessr.com/api/v3/results/highscores/${token}?friends=${friendsOnly}&limit=50`
}

function hasPlayed(token: string): boolean {
    const url = buildUrl(token, true)
    // no results available amongst friends, means player has not played the challenge yet
    return !!_getChallengeResults(url).length
}

function getPlayerResult(token: string): ChallengeResult | null {
    // TODO: handle large friends list
    const url =  buildUrl(token, true)
    const results = _getChallengeResults(url)

    if (!results?.length) {
        return null
    }

    return results.filter((result: ChallengeResult) => { return result.userId === getConfigValue("userId") })[0]
}

function _getChallengeResults(url: string): ChallengeResult[] | [] {
    try {
        const items = _apiCall(url).items
        return items.map(result => new ChallengeResult(result))
    }
    catch (error) {
        Logger.log(error)
        return []
    }
}
