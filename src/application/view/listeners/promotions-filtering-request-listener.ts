(function activatePromotionsFilterElement() {
    const filterOptions = document.querySelector('[data-filter-options]');

    document.body.addEventListener('click', ({ target }) => {
        if(target instanceof HTMLElement) {
            if(target.hasAttribute('data-filter-button')) {
                filterOptions?.classList.toggle('active');
                filterOptions?.setAttribute('data-filter-options-state', 'active');
            }
            else if (!target.hasAttribute('data-filter-options')
                && filterOptions?.getAttribute('data-filter-options-state') === 'active'
            ) {
                filterOptions.classList.remove('active');
                filterOptions.setAttribute('data-filter-options-state', 'unactive');
            }
        }
    });
})()

interface View {
    renderNewBatch(filter?: 'new-customers' | 'all-customers'): void;
}

type FilterOption = 'new-customers' | 'all-customers' | 'all-promotions';
type FilterState = FilterOption;

export class PromotionsFilteringRequestListener {
    private readonly filter = document.querySelector('[data-promotions-filter]');
    private readonly ViewHandler;

    constructor(ViewHandler: View) {
        this.ViewHandler = ViewHandler;
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
            this.ViewHandler.renderNewBatch(option);
        }
        else if (option === 'all-promotions') {
            this.ViewHandler.renderNewBatch();
        }

        this.filter?.setAttribute('data-filter-state', option);
    }

    private isForbiddenFiltering(option: FilterOption) {
        return (<FilterState>this.filter?.getAttribute('data-filter-state')) === option;
    }
}