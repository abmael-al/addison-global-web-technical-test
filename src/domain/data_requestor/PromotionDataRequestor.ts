import { fetch } from '../http_client/fetch'
import { Promotion } from '../promotion_interface/Promotion'
import { RequestResponse } from '../response_interface/RequestResponse'
import { ROUTES } from '../routes/ROUTES'

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
                };

 
        return response;
    }

    async requestPromotionsForAllCustomers(): Promise<RequestResponse> {
        try {
            const { data } = await fetch<Promotion[]>(ROUTES.getAllCustomersRoute());

            // This class wasn't suposed to touch the requested data at all. But the
            // API doesn't provide an endpoint for "promotions for all customers" and
            // "promotions for new customers". So i decided to handle it this way.
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