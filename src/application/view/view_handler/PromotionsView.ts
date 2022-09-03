import { Promotion } from "../../../domain/Promotion";

interface Renderer {
    render(promotion: Promotion, root: HTMLElement): void;
}

class PromotionsView {
    private readonly root = document.querySelector('[data-promotions-root]') as HTMLDivElement;
    private readonly PromotionsRenderer;

    constructor(PromotionsRenderer: Renderer) {
        this.PromotionsRenderer = PromotionsRenderer;
    }

    display(promotions: Promotion[]) {
        for(const promotion of promotions){
            this.PromotionsRenderer.render(promotion, this.root);
        }
    }

    clear() {
        this.root.replaceChildren();
    }
}

export { PromotionsView };