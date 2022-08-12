import { Promotion } from "../../../domain/Promotion";

class PromotionsRoot {
    private readonly ComponentBuilder;
    private readonly root = document.querySelector('[promotions-root]') as HTMLDivElement;

    constructor(ComponentBuilder: any) {
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

export { PromotionsRoot };