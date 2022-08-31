import { fetch } from './http_client/fetch'
import { Promotion } from './Promotion'
import { RequestResponse } from './RequestResponse'

class PromotionDataRequestor {
    private readonly baseURL = 'http://www.mocky.io/v2';

    async requestAll(): Promise<RequestResponse> {
        try {
            const { data } = await fetch<Promotion[]>(`${this.baseURL}/5bc3b9cc30000012007586b7`);

            return this.buildResponse('success', data);
        }
        catch(error: unknown) {
            return this.buildResponse('error');
        }
    }
    
    private buildResponse(status: 'error'): RequestResponse;
    private buildResponse(status: 'success', result: Promotion[]): RequestResponse;
    private buildResponse(status: 'success' | 'error', result?: Promotion[]) {
        const response: RequestResponse = 
            (status === 'success' && result) 
                ? {
                    status: 'success',
                    result
                }
                : {
                    status: 'error'
                }
        ;
 
        return response;
    }

    async requestPromotionsForAllCustomers(): Promise<RequestResponse> {
        try {
            const { data } = await fetch<Promotion[]>(`${this.baseURL}/5bc3b9cc30000012007586b7`);

            return this.buildResponse('success', data.filter(promotion => !promotion.onlyNewCustomers));
        }
        catch(error: unknown) {
            return this.buildResponse('error');
        }
    }

    async requestPromotionsForNewCustomers() {
        try {
            const { data } = await fetch<Promotion[]>(`${this.baseURL}/5bc3b9cc30000012007586b7`);

            return this.buildResponse('success', data.filter(promotion => promotion.onlyNewCustomers));
        }
        catch(error: unknown) {
            return this.buildResponse('error');
        }
    }
}

export { PromotionDataRequestor };