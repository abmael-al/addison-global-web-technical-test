import { Promotion } from "./Promotion";

type RequestResponse = {
    readonly status: 'success' | 'error';
    readonly result: Promotion[];
}

export type { RequestResponse };