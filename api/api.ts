function _apiCall(url): any {
    const start = Date.now();
    const options = {
        headers: {
            cookie: `_ncfa=${getConfigValue("cookie")}`
        }
    }
    const contentText = UrlFetchApp.fetch(url, options).getContentText()
    const json = JSON.parse(contentText)
    Logger.log(`_apiCall: ${url}, duration : ${Date.now() - start}ms`);
    return json
}
