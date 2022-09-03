import { Promotion } from "../../../domain/Promotion";
import { RequestResponse } from "../../../domain/RequestResponse";

interface Requestor {
    requestAll(): Promise<RequestResponse>;
    requestPromotionsForAllCustomers(): Promise<RequestResponse>;
    requestPromotionsForNewCustomers(): Promise<RequestResponse>;
}

interface View {
    display(promotions: Promotion[]): void;
    clear(): void;
}

type Filtering = 'new-customers' | 'all-customers';

class PromotionsViewStateManager {
    private readonly PromotionsRequestor;
    private readonly ViewHandler;

    constructor(PromotionsRequestor: Requestor, ViewHandler: View) {
        this.PromotionsRequestor = PromotionsRequestor;
        this.ViewHandler = ViewHandler;
    }

    async init() {
        const response = await this.PromotionsRequestor.requestAll();

        if(response.status === 'success') {
            this.updateView(response.result);
        }
    }
    
    private updateView(content: Promotion[], clearView = false) {
        if(clearView) {
            this.ViewHandler.clear();
        }
        
        this.ViewHandler.display(content.sort());
    }

    async rerender(filtering?: Filtering) {
        const filteringHandler = {
            'new-customers': () => this.PromotionsRequestor.requestPromotionsForNewCustomers(),
            'all-customers': () => this.PromotionsRequestor.requestPromotionsForAllCustomers(),
        }

        const response = (filtering) 
            ? await filteringHandler[filtering]() 
            : await this.PromotionsRequestor.requestAll();

        if(response.status === 'success') {
            this.updateView(response.result, true);
        }
    }
}

export { PromotionsViewStateManager }