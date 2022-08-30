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
        const { status, result } = await this.PromotionsRequestor.requestAll();

        if(status === 'success') {
            this.render(result);
        }
    }

    private render(promotions: Promotion[]) {
        promotions.sort();

        for(const promotion of promotions){
            this.PromotionsRenderer.render(promotion);
        }
    }
}

export { PromotionsView };