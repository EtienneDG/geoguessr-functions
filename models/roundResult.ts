class RoundResult {
    countryCode: string
    latitude: number
    longitude: number
    percentage: any

    constructor(data: Partial<RoundResult>) {
        Object.assign(this, data)

        if (!this.countryCode) {
            this.patchCountry()
        }
    }

    patchCountry(): void {
        this.countryCode = getCountry(this.latitude, this.longitude)
    } 
}