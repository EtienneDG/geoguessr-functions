const isLegacyChallenge = (date) => date < new Date(2024, 1, 1)

const formatToApiChallengeDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`