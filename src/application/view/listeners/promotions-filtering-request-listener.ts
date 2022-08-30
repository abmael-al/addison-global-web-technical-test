interface View {
    renderNewBatch(filter?: 'new-customers' | 'all-customers'): void;
}

export class PromotionsFilteringRequestListener {
    private readonly filter = document.querySelector('[promotions-filter]');
    private readonly ViewHandler;

    constructor(ViewHandler: View) {
        this.ViewHandler = ViewHandler;
    }

    listen() {
        this.filter?.addEventListener('click', ({ target }) => {
            if(target instanceof HTMLElement) {
                if(target.hasAttribute('filter-option')) {
                    this.handleFilterRequest(target);
                }
            }
        })
    }

    private handleFilterRequest(element: HTMLElement) {
        const option = element.getAttribute('filter-option');
        
        if(option === 'new-customers' || option === 'all-customers') {
            this.ViewHandler.renderNewBatch(option);
        }
        else if (option === 'all-promotions') {
            this.ViewHandler.renderNewBatch();
        }
    }
}