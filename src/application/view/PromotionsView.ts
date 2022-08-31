import { Promotion } from "../../domain/Promotion";

interface Renderer {
    render(promotion: Promotion): void;
    clear(): void;
}

class PromotionsView {
    private readonly PromotionsRenderer;

    constructor(PromotionsRenderer: Renderer) {
        this.PromotionsRenderer = PromotionsRenderer;
    }

    display(promotions: Promotion[]) {
        for(const promotion of promotions){
            this.PromotionsRenderer.render(promotion);
        }
    }
}

export { PromotionsView };