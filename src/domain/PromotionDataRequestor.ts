import { Promotion } from './Promotion'
import { RequestResponse } from './RequestResponse'
import { fetch } from './http_client/fetch'

class PromotionDataRequestor {
    private readonly baseURL = 'http://www.mocky.io/v2';

    async requestAll(): Promise<RequestResponse> {
        try {
            const { data } = await fetch<Promotion[]>(`${this.baseURL}/5bc3b9cc30000012007586b7`);

            return this.buildResponse(data);
        }
        catch(error: unknown) {
            return this.buildResponse(false);
        }
    }

    private buildResponse(result: Promotion[] | false): RequestResponse {
        return { 
            status: result ? 'success' : 'error',
            result: result ? result : [],
        };
    }
}

export { PromotionDataRequestor };