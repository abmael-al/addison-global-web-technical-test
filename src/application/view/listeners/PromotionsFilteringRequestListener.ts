type FilterOption = 'new-customers' | 'all-customers' | 'all-promotions';

type FilterState = FilterOption;

interface Manager {
    rerender(filtering?: 'new-customers' | 'all-customers'): void;
}

export class PromotionsFilteringRequestListener {
    private readonly filter = document.querySelector('[data-promotions-filter]');
    private readonly ViewManager;

    constructor(ViewManager: Manager) {
        this.ViewManager = ViewManager;
    }

    listen() {
        this.filter?.addEventListener('click', ({ target }) => {
            if(target instanceof HTMLElement) {
                if(target.hasAttribute('data-filter-option')) {
                    this.handleFilterRequest(target);
                }
            }
        })
    }

    private handleFilterRequest(element: HTMLElement) {
        const option = element.getAttribute('data-filter-option') as FilterOption;
        
        if(this.isForbiddenFiltering(option)) {
            return;
        }

        if(option === 'new-customers' || option === 'all-customers') {
            this.ViewManager.rerender(option);
        }
        else if (option === 'all-promotions') {
            this.ViewManager.rerender();
        }

        this.filter?.setAttribute('data-filter-state', option);
    }

    private isForbiddenFiltering(option: FilterOption) {
        return (<FilterState>this.filter?.getAttribute('data-filter-state')) === option;
    }
}