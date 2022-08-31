import { PromotionDataRequestor } from "./domain/PromotionDataRequestor";
import { PromotionComponentBuilder } from "./application/components/PromotionComponentBuilder";
import { PromotionsRenderer } from "./application/view/renderer/PromotionsRenderer";
import { PromotionsView } from "./application/view/PromotionsView";
import { PromotionsFilteringRequestListener } from "./application/view/listeners/promotions-filtering-request-listener";
import { PromotionsViewStateManager } from "./application/view/state_manager/PromotionsViewStateManager";

const main = async () => {
    const PromotionRequestor = new PromotionDataRequestor();
    const ComponentBuilder = new PromotionComponentBuilder();
    const Renderer = new PromotionsRenderer(ComponentBuilder);
    const ViewHandler = new PromotionsView(Renderer);
    const ViewStateManager = new PromotionsViewStateManager(PromotionRequestor, ViewHandler);
    const FilteringRequestListener = new PromotionsFilteringRequestListener(ViewStateManager);

    ViewStateManager.init();
    FilteringRequestListener.listen();
}

main();