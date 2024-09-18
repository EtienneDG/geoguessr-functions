class RoundResult {
    countryCode: string
    latitude: number
    longitude: number
    percentage: any

    constructor(data: Partial<RoundResult>) {
        Object.assign(this, data)
    }
}