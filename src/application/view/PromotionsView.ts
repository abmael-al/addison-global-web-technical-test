import { Promotion } from "../../domain/Promotion";
import { RequestResponse } from "../../domain/RequestResponse" 

interface Renderer {
    render(promotion: Promotion): void;
    clear(): void;
}

interface Requestor {
    requestAll(): Promise<RequestResponse>;
    requestPromotionsForAllCustomers(): Promise<RequestResponse>;
    requestPromotionsForNewCustomers(): Promise<RequestResponse>;
}

class PromotionsView {
    private readonly PromotionsRequestor;
    private readonly PromotionsRenderer;

    constructor(PromotionsRequestor: Requestor, PromotionsRenderer: Renderer) {
        this.PromotionsRequestor = PromotionsRequestor;
        this.PromotionsRenderer = PromotionsRenderer;
    }
    
    async start() {
        const response = await this.PromotionsRequestor.requestAll();

        if(response.status === 'success') {
            this.render(response.result);
        }
    }

    private render(promotions: Promotion[]) {
        promotions.sort();

        for(const promotion of promotions){
            this.PromotionsRenderer.render(promotion);
        }
    }

    async renderNewBatch(filter?: 'new-customers' | 'all-customers') {
        let response;

        if(filter) {
            const filteringHandlers = {
                'new-customers': () => this.PromotionsRequestor.requestPromotionsForNewCustomers(),
                'all-customers': () => this.PromotionsRequestor.requestPromotionsForAllCustomers()
            }

            response = await filteringHandlers[filter]();
        }
        else {
            response = await this.PromotionsRequestor.requestAll();
        }

        if(response.status === 'success') {
            this.clear();
            this.render(response.result);
        }
    }

    private clear() {
        this.PromotionsRenderer.clear();
    }
}

export { PromotionsView };