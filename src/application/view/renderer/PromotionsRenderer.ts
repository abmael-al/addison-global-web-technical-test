import { Promotion } from "../../../domain/Promotion";

interface Builder {
    build(promotion: Promotion): HTMLDivElement;
}

class PromotionsRenderer {
    private readonly ComponentBuilder;

    constructor(ComponentBuilder: Builder) {
        this.ComponentBuilder = ComponentBuilder;
    }

    render(promotion: Promotion, root: HTMLElement) {
        root.appendChild(this.ComponentBuilder.build(promotion));
    }
}

export { PromotionsRenderer };