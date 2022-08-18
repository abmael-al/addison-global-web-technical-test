import { Promotion } from "./Promotion";

interface SuccessfulRequest {
    // discriminated property
    readonly status: 'success';
    readonly result: Promotion[];
}

interface FailRequest {
    // discriminated property
    readonly status: 'error';
}

// Making use of discriminated unions
type Status = SuccessfulRequest | FailRequest;

interface RequestResponseRefactored {
    readonly status: Status;
}

type RequestResponse = {
    readonly status: 'success' | 'error';
    readonly result: Promotion[];
}

export type { RequestResponse };