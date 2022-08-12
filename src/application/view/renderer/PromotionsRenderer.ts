import { Promotion } from "../../../domain/Promotion";

interface Builder {
    build(promotion: Promotion): HTMLDivElement;
}

class PromotionsRenderer {
    private readonly ComponentBuilder;
    private readonly root = document.querySelector('[promotions-root]') as HTMLDivElement;

    constructor(ComponentBuilder: Builder) {
        this.ComponentBuilder = ComponentBuilder;
    }

    get promotionsRoot() {
        return this.root;
    }

    render(promotion: Promotion) {
        this.root.appendChild(this.ComponentBuilder.build(promotion));
    }

    clear() {
        this.root.replaceChildren();
    }
}

export { PromotionsRenderer };