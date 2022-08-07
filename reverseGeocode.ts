/**
 * Get country information from coordinates
 * @param lat number latitude
 * @param lng number longitude
 * @return object ISO 3166 Alpha-2 code
          null if not in a country
    
 */
 function getCountry(lat: number, lng: number): string {
  const start = Date.now();
  const url = `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lng}&format=jsonv2`
  const contentText = UrlFetchApp.fetch(url).getContentText()
  Logger.log(`_reverseGeocode: ${url}, duration : ${Date.now() - start}ms`);
  const json = JSON.parse(contentText)
  
  if (json.address?.country_code) {
    // Exceptions
    if (json.address["ISO3166-2-lvl3"] === "CN-HK") return "hk"
    return json.address.country_code
  }
  Logger.log(`No country found with: lat: ${lat} |  lng: ${lng}`);
  return ""
}
