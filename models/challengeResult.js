class ChallengeResult {
  constructor(data) {
    this.rounds = [];

    const g = data.game;
    this.userId = g.player.id;
    this.totalScore = parseInt(g.player.totalScore.amount);
    this.distance = data.game.player.totalDistanceInMeters;

    for (let i = 0; i < 5; i++) {
      this.rounds.push(
        new RoundResult({
          countryCode: g.rounds[i].streakLocationCode,
          latitude: g.rounds[i].lat,
          longitude: g.rounds[i].lng,
          percentage: g.player.guesses[i].roundScoreInPercentage,
        }),
      );
    }
  }
}
