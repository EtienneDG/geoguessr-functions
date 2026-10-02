function getTodaysToken() {
  return _apiCall(
    "https://geoguessr.com/api/v3/challenges/daily-challenges/today",
  ).token;
}

function getNumberOfParticipants(token, date) {
  // Starting from 2024 a new endpoint for daily is available.
  // It contains the final number of entries in the leaderboard.
  // Note: number of participants was broken beginning of 2026, it now tracks daily users ?
  if (isLegacyChallenge(date)) {
    const json = _apiCall(`https://www.geoguessr.com/api/v3/challenges/${token}`);
    return json.challenge.numberOfParticipants;
  }

  const formattedDate = formatToApiChallengeDate(date)
  const totalEntries = _apiCall(
    `https://www.geoguessr.com/api/v3/challenges/daily-challenges/leaderboard/all?dateStr=${formattedDate}`
  ).totalEntries;
  return totalEntries;
}
