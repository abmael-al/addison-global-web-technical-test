import { Promotion } from "../../domain/Promotion";

class PromotionsView {
    private readonly PromotionsRequestor;
    private readonly PromotionsRoot;

    constructor(PromotionsRequestor: any, PromotionsRoot: any) {
        this.PromotionsRequestor = PromotionsRequestor;
        this.PromotionsRoot = PromotionsRoot;
    }
    
    async start() {
        const promotions: Promotion[] = await this.PromotionsRequestor.requestAll();

        for(const promotion of promotions){
            this.PromotionsRoot.render(promotion);
        }
    }
}

export { PromotionsView };