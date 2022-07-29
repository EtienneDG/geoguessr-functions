class ChallengeResult {
    userId: string
    totalScore: number
    distance: number
    rounds: RoundResult[] = []

    constructor(json: any) {
        this.userId = json.userId
        this.totalScore = json.totalScore

        const g = json.game

        this.distance = json.game.player.totalDistanceInMeters

        for (let i=0; i < 5; i++) {
            this.rounds.push(
                new RoundResult({
                countryCode: g.rounds[i].streakLocationCodem,
                latitude: g.rounds[i].lat,
                longitude: g.rounds[i].lng,
                percentage: g.player.guesses[i].roundScoreInPercentage
                })
            )
        }
    }

}