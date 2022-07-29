function initConfig() {
    const player = getPlayer()
    SpreadsheetApp.getActiveSpreadsheet().getRangeByName("avatar").setValue(player.avatar)
    SpreadsheetApp.getActiveSpreadsheet().getRangeByName("userId").setValue(player.id)
    SpreadsheetApp.getActiveSpreadsheet().getRangeByName("playerName").setValue(player.name)
}