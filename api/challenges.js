function getTodaysToken() {
  return _apiCall(
    "https://geoguessr.com/api/v3/challenges/daily-challenges/today",
  ).token;
}

function getNumberOfParticipants(token) {
  // Starting from 2024 a new endpoint for daily is available.
  // It contains the final number of entries in the leaderboard.
  // Note: number of participants was broken beginning of 2026, it now tracks daily users ?
  const limit = new Date(2024, 1, 1);
  if (date >= limit) {
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const totalEntries = _apiCall(
      "https://www.geoguessr.com/api/v3/challenges/daily-challenges/leaderboard/all?dateStr=".concat(
        formattedDate,
      ),
    ).totalEntries;
    if (totalEntries) return totalEntries;
  }
  const json = _apiCall(`https://www.geoguessr.com/api/v3/challenges/${token}`);
  return json.challenge.numberOfParticipants;
}
