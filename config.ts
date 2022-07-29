function getConfigValue(configKey) {
    const cache = CacheService.getScriptCache()
    const cached = cache.get(configKey)
    if (!!cached) {
        return cached
    }
    
    const configValue = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(configKey).getValue()
    cache.put(configKey, configValue, 300)
    return configValue
}
