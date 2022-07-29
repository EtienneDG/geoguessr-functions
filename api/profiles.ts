function getPlayer(): Player {
    const player = _apiCall("https://geoguessr.com/api/v3/profiles").user
    return {
        avatar: `https://www.geoguessr.com/images/auto/144/144/ce/0/plain/${player.pin.url}`,
        name: player.nick,
        id: player.id
    }
}