import { Promotion } from "../promotion_interface/Promotion";

interface SuccessfulRequest {
    readonly status: 'success';
    readonly result: Promotion[];
}

interface FailedRequest {
    readonly status: 'error';
}

type RequestResponse = SuccessfulRequest | FailedRequest;

export type { 
    RequestResponse, 
    SuccessfulRequest, 
    FailedRequest 
};