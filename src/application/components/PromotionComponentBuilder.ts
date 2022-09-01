import { Promotion } from "../../domain/Promotion";

interface HTMLElementAssignablePropertiesInUse {
    textContent: string;
}

interface HTMLElementMethodsInUse {
    setAttribute: string;
    'classList.add': string;
}

class PromotionComponentBuilder {
    private componentStructure!: HTMLDivElement;

    build(promotion: Promotion) {
        this.setComponentStructure();
        this.populateComponentStructure(promotion);

        return this.getComponent(promotion.onlyNewCustomers);
    }

    private setComponentStructure() {
        const template = document.querySelector('[data-promotion-component-template]') as HTMLTemplateElement;
        const component = template.content.cloneNode(true) as HTMLDivElement;
        
        this.componentStructure = component;
    }

    private populateComponentStructure(promotion: Promotion) {
        const structure = {
            'data-promotion-name': {
                'textContent': promotion.name,
            },
            'data-promotion-tag': {
                'textContent': (promotion.onlyNewCustomers) ? 'new customers' : 'all customers',
                'classList.add': {
                    'args': [(promotion.onlyNewCustomers) ? 'new-customers' : 'all-customers'] as const,
                },
            },
            'data-promotion-description': {
                'textContent': promotion.description,
            },
            'data-promotion-join-now': {
                'textContent': promotion.joinNowButtonText,
            },
            'data-promotion-terms-and-conditions': {
                'textContent': promotion.termsAndConditionsButtonText,
            },
            'data-promotion-thumbnail': {
                'setAttribute': {
                    'args': ["src", promotion.heroImageUrl],
                }
            }
        }

        const methods = {
            'setAttribute': (element: HTMLElement, ...args: string[]) => {
                element.setAttribute(...args as [string, string]);
            },
            'classList.add': (element: HTMLElement, ...args: string[]) => {
                element.classList.add(...args);
            }
        }

        for(const [indentifier, config] of Object.entries(structure)) {
            const element = this.componentStructure.querySelector(`[${indentifier}]`) as HTMLElement;

            for(const [property, propertyConfig] of Object.entries(config)) {
                if(Object.hasOwn(methods, property)) {
                    methods[property as keyof HTMLElementMethodsInUse](element, ...propertyConfig.args);
                }
                else {
                    element[property as keyof HTMLElementAssignablePropertiesInUse] = propertyConfig;
                }
            }
        }
    }

    private getComponent(onlyNewCustomers: boolean) {
        const component = document.createElement('div');
        const targetAudience = (onlyNewCustomers) ? 'new-customers' : 'all-customers';

        component.appendChild(this.componentStructure);
        component.setAttribute('data-target-audience', targetAudience);

        return component;
    }
}

export { PromotionComponentBuilder };