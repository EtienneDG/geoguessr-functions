class ChallengeResult {
    userId: string
    totalScore: number
    distance: number
    rounds: RoundResult[] = []

    constructor(data: any) {
        this.userId = data.userId
        this.totalScore = data.totalScore

        const g = data.game

        this.distance = data.game.player.totalDistanceInMeters

        for (let i=0; i < 5; i++) {
            this.rounds.push(
                new RoundResult({
                countryCode: g.rounds[i].streakLocationCode,
                latitude: g.rounds[i].lat,
                longitude: g.rounds[i].lng,
                percentage: g.player.guesses[i].roundScoreInPercentage
                })
            )
        }
    }

}
