/**
 * Represents a row in "Data" sheet.
 */
class Challenge {
    static readonly rowOrganisation = [
        "date",
        "token",
        "score",
        "position",
        "numberOfParticipants",
        "country1",
        "percentage1",
        "country2",
        "percentage2",
        "country3",
        "percentage3",
        "country4",
        "percentage4",
        "country5",
        "percentage5",
        "synched"
    ];

    rowNumber: number

    // Columns in the sheet. EVERY following property should have its named range.
    // Names of properties must match names of named range.
    date: Date
    token: string
    score?: number
    distance?: number
    position?: number
    numberOfParticipants?: number
    synched?: boolean
    countries?: string[]
    percentages?: number[]

    enrich(result: ChallengeResult): void {
        this.score = result.totalScore
        this.distance = result.distance

        for (let i = 0; i < 5; i++) {
            this[`country${i + 1}`] = result.rounds[i].countryCode
            this[`percentage${i + 1}`] = result.rounds[i].percentage
        }
    }

    asValues(): any[] {
        const values = []
        for (let elem of Challenge.rowOrganisation) {
            values.push(this[elem])
        }
        return values
    }
}