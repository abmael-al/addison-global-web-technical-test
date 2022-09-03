import { PromotionDataRequestor } from "./domain/data_requestor/PromotionDataRequestor";
import { PromotionComponentBuilder } from "./application/components/PromotionComponentBuilder";
import { PromotionsRenderer } from "./application/view/renderer/PromotionsRenderer";
import { PromotionsView } from "./application/view/view_handler/PromotionsView";
import { PromotionsFilteringRequestListener } from "./application/view/listeners/PromotionsFilteringRequestListener";
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