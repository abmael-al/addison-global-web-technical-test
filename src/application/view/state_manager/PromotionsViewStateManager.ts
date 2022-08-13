type State = 'empty' | 'not-empty';

type RecordType = "attributes" | "characterData" | "childList";

interface Options {
    attributeFilter?: string[];
    attributeOldValue?: boolean;
    attributes?: boolean;
    characterData?: boolean;
    characterDataOldValue?: boolean;
    childList?: boolean;
    subtree?: boolean;
}

interface Observer {
    observe(target: Node, options?: Options | undefined): void;
}

interface Record {
    readonly addedNodes: NodeList;
    readonly attributeName: string | null;
    readonly attributeNamespace: string | null;
    readonly nextSibling: Node | null;
    readonly oldValue: string | null;
    readonly previousSibling: Node | null;
    readonly removedNodes: NodeList;
    readonly target: Node;
    readonly type: RecordType;
}

class PromotionsViewStateManager {

}

export { PromotionsViewStateManager }