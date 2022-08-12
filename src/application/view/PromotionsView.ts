import { Promotion } from "../../domain/Promotion";
import { RequestResponse } from "../../domain/RequestResponse" 

interface Renderer {
    render(promotion: Promotion): void;
}

interface Requestor {
    requestAll(): Promise<RequestResponse>;
}

class PromotionsView {
    private readonly PromotionsRequestor;
    private readonly PromotionsRenderer;

    constructor(PromotionsRequestor: Requestor, PromotionsRenderer: Renderer) {
        this.PromotionsRequestor = PromotionsRequestor;
        this.PromotionsRenderer = PromotionsRenderer;
    }
    
    async start() {
        const promotions: Promotion[] = await this.PromotionsRequestor.requestAll();

        for(const promotion of promotions){
            this.PromotionsRoot.render(promotion);
        }
    }
}

export { PromotionsView };