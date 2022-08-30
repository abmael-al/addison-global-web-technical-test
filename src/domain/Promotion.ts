interface Promotion {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly heroImageUrl: string;
    readonly onlyNewCustomers: boolean;
    readonly termsAndConditionsButtonText: string;
    readonly joinNowButtonText: string;
    readonly sequence: number;
}

export type { Promotion };