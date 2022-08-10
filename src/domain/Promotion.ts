interface Promotion {
    id: string,
    name: string,
    description: string,
    heroImageUrl: string,
    onlyNewCustomers: boolean,
    termsAndConditionsButtonText: string,
    joinNowButtonText: string,
    sequence: number
}

export type { Promotion };