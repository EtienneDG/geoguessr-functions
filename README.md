# geoguessr-functions
Apps Script functions for an automated geoguessr dashboard in Google Sheets.

# Use scripts in GSheets doc
Use [clasp](https://github.com/google/clasp) to use those in a GSheet of your choising.
Also, there is a GSheet already using the scripts available [here](https://docs.google.com/spreadsheets/d/1XXK58h0P4-QAeuJ5ezmwUTr-8CvKB5PxnVs1IaHYZ-M/edit?usp=sharing).

# APIs
Basic functions to query geoguessr APIs to get : 
- players info
- challenges info
- results info

The API calls use your _ncfa cookie from geoguessr.com.

# Reverse geocoding
As of 22/03/2022, geoguessr added country codes to all guesses in challenge. So for challenges before that, we get the country from the geo coords.
However, to avoid having MB of polygons in this repo, the polygons used are very simplified and might sometimes not return the wanted country.
If so, do : 
- go to https://www.openstreetmap.org/ and search for the country
- copy the relation ID
- paste the relation ID here : https://polygons.openstreetmap.fr/
- fiddle with the params to get a simplified polygon (most of the time less than 1000 points is largely enough) that works
- download the GeoJSON version
- in the download JSON, keep only the coordinates and replace `coordinates` by `multipolygon`
- copy paste this next to the correct country code in `reverseGeocode.ts`
