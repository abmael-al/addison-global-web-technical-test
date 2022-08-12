import { Promotion } from "../../domain/Promotion";

interface HTMLElementAssignablePropertiesInUse {
    textContent: string;
}

interface HTMLElementMethodsInUse {
    setAttribute: string;
}

class PromotionComponentBuilder {
    private componentStructure!: HTMLDivElement;

    build(promotion: Promotion) {
        this.setComponentStructure();
        this.populateComponentStructure(promotion);

        return this.getComponent();
    }

    private setComponentStructure() {
        const template = document.querySelector('[promotion-component-template]') as HTMLTemplateElement;
        const component = template.content.cloneNode(true) as HTMLDivElement;
        
        this.componentStructure = component;
    }

    private populateComponentStructure(promotion: Promotion) {
        const structure = {
            "promotion-name": {
                "textContent": promotion.name,
            },
            "promotion-description": {
                "textContent": promotion.description,
            },
            "promotion-join-now": {
                "textContent": promotion.joinNowButtonText,
            },
            "promotion-terms-and-conditions": {
                "textContent": promotion.termsAndConditionsButtonText,
            },
            "promotion-thumbnail": {
                "setAttribute": {
                    "args": ["src", promotion.heroImageUrl],
                }
            }
        }

        const methods = {
            "setAttribute": (element: HTMLElement, ...args: string[]) => {
                element.setAttribute(...args as [string, string]);
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

    private getComponent() {
        const component = document.createElement('div');

        component.appendChild(this.componentStructure);

        return component;
    }
}

export { PromotionComponentBuilder };