function getTodaysToken(): string {
    return _apiCall("https://geoguessr.com/api/v3/challenges/daily-challenges/today").token
}

function getNumberOfParticipants(token: string): number {
    const json = _apiCall(`https://www.geoguessr.com/api/v3/challenges/${token}`)
    return json.challenge.numberOfParticipants
}
