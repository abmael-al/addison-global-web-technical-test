import { fetch } from './http_client/fetch'
import { Promotion } from './Promotion'
import { RequestResponse } from './RequestResponse'
import { ROUTES } from './ROUTES'

class PromotionDataRequestor {
    async requestAll(): Promise<RequestResponse> {
        try {
            const { data } = await fetch<Promotion[]>(ROUTES.getAllPromotionsRoute());

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
            const { data } = await fetch<Promotion[]>(ROUTES.getAllCustomersRoute());

            return this.buildResponse('success', data.filter(promotion => !promotion.onlyNewCustomers));
        }
        catch(error: unknown) {
            return this.buildResponse('error');
        }
    }

    async requestPromotionsForNewCustomers() {
        try {
            const { data } = await fetch<Promotion[]>(ROUTES.getNewCustomersRoute());

            return this.buildResponse('success', data.filter(promotion => promotion.onlyNewCustomers));
        }
        catch(error: unknown) {
            return this.buildResponse('error');
        }
    }
}

export { PromotionDataRequestor };